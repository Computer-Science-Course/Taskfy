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
    color: colors.bg.text,
    fontSize: 16,
    width: '100%',
  },
  text_senha: {
    color: colors.bg.text,
    fontSize: 16,
    width: '100%',
  },
  textInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.bg.text,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#fff', // Cor do texto inserido
    backgroundColor: colors.bg[5],
  },
  buttonText: {
    color: colors.bg.text,
    textDecorationLine: 'underline',
    fontSize: 16, // Tamanho da fonte
  },
  image_taskfy: {
    height: 100,
    width: 200,
    marginTop: -10,
  }
});

export default useStyles;