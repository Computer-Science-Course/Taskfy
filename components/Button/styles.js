import { StyleSheet } from "react-native";

const useStyles = ({ color, bgColor }) => StyleSheet.create({
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
  },
  text: {
    color: color,
  },
});

export default useStyles;