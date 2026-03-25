import { useState } from "react";
import { Keyboard, TextInput, View } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  const handleAddNewBird = () => {
    const newBirdAdded = addNewCountable(name);

    if (newBirdAdded) {
      setName("");
      Keyboard.dismiss();
    }
  };

  return (
    <View style={CommonStyles.row}>
      <TextInput
        style={CommonStyles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />
      <View style={CommonStyles.buttonAddition}>
        <CountButton text="Add" submit={handleAddNewBird} />
      </View>
    </View>
  );
};
