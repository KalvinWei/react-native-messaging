import { chatApiKey } from "lib/environment/chat-config";
import { Chat, OverlayProvider, useCreateChatClient } from "stream-chat-expo";
import { useAuth } from "lib/contexts/auth-context";
import { useChatContext } from "lib/contexts/chat-context";

type ChatWrapperProps = {
  children: React.ReactNode;
};

export default function ChatWrapper({ children }: ChatWrapperProps) {
  const auth = useAuth();
  const { streamToken } = useChatContext();

  const chatClient = useCreateChatClient({
    apiKey: chatApiKey,
    userData: auth.user,
    tokenOrProvider: streamToken,
  });

  if (chatClient) {
    return (
      <OverlayProvider>
        <Chat client={chatClient}>{children}</Chat>
      </OverlayProvider>
    );
  }
}
