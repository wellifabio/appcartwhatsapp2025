import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";
import Color from '../root/color';

export default function RootLayout() {
  return <Tabs
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Color.c1,
      tabBarInactiveTintColor: Color.c4,
      tabBarStyle: {
        height: "auto",
      },
    }}
  >
    <Tabs.Screen
      name="index"

      options={{
        title: "Produtos",
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
      }}

    />
    <Tabs.Screen name="carrinho"
      options={{
        title: "Carrinho",
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="shopping-cart" color={color} />,
      }}
    />
  </Tabs>;
}
