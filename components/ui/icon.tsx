import { Ionicons as IconComponent } from "@expo/vector-icons";

type IconProps = {
  name: keyof typeof IconComponent.glyphMap;
  size?: number;
  color?: string;
};

export default function Icon({ name, size, color }: IconProps) {
  return <IconComponent name={name} size={size} color={color} />;
}
