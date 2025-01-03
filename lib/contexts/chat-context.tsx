import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import axios from "axios";
import getStreamToken from "lib/api/stream-chat";

type IChat = {
  channel: any;
  setChannel: (channel: any) => void;
  thread: any;
  setThread: (thread: any) => void;
  streamToken: string;
};

export const ChatContext = createContext<IChat>({
  channel: null,
  setChannel: (channel) => {},
  thread: null,
  setThread: (thread) => {},
  streamToken: "",
});

export function ChatContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const [streamToken, setStreamToken] = useState("");
  const [channel, setChannel] = useState();
  const [thread, setThread] = useState();

  useEffect(() => {
    async function getStreamAccessToken() {
      if (!!auth.accessToken) {
        const streamToken = await getStreamToken(auth.accessToken);
        setStreamToken(streamToken);
      }
    }
    getStreamAccessToken();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        channel,
        setChannel,
        thread,
        setThread,
        streamToken,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);
