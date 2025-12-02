import { StyleSheet } from "react-native";
import color from "./color";

export const styles = StyleSheet.create({
    //Global
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.c1,
    },
    text: {
        color: color.c5,
        fontSize: 16,
    },
    title: {
        margin: 20,
        color: color.c5,
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        color: color.c5,
        fontSize: 18,
        fontWeight: "bold",
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },

    //Formuário
    form: {
        width: "80%",
        margin: 20,
        padding: 10,
        backgroundColor: color.c2,
        borderRadius: 5,
        gap: 10,
    },
    input: {
        padding: 10,
        borderColor: color.c3,
        borderWidth: 1,
        borderRadius: 5,
        color: color.c5,
    },
    button: {
        backgroundColor: color.c4,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    textButton: {
        color: color.c1,
        fontSize: 14,
        fontWeight: "bold",
    },

    //Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: color.t1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '80%',
        backgroundColor: color.c4,
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalText: {
        marginBottom: 12,
        color: color.c1,
    },
    modalPreco: {
        marginBottom: 12,
        color: color.c1,
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalClose: {
        marginTop: 8,
    },
    modalImage: {
        width: 200,
        height: 200,
        margin: 10,
    },

    //Listas
    list: {
        width: '100%',
        height: '100%',
        padding: 10,
        marginBottom: 12,
    },
    listItem: {
        padding: 15,
        borderBottomColor: color.c3,
        borderBottomWidth: 1,
    },
    linha: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    listInfo: {
        width: "60%",
    },
    listImg: {
        width: 50,
        height: 50,
        margin: 5,
    },

    //Categorias
    listCategories: {
        width: "100%",
        height: 200,
        padding: 10,
    },
    categoryButton: {
        padding: 10,
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        borderRadius: 60,
        backgroundColor: color.c2,
    },
    categoryButtonActive: {
        backgroundColor: color.c4,
    },
    categoryButtonText: {
        color: color.c5,
        fontWeight: "bold",
    },
    categoryButtonTextActive: {
        color: color.c1,
    },

    //Carrinho
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    leattleButton: {
        backgroundColor: color.c4,
        padding: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    totalContainer: {
        padding: 15,
        borderTopColor: color.c3,
        borderTopWidth: 1,
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        color: color.c5,
    },
    direita: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
});