import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import {
  Channel,
  MessageInput,
  MessageList,
  useAttachmentPickerContext,
} from "stream-chat-expo";
import { useChatContext } from "lib/contexts/chat-context";
import { useHeaderHeight } from "@react-navigation/elements";

const ChannelScreen = () => {
  const { channel, setThread } = useChatContext();
  const { setTopInset } = useAttachmentPickerContext();
  const headerHeight = useHeaderHeight();
  const router = useRouter();

  useEffect(() => {
    setTopInset(headerHeight);
  }, [headerHeight, setTopInset]);

  if (!channel) {
    return (
      <SafeAreaView>
        <Text>Loading chat ...</Text>
      </SafeAreaView>
    );
  }

  const handleThreadSelected = (thread) => {
    setThread(thread);
    router.push(`/messages/channels/${channel.cid}/threads/${thread.cid}`);
  };

  return (
    <View style={styles.container}>
      {channel && (
        <Channel channel={channel} keyboardVerticalOffset={headerHeight}>
          <MessageList onThreadSelect={handleThreadSelected} />
          <MessageInput />
        </Channel>
      )}
    </View>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
