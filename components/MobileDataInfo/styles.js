import { StyleSheet } from "react-native";

const useStyles = (colors) => StyleSheet.create({
  mobileDataInfoConnected: {
    display: 'flex',
    gap: 8,
    backgroundColor: colors.lime[11],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.main.text,
    width: '100%',
    padding: 8,
  },
  mobileDataInfoDisconnected: {
    display: 'flex',
    gap: 8,
    backgroundColor: colors.red,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.main.text,
    width: '100%',
    padding: 8,
  }
});

export default useStyles;