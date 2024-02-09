import { StyleSheet } from "react-native";

/** Aqui vão os estilos dos eslementos. Cada estilo pode ter um nome, tal qual "container". */
const useStyles = (colors) => StyleSheet.create({
  containerHome: {
    display: "flex", // Recomendo pesquisar mais sobre o display flex.
    flex: 1, // Isso faz a view ocupar toda a tela.
    flexDirection: "column", // O conteúdo da view vai ser organizado em coluna. Um embaixo do outro.
    backgroundColor: colors.bg[1], // A cor de fundo da view.

    /** Essas propriedades podem ser apagadas, se quiseres. */
    justifyContent: "center", // O conteúdo vai ser centralizado verticalmente.
    alignItems: "center", // O conteúdo vai ser centralizado horizontalmente.
  },
  text: {
    color: colors.bg.text, // A cor do texto.
  },
});

export default useStyles;