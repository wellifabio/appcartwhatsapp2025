import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, View } from "react-native";
import Color from "./root/color";

export default function RootLayout() {
  const [nomeUsuario, setNomeUsuario] = useState<string>("Aguardando...");
  const [avatarUsuario, setAvatarUsuario] = useState<string>("");

  useEffect(() => {
    obterDadosUsuario();
    const interval = setInterval(obterDadosUsuario, 10000);
    return () => clearInterval(interval);
  }, []);

  const obterDadosUsuario = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setNomeUsuario(user.nome);
      setAvatarUsuario(user.avatar);
    }
  };

  const sair = () => {
    AsyncStorage.removeItem("user");
    router.replace("/");
  };

  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="screens" options={{
      title: nomeUsuario,
      headerLeft: () => (
        <Image
          source={{ uri: `https://raw.githubusercontent.com/wellifabio/senai2025/refs/heads/main/assets/avatares/${avatarUsuario}` }}
          style={{ width: 40, height: 40, borderRadius: 20, margin: 10 }}
        />
      ),

      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Button
            color={Color.c1}
            title="Sair"
            onPress={sair}
          />
        </View>)
    }} />
  </Stack>;
}
