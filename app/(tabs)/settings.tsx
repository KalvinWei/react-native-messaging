import { signOutWithAzureAD } from "lib/api/auth/azure";
import { Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={signOutWithAzureAD}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
