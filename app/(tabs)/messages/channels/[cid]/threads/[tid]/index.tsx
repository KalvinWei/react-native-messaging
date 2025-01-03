import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useChatContext } from "lib/contexts/chat-context";
import { Channel, Thread } from "stream-chat-expo";
import { useHeaderHeight } from "@react-navigation/elements";

export default function ThreadScreen() {
  const { channel, thread, setThread } = useChatContext();
  const headerHeight = useHeaderHeight();

  if (!channel) {
    return (
      <View>
        <Text>Loading chat</Text>
      </View>
    );
  }

  const handleThreadDismount = () => {
    setThread(undefined);
  };

  return (
    <View>
      <Channel
        channel={channel}
        keyboardVerticalOffset={headerHeight}
        thread={thread}
        threadList
      >
        <View style={styles.container}>
          <Thread onThreadDismount={handleThreadDismount} />
        </View>
      </Channel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
