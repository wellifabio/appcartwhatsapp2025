import React from 'react';
import { Image, Modal, Pressable, Text, View } from 'react-native';
import { styles } from '../root/styles';

type Props = {
    visible: boolean;
    onClose: () => void;
    nome: string | null;
    imagem?: string;
    descricao?: string;
    categoria?: string;
    estoque?: number;
    preco?: number;
    onAdd: () => void;
};

export default function DetalhesModal({ visible, onClose, nome, imagem, descricao, categoria, estoque, preco, onAdd }: Props) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    {nome ? <Text style={styles.modalTitle}>{nome}</Text> : null}
                    {imagem ? <Image source={{ uri: `https://raw.githubusercontent.com/wellifabio/senai2025/main/assets/produtos/${imagem}` }} style={styles.modalImage} /> : null}
                    <Text style={styles.modalText}>{descricao}</Text>
                    <View style={styles.linha}>
                        <Text style={styles.modalText}>Categoria:</Text>
                        <Text style={styles.modalText}>{categoria}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Text style={styles.modalText}>Estoque disponível:</Text>
                        <Text style={styles.modalText}>{estoque}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Text style={styles.modalText}>Preço:</Text>
                        <Text style={styles.modalPreco}>{`R$ ${preco?.toFixed(2)}`}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Pressable style={styles.modalClose} onPress={onClose}>
                            <Text style={styles.textButton}>Fechar</Text>
                        </Pressable>
                        <Pressable style={styles.modalClose} onPress={onAdd}>
                            <Text style={styles.textButton}>Adicionar ao carrinho</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal >
    );
}