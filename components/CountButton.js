import { Text, TouchableOpacity } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";

export const CountButton = ({ text, submit }) => (
  <TouchableOpacity style={CommonStyles.button} onPress={submit}>
    <Text style={CommonStyles.buttonText}>{text}</Text>
  </TouchableOpacity>
);
