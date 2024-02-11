import { StyleSheet } from "react-native";

/** Aqui vão os estilos dos eslementos. Cada estilo pode ter um nome, tal qual "container". */
const useStyles = (colors) => StyleSheet.create({
  containerTimerPicker: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  timerPicker: {
    display: "flex", // Recomendo pesquisar mais sobre o display flex.
    width: 430,
    flexDirection: "column", // O conteúdo da view vai ser organizado em coluna. Um embaixo do outro.
    backgroundColor: colors.bg[5], // A cor de fundo da view.
    borderRadius: 8,
    padding: 24,
    gap: 24,
  },
  timerSetArea: {
    textAlign: 'center',
    width: 96,
    borderRadius: 8,
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 45,
    fontWeight: '400',
    backgroundColor: '#36343B',
    color: colors.white,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
  },
  timerSetAreaActive: {
    backgroundColor: '#392C72',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#D0BCFF',
  },
  timerSetAreaLabel: {
    color: colors.white,
  },
  text: {
    color: colors.white,
  },
});

export default useStyles;