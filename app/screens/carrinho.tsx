import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MessageModal from "../components/MessageModal";
import { styles } from "../root/styles";

export default function Carrinho() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [carrinho, setCarrinho] = useState<Array<{ id: number; nome: string; preco: number, quantidade: number }>>([]);

  useEffect(() => {

  }, []);

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>Seu carrinho de compras!</Text>
      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
