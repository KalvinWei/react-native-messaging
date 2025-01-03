import { chatUserId } from "lib/environment/chat-config";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ChannelList } from "stream-chat-expo";
import { useChatContext } from "lib/contexts/chat-context";
import { useAuth } from "lib/contexts/auth-context";

export default function MessagesScreen() {
  const auth = useAuth();

  const filters = {
    members: { $in: [auth.user.id] },
    type: "messaging",
  };
  const sort: any = { last_updated: -1 };
  const options = {
    state: true,
    watch: true,
  };

  const memoizedFilters = useMemo(() => filters, []);

  const router = useRouter();
  const { setChannel } = useChatContext();

  const handleChannelSelected = (channel) => {
    setChannel(channel);
    router.push(`/messages/channels/${channel.cid}`);
  };

  return (
    <View style={styles.container}>
      <ChannelList
        filters={memoizedFilters}
        options={options}
        sort={sort}
        onSelect={handleChannelSelected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
