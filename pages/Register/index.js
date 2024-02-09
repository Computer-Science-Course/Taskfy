import { Text, View, StyleSheet, TextInput } from "react-native";
import Button from "../../components/Button";

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import { colors } from "../../config/styles";
import useStyles from "./styles";


const Register = () => {
  /** As cores estão configuradas, basta usá-las dentro do arquivo styles.js */
  const colors = useColors(theme);
  const classes = useStyles(colors);

  return (
    /** Pra usar o estilo, basta chamar ele como no exemplo abaixo. */
    <View style={classes.container}>

      <Text style={classes.text}>Cadastro</Text>

      <Text style={classes.text_usuario}>Usuário</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Digite o usuário"></TextInput>

      <Text style={classes.text_senha}>Senha</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Digite a senha"></TextInput>

      <Text style={classes.text_repetir_senha}>Repetir senha</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Repita a senha"></TextInput>
     
     <Button
        onTouchEnd={() => console.log("Clicou no botão!")}
        color={colors.bg.text}
        bgColor={colors.main.bg}
        title="CADASTRAR"
      />

    </View>
  );
}

export default Register;