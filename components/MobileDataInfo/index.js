import { useEffect, useState } from "react";
import { colors } from "../../config/styles";
import { View } from "react-native";
import { Text } from "react-native-svg";
import { Cable, ShieldQuestion, Signal, Wifi } from "lucide-react-native";
import useStyles from "./styles";
import NetInfo from '@react-native-community/netinfo';

connectionsTypes = {
  wifi: {
    Icon: Wifi,
    title: 'Wi-Fi'
  },
  cellular: {
    Icon: Signal,
    title: 'Celular'
  },
  none: {
    Icon: Cable,
    title: 'Sem conexão'
  },
  unknown: {
    Icon: ShieldQuestion,
    title: 'Sem conexão'
  }
}

const colors = useColors(theme);

const MobileDataInfo = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState('');
  const classes = useStyles(colors);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const { Icon, title } = connectionsTypes[connectionType || 'none'];

  return (
    <>
      {isConnected
        ? (
          <View style={classes.mobileDataInfoConnected}>
            <Text style={{ color: colors.bg[1] }}>
              Você está utilizando {title}
            </Text>
            <Icon color={colors.bg[1]} size={16} />
          </View>)
        : (
          <View style={classes.mobileDataInfoDisconnected}>
            <Text style={{ color: colors.white }}>
              Você não está conectado à internet!
            </Text>
            <Icon color={colors.white} size={16} />
          </View>)
      }
    </>
  );
};

export default MobileDataInfo;