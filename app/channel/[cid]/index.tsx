import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useMemo } from "react";
import { Stack, useRouter } from "expo-router";
import {
  Channel,
  MessageInput,
  MessageList,
  useAttachmentPickerContext,
} from "stream-chat-expo";
import { useAppChatContext } from "contexts/app-context";
import { useHeaderHeight } from "@react-navigation/elements";

const ChannelScreen = () => {
  const { channel, setThread } = useAppChatContext();
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
    router.push(`/channel/${channel.cid}/thread/${thread.cid}`);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Channel Screen" }} />
      {channel ? (
        <Channel channel={channel} keyboardVerticalOffset={headerHeight}>
          <MessageList onThreadSelect={handleThreadSelected} />
          <MessageInput />
        </Channel>
      ) : null}
    </View>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
