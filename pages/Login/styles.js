import { StyleSheet } from "react-native";

/** Aqui vão os estilos dos eslementos. Cada estilo pode ter um nome, tal qual "container". */
const useStyles = (colors) => StyleSheet.create({
  container: {
    display: "flex", // Recomendo pesquisar mais sobre o display flex.
    flex: 1, // Isso faz a view ocupar toda a tela.
    flexDirection: "column", // O conteúdo da view vai ser organizado em coluna. Um embaixo do outro.
    backgroundColor: colors.bg[1], // A cor de fundo da view.
    paddingLeft: 20,
    paddingRight: 20,
    /** Essas propriedades podem ser apagadas, se quiseres. */
    justifyContent: "center", // O conteúdo vai ser centralizado verticalmente.
    alignItems: "center", // O conteúdo vai ser centralizado horizontalmente.
    gap: 16,
  },
  text: {
    color: colors.bg.text, // A cor do texto.
    fontSize: 48,
    fontWeight: "700",
  },
  text_usuario: {
    fontSize: 20,
    width: '100%',
  },
  text_senha: {
    fontSize: 20,
    width: '100%',
  },
  textInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    color: '#fff', // Cor do texto inserido
    backgroundColor: "white",
  }
});

export default useStyles;