import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import DetalhesModal from "../components/DetalhesModal";
import MessageModal from "../components/MessageModal";
import Api from "../root/api";
import { styles } from "../root/styles";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState<null | Array<{ id: number; imagem: string; nome: string; preco: number; quantidade: number }>>(null);
  const [produtos, setProdutos] = useState<Array<{ id: number; nome: string; descricao: string; preco: number; categoria: string; imagem: string; estoque: number; ativo?: boolean }>>([]);
  const [selectedProduct, setSelectedProduct] = useState<null | { id: number; nome: string; descricao: string; preco: number; categoria: string; imagem: string; estoque: number }>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageVisible, setModalMessageVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    carregarSequencia();
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarSequencia();
    }, [])
  );

  async function carregarSequencia() {
    await fetchProdutos();
    await getCart();
  }

  async function fetchProdutos() {
    try {
      const response = await fetch(Api.BASE_URL + Api.PRODUCTS_ENDPOINT);
      const data = await response.json();
      const withAtivo = data.map((p: any) => ({ ...p, ativo: true }));
      setProdutos(withAtivo);
      return withAtivo;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return [];
    }
  }

  async function getCart() {
    try {
      const storedCart = await AsyncStorage.getItem("carrinho");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        setCarrinho(parsed);
      }
    } catch (error) {
      console.error("Erro ao carregar o carrinho:", error);
    }
  }

  function showDetails(productId: number) {
    const product = produtos.find(p => p.id === productId);
    if (product) {
      setSelectedProduct({ ...product });
      setModalVisible(true);
    }
  }

  async function removeToCart() {
    if (!selectedProduct) return;
    const updatedCart = (carrinho ?? []).filter(item => item.id !== selectedProduct.id);
    setCarrinho(updatedCart);
    await saveCart(updatedCart);
    setModalVisible(false);
  }

  async function saveCart(cart?: typeof carrinho) {
    const toSave = cart ?? carrinho;
    if (toSave === null || toSave === undefined) return;
    await AsyncStorage.setItem("carrinho", JSON.stringify(toSave));
  }

  function changeQuantity(productId: number, delta: number) {
    const updatedCart = (carrinho ?? []).map(item => {
      if (item.id === productId) {
        if (delta > 0 && item.quantidade >= (produtos.find(p => p.id === productId)?.estoque ?? 0)) {
          setModalMessage("Quantidade máxima disponível no estoque atingida.");
          setModalMessageVisible(true);
          return item;
        }
        const newQuantity = item.quantidade + delta;
        return { ...item, quantidade: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setCarrinho(updatedCart);
  }

  async function enviarWhatsApp(carrinho: Array<{ id: number; imagem: string; nome: string; preco: number; quantidade: number }>) {
    if (!carrinho || carrinho.length === 0) {
      setModalMessage("Seu carrinho está vazio.");
      setModalMessageVisible(true);
      return;
    }
    let mensagem = "Olá, gostaria de fazer o seguinte pedido:\n\n";
    carrinho.forEach(item => {
      mensagem += `- ${item.nome} (Quantidade: ${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
    mensagem += `\nTotalizando: R$ ${total.toFixed(2)}\n\nObrigado!`;
    const url = `https://wa.me/5519991860000?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
    //Limpar o carrinho após enviar o pedido
    setCarrinho([]);
    await saveCart([]);
  }

  useEffect(() => {
    saveCart();
  }, [carrinho]);

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>Meu carrinho de compras!</Text>
      <FlatList
        style={styles.list}
        data={carrinho ?? []}
        keyExtractor={(item, index) => String(item?.id ?? index)}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.linha}>

              <Image
                source={{ uri: item.imagem }}
                style={styles.listImg}
              />
              <View style={styles.direita}>
                <Text style={styles.text}>{item.nome}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity style={styles.leattleButton} onPress={() => { changeQuantity(item.id, -1) }}>
                    <Text style={styles.textButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.text}>{item.quantidade}</Text>
                  <TouchableOpacity style={styles.leattleButton} onPress={() => { changeQuantity(item.id, 1) }}>
                    <Text style={styles.textButton}>+</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.subtitle}>R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
                  <TouchableOpacity
                    style={styles.leattleButton}
                    onPress={() => { showDetails(item.id); }}
                  >
                    <Text style={styles.textButton}>Detalhes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: R$ {(carrinho ?? []).reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.button} onPress={async () => { enviarWhatsApp(carrinho ?? []); }}>
          <Text style={styles.textButton}>Enviar Pedido</Text>
        </TouchableOpacity>
      </View>
      <DetalhesModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        nome={selectedProduct?.nome ?? null}
        descricao={selectedProduct?.descricao}
        categoria={selectedProduct?.categoria}
        imagem={selectedProduct?.imagem}
        estoque={selectedProduct?.estoque}
        preco={selectedProduct?.preco}
        acao="Remover no carrinho"
        onAdd={removeToCart}
      />
      <MessageModal
        visible={modalMessageVisible}
        message={modalMessage}
        onClose={() => setModalMessageVisible(false)}
      />
    </View>

  );
}
