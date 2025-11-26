import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import DetalhesModal from "../components/DetalhesModal";
import { styles } from "../root/styles";

export default function Index() {

  const [carrinho, setCarrinho] = useState<null | Array<{ id: number; imagem: string; nome: string; preco: number; quantidade: number }>>(null);
  const [produtos, setProdutos] = useState<Array<{ id: number; nome: string; descricao: string; preco: number; categoria: string; imagem: string; estoque: number; ativo?: boolean }>>([]);
  const [selectedProduct, setSelectedProduct] = useState<null | { id: number; nome: string; descricao: string; preco: number; categoria: string; imagem: string; estoque: number; ativo?: boolean }>(null);
  const [categorias, setCategorias] = useState<Array<string>>([]);
  const [categoriaFilter, setCategoriaFilter] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    carregarSequencia();
  }, []);

  async function carregarSequencia() {
    const prods = await fetchProdutos();
    await getCart(prods);
  }

  async function fetchProdutos() {
    try {
      const response = await fetch("https://raw.githubusercontent.com/wellifabio/senai2025/main/assets/mockups/produtos.json");
      const data = await response.json();
      const withAtivo = data.map((p: any) => ({ ...p, ativo: true }));
      setProdutos(withAtivo);
      const uniqueCategories = Array.from(new Set(data.map((produto: { categoria: string }) => produto.categoria)));
      setCategorias(uniqueCategories as string[]);
      return withAtivo;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return [];
    }
  }

  async function getCart(fetchedProducts?: Array<{ id: number; nome: string; descricao: string; preco: number; categoria: string; imagem: string; estoque: number; ativo?: boolean }>) {
    try {
      const storedCart = await AsyncStorage.getItem("carrinho");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        setCarrinho(parsed);
        const target = fetchedProducts ?? produtos;
        target.forEach(produto => {
          const inCart = parsed.some((item: { id: number }) => item.id === produto.id);
          produto.ativo = inCart ? false : true;
        });
        setProdutos([...target]);
      }
    } catch (error) {
      console.error("Erro ao carregar o carrinho:", error);
    }
  }

  function showDetails(product: { id: number; nome: string; descricao: string; preco: number; categoria: string; imagem: string; estoque: number }) {
    setSelectedProduct({ ...product, ativo: true });
    setModalVisible(true);
  }

  async function addToCart() {
    if (!selectedProduct) return;
    const newItem = {
      id: selectedProduct.id,
      imagem: selectedProduct.imagem,
      nome: selectedProduct.nome,
      preco: selectedProduct.preco,
      quantidade: 1,
    };
    const updatedCart = carrinho ? [...carrinho, newItem] : [newItem];
    setCarrinho(updatedCart);
    produtos.forEach(produto => {
      if (produto.id === selectedProduct.id) {
        produto.ativo = false;
      }
    });
    setProdutos([...produtos]);
    await saveCart(updatedCart);
    setModalVisible(false);
  }

  async function saveCart(cart?: typeof carrinho) {
    const toSave = cart ?? carrinho;
    if (toSave === null || toSave === undefined) return;
    await AsyncStorage.setItem("carrinho", JSON.stringify(toSave));
  }

  useEffect(() => {
    saveCart();
  }, [carrinho]);

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>Boas compras!</Text>
      <Text style={[styles.subtitle, styles.linha, { padding: 10 }]}>Categorias</Text>
      <FlatList
        horizontal
        style={styles.listCategories}
        data={categorias}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              categoriaFilter === item ? styles.categoryButtonActive : null,
            ]}
            onPress={() => {
              if (categoriaFilter === item) {
                setCategoriaFilter(null);
              } else {
                setCategoriaFilter(item);
              }
            }}
          >
            <Text
              style={[
                styles.categoryButtonText,
                categoriaFilter === item ? styles.categoryButtonTextActive : null,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text style={[styles.subtitle, styles.linha, { padding: 10 }]}>Produtos</Text>
      <FlatList
        style={styles.list}
        data={categoriaFilter ? produtos.filter(p => p.categoria === categoriaFilter) : produtos}
        keyExtractor={(item, index) => String(item?.id ?? index)}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.linha}>
              <Image
                source={{ uri: `https://raw.githubusercontent.com/wellifabio/senai2025/main/assets/produtos/${item.imagem}` }}
                style={styles.listImg}
              />
              <View style={styles.listInfo}>
                <Text style={styles.subtitle}>{item.nome}</Text>
                <Text style={styles.text}>{item.descricao}</Text>
              </View>
              {item.ativo && <TouchableOpacity
                style={styles.button}
                onPress={() => { showDetails(item); }}
              >
                <Text style={styles.textButton}>Detalhes</Text>
              </TouchableOpacity> || <View style={styles.button}><Text style={styles.text}>Carrinho</Text></View>}
            </View>
          </View>
        )}
      />
      <DetalhesModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        nome={selectedProduct?.nome ?? null}
        descricao={selectedProduct?.descricao}
        categoria={selectedProduct?.categoria}
        imagem={selectedProduct?.imagem}
        estoque={selectedProduct?.estoque}
        preco={selectedProduct?.preco}
        onAdd={addToCart}
      />
    </View>

  );
}
