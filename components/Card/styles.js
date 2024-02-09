import { StyleSheet } from "react-native";

/** Aqui vão os estilos dos eslementos. Cada estilo pode ter um nome, tal qual "container". */
const useStyles = ({colors, itemSize}) => StyleSheet.create({
  containerCard: {
    display: "flex",
    backgroundColor: colors.bg[5],
    width: 430,
    borderRadius: 8,
    padding: 12,
    height: 'max-content',
    gap: 24
  },
  bottomButtonsCard: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  configButtonsCard: {
    gap: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
  },
  inputTextCard: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 16,
    paddingLeft: 16,
    fontSize: 16,
    fontWeight: '600',
    fontSize: itemSize,
    color: colors.white,
    height: 'max-content',
  },
});

export default useStyles;