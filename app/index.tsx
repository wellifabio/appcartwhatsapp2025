import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import MessageModal from "./components/MessageModal";
import { styles } from "./root/styles";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [email, setEmail] = useState("ana@email.com");
  const [senha, setSenha] = useState("senha123");
  const [users, setUsers] = useState<Array<{ id: number, nome: string; email: string; senha: string }>>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch("https://raw.githubusercontent.com/wellifabio/senai2025/refs/heads/main/assets/mockups/usuarios.json");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  async function handleLogin() {
    if (!email || !senha) {
      setModalMessage("Por favor, preencha todos os campos.");
      setModalVisible(true);
      return;
    }
    const user = users.find(u => u.email === email && u.senha === senha);
    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      router.replace("/screens");
    } else {
      setModalMessage("Email ou senha incorretos.");
    }
    setModalVisible(true);
  }

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>Apriveite suas compras!</Text>
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>Bem-vindo ao nosso aplicativo de compras.</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
