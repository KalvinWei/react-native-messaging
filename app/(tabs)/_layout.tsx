import { Tabs, usePathname } from "expo-router";
import Icon from "components/ui/icon";

export default function TabsLayout() {
  const pathname = usePathname();
  const isMessagesRoute = pathname.startsWith("/messages");

  return (
    <Tabs screenOptions={{ headerShown: !isMessagesRoute }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size * 0.8} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbox" size={size * 0.8} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" size={size * 0.8} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
