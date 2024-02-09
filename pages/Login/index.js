// import { Text, View } from "react-native";

// import { theme } from "../../config";
// import { colors } from "../../config/styles";
// import useStyles from "./styles";

// const Login = () => {
//   /** As cores estão configuradas, basta usá-las dentro do arquivo styles.js */
//   const classes = useStyles(colors(theme));

//   return (
//     /** Pra usar o estilo, basta chamar ele como no exemplo abaixo. */
//     <View style={classes.container}>
      
//       <Text style={classes.text}>Login</Text>
//     </View>
//   );
// }

// export default Login;

import { Text, View, StyleSheet, TextInput } from "react-native";

import { theme } from "../../config";
import { colors } from "../../config/styles";
import useStyles from "./styles";

const Login = () => {
  /** As cores estão configuradas, basta usá-las dentro do arquivo styles.js */
  const classes = useStyles(colors(theme));

  return (
    /** Pra usar o estilo, basta chamar ele como no exemplo abaixo. */
    <View style={classes.container}>
      <Text style={classes.text}>Login</Text>
      <Text style={classes.text_usuario}>Usuário</Text>
      <TextInput>Digite o usuário</TextInput>
      <Text style={classes.text_senha}>Senha</Text>
      <TextInput>Digite a senha</TextInput>
    </View>
  );
}

export default Login;