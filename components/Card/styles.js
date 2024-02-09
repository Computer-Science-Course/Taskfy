import { StyleSheet } from "react-native";

/** Aqui vão os estilos dos eslementos. Cada estilo pode ter um nome, tal qual "container". */
const useStyles = (colors) => StyleSheet.create({
  containerCard: {
    display: "flex",
    flexDirection: 'row',
    backgroundColor: colors.bg[5],
    width: 328,
    height: 'max-content',
  },
  text: {
    color: colors.bg.text, // A cor do texto.
  },
});

export default useStyles;