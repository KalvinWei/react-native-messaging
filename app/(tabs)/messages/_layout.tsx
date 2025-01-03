import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import Icon from "components/ui/icon";
import { getAzureADUsers } from "lib/api/contacts";
import { useAuth } from "lib/contexts/auth-context";
import ChatWrapper from "components/chat-wrapper";
import { ChatContextProvider } from "lib/contexts/chat-context";

export default function MessagesLayout() {
  const auth = useAuth();
  return (
    <ChatContextProvider>
      <ChatWrapper>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: true,
              title: "Messages",
              headerRight: ({ tintColor }) => (
                <TouchableOpacity
                  onPress={async () => await getAzureADUsers(auth.accessToken)}
                >
                  <Icon name="add-circle-outline" size={24} color={tintColor} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="channels/[cid]/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="channels/[cid]/threads/[tid]/index"
            options={{ headerShown: false }}
          />
        </Stack>
      </ChatWrapper>
    </ChatContextProvider>
  );
}
