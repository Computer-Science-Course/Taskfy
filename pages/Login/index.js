import { Text, View, TextInput, TouchableOpacity } from "react-native";
import Button from "../../components/Button";

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import useStyles from "./styles";

import { useNavigation } from '@react-navigation/native';
import { useState } from "react";

// const Login = () => {
//   /** As cores estão configuradas, basta usá-las dentro do arquivo styles.js */
//   const colors = useColors(theme);
//   const classes = useStyles(colors);

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const loginUser = async () => {

//     const userInput = {
//       username: username,
//       password: password,
//     }

//     // Função de Logar

//     // Chamada função

//   }

//   return (
//     /** Pra usar o estilo, basta chamar ele como no exemplo abaixo. */
    
//     <View style={classes.container}>

//       <Text style={classes.text}>Login</Text>

//       <Text style={classes.text_usuario}>Usuário</Text>
//       <TextInput 
//       style={classes.textInput} 
//       placeholder="Digite seu usuário"
//       placeholderTextColor="grey"
//       ></TextInput>

//       <Text style={classes.text_senha}>Senha</Text>
//       <TextInput
//         style={classes.textInput}
//         placeholder="Digite sua senha"
//         placeholderTextColor="grey"
//       ></TextInput>

//       <Button
//         onTouchEnd={() => console.log("Entrar no App")}
//         color={colors.bg.text}
//         bgColor={colors.main.bg}
//         title="entrar"
//       />
//       <TouchableOpacity
//         onPress={() => console.log('Criar conta')}>
//         <Text style={classes.buttonText}>Criar conta</Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

// export default Login;



const Login = () => {
  /** Navigator */
  const navigation = useNavigation();

  /** As cores estão configuradas, basta usá-las dentro do arquivo styles.js */
  const colors = useColors(theme);
  const classes = useStyles(colors);

  return (
    /** Pra usar o estilo, basta chamar ele como no exemplo abaixo. */

    <View style={classes.container}>

      <Text style={classes.text}>Login</Text>

      <Text style={classes.text_usuario}>Usuário</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Digite seu usuário"
        placeholderTextColor="grey"
      ></TextInput>

      <Text style={classes.text_senha}>Senha</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Digite sua senha"
        placeholderTextColor="grey"
      ></TextInput>

      <Button
        onTouchEnd={() => navigation.navigate('Home')}
        color={colors.bg.text}
        bgColor={colors.main.bg}
        title="entrar"
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}>
        <Text style={classes.buttonText}>Criar conta</Text>
      </TouchableOpacity>

    </View>
  );
}

export default Login;