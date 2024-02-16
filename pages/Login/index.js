import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import Button from "../../components/Button";

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import useStyles from "./styles";

import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { usersStorage } from '../../services/AsyncStorage';

const Login = () => {
  const navigation = useNavigation();

  const colors = useColors(theme);
  const classes = useStyles(colors);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Verifica se os campos estão vazios
    if (!username || !password) {
      return Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos');
    }

    // Recupera os dados do usuário do AsyncStorage
    const users = await usersStorage.getValues();

    // Verifica se o usuário existe e a senha está correta
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      // Caso o usuário seja encontrado, navega para a tela Home
      navigation.navigate('Home');
    } else {
      // Caso contrário, exibe uma mensagem de erro
      Alert.alert('Usuário ou senha inválidos', 'Verifique seus dados e tente novamente');
    }
  };

  return (
    <View style={classes.container}>

      <Text style={classes.text}>Login</Text>

      <Text style={classes.text_usuario}>Usuário</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Digite seu usuário"
        placeholderTextColor="grey"
        onChangeText={text => setUsername(text)}
        value={username}
      />

      <Text style={classes.text_senha}>Senha</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Digite sua senha"
        placeholderTextColor="grey"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <Button
        onTouchEnd={handleLogin}
        color={colors.bg.text}
        bgColor={colors.main.bg}
        fullWidth
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