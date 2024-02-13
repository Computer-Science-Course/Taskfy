import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

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
  HomeHeaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main.bg,
    width: "100%",
    padding: 24,
  },
  HomeContentContainer: {
    width: "100%",
    flex: 1,
  },
  HomeNoContent: {
    display: "flex",
    width: "100%",
    flex: 1,
    alignItems: "center",
    gap: 16,
  },
  HomeColumnTitle: {
    width: "100%",
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
  cardsArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    width: width,
    padding: 16,
    paddingBottom: 80
  },
  titleCardsArea: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    width: '100%'
  },
});

export default useStyles;