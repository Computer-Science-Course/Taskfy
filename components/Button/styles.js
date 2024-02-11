import { StyleSheet } from "react-native";

const useStyles = ({ color, bgColor, fullWidth, size, textAlign }) => StyleSheet.create({
  containerButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    justifyContent: textAlign,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: bgColor,
    borderRadius: 8,
    color: color,
    width: fullWidth ? '100%' : 'max-content',
  },
  text: {
    color: color,
    fontSize: size,
  },
});

export default useStyles;