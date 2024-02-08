import { Text, View } from "react-native";

import { theme } from "../../config";
import { colors } from "../../config/styles";
import useStyles from "./styles";

const Home = () => {
  /** As cores estão configuradas, basta usá-las dentro do arquivo styles.js */
  const classes = useStyles(colors(theme));

  return (
    /** Pra usar o estilo, basta chamar ele como no exemplo abaixo. */
    <View style={classes.container}>
      {/* Isso é um comentário! Aqui dentro do view vai o conteúdo da tela. */}
      <Text style={classes.text}>Home</Text>
    </View>
  );
}

export default Home;