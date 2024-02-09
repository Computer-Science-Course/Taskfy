import { StyleSheet } from "react-native";

const useStyles = ({ color, bgColor, fullWidth, size }) => StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
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