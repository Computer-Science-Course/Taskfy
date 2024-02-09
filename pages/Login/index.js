import { Text, View, StyleSheet, TextInput } from "react-native";
import Button from "../../components/Button";

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import useStyles from "./styles";
import { ChevronDown } from "lucide-react-native";

const Login = () => {
  /** As cores estão configuradas, basta usá-las dentro do arquivo styles.js */
  const colors = useColors(theme);
  const classes = useStyles(colors);

  return (
    /** Pra usar o estilo, basta chamar ele como no exemplo abaixo. */
    <View style={classes.container}>

      <Text style={classes.text}>Login</Text>

      <Text style={classes.text_usuario}>Usuário</Text>
      <TextInput style={classes.textInput} placeholder="Digite seu usuário"></TextInput>

      <Text style={classes.text_senha}>Senha</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Digite sua senha"
        
      >

      </TextInput>

      <Button
        onTouchEnd={() => console.log("Clicou no botão!")}
        color={colors.bg.text}
        bgColor={colors.main.bg}
        title="ENTRAR"
      />

    </View>
  );
}

export default Login;