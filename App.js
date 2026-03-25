import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { validateNewBirdName } from "./components/InputValidation";
import { loadCountables, saveCountables } from "./storage/CountableStorage";
import { CommonStyles } from "./styles/CommonStyles";

export default function App() {
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [countables, setCountables] = useState([]);
  const [nextId, setNextId] = useState(1);

  // State Handling of number of Birds seen
  const changeCount = (amount, id) => {
    const newState = countables.map((bird) => {
      if (bird.id !== id) {
        return bird;
      }

      const newValue = bird.count + amount;

      if (newValue < 0) {
        return bird;
      }

      return { ...bird, count: newValue };
    });

    setCountables(newState);
  };

  // Handling of sorting of bird list
  const changeSort = (column) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev == "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const sortedCountables = [...countables].sort((a, b) => {
    if (!sortBy) return 0;

    if (sortBy === "name") {
      const result = a.name.localeCompare(b.name);
      return sortDirection === "asc" ? result : -result;
    }

    if (sortBy === "count") {
      const result = a.count - b.count;
      return sortDirection === "asc" ? result : -result;
    }

    return 0;
  });

  // Handling of adding new birds
  const addNewCountable = (name) => {
    const error = validateNewBirdName(countables, name);

    if (error) {
      Alert.alert("Invalid input: ", error);
      return;
    }

    const cleanBirdName = name.trim();

    const newState = [
      ...countables,
      { id: nextId, name: cleanBirdName, count: 0 },
    ];

    setCountables(newState);
    setNextId(nextId + 1);

    return true;
  };

  // Handling of deleting birds
  const deleteCountable = (id) => {
    const newState = countables.filter((bird) => bird.id !== id);
    setCountables(newState);
  };

  const isLoaded = useRef(false);

  useEffect(() => {
    loadCountables().then((result) => {
      const withIds = result.map((item, index) => ({
        ...item,
        id: index ?? index + 1,
      }));

      setCountables(withIds);
      setNextId(withIds.length + 1);
      isLoaded.current = true;
    });
  }, []);

  useEffect(() => {
    if (!isLoaded.current) return;
    saveCountables(countables);
  }, [countables]);

  return (
    <SafeAreaView style={CommonStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={CommonStyles.container}
      >
        <ScrollView>
          <View style={CommonStyles.headerRow}>
            <TouchableOpacity onPress={() => changeSort("name")}>
              <Text style={CommonStyles.headerText}>
                Name
                {sortBy === "name" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeSort("count")}>
              <Text style={CommonStyles.headerText}>
                Seen
                {sortBy === "count"
                  ? sortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </Text>
            </TouchableOpacity>
          </View>

          {sortedCountables.map((countable) => (
            <CountableRow
              countable={countable}
              key={countable.id}
              changeCount={changeCount}
              deleteCountable={deleteCountable}
            />
          ))}
        </ScrollView>
        <AddRow addNewCountable={addNewCountable} />
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
