import { Text, View } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const CountableRow = ({ countable, changeCount, deleteCountable }) => (
  <View style={CommonStyles.row}>
    <View style={CommonStyles.nameColumn}>
      <Text style={CommonStyles.textItem}>{countable.name}</Text>
      <Text style={CommonStyles.textItem}>{countable.count}</Text>
    </View>
    {/* Addition Button */}
    <View style={CommonStyles.buttonColumn}>
      <View style={CommonStyles.buttonAddition}>
        <CountButton
          text={"+"}
          submit={() => {
            changeCount(1, countable.id);
          }}
        />
      </View>
      {/* Subtraction  Button */}
      <View
        style={[
          CommonStyles.buttonSubtraction,
          countable.count === 0 && CommonStyles.disabledButton,
        ]}
      >
        <CountButton
          text={"-"}
          submit={() => {
            changeCount(-1, countable.id);
          }}
        />
      </View>
      <View style={CommonStyles.buttonEditDelete}>
        <View style={CommonStyles.buttonEdit}>
          <CountButton text="Edit" submit={() => {}} />
        </View>
        <View style={CommonStyles.buttonDelete}>
          <CountButton
            text="Delete"
            submit={() => {
              deleteCountable(countable.id);
            }}
          />
        </View>
      </View>
    </View>
  </View>
);
