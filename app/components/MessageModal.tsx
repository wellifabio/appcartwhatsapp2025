import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { styles } from '../root/styles';

type Props = {
    visible: boolean;
    message: string | null;
    onClose: () => void;
    title?: string;
};

export default function MessageModal({ visible, message, onClose, title }: Props) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    {title ? <Text style={styles.modalTitle}>{title}</Text> : null}
                    <Text style={styles.modalText}>{message}</Text>
                    <Pressable style={styles.modalClose} onPress={onClose}>
                        <Text style={styles.textButton}>Fechar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}