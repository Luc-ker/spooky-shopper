import { Text, View, TextInput, Button } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Enter the store code.</Text>
      <TextInput style={{height: 40}} placeholder="Enter Store Code" ></TextInput>
      <Button title="Enter"/>
      
    </View>
  );
}
