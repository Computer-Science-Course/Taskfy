import { Text, View, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import uuid from 'react-native-uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import { colors } from "../../config/styles";
import useStyles from "./styles";


const Register = () => {
  /** As cores estão configuradas, basta usá-las dentro do arquivo styles.js */
  const colors = useColors(theme);
  const classes = useStyles(colors);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  async function handleNew() {
    try {

      const id = uuid.v4();

      const newData = {
        id,
        user,
        password,
        repeatPassword,
      }

      // { password == repeatPassword ? console.log("Senhas iguais") : Alert.alert("Senha Inválida", "Senhas diferentes, ambas devem ser iguais") }

      await AsyncStorage.setItem("@taskfy:users", JSON.stringify(newData));

      // Verificar se está apresentando a notificação no celular do resto da equipe.
      Toast.show({
        type: "success",
        text1: "Senha cadastrada com sucesso!"
      });

      console.log(newData);
    } catch (error) {
      console.log(error);
      
      Toast.show({
        type: "error",
        text1: "Não foi possivel cadastrar!"
      });
    }
  }

  return (
    /** Pra usar o estilo, basta chamar ele como no exemplo abaixo. */
    <View style={classes.container}>

      <Text style={classes.text}>Cadastro</Text>

      <Text style={classes.text_usuario}>Usuário</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Digite o usuário"
        placeholderTextColor='grey'
        onChangeText={setUser}
      ></TextInput>

      <Text style={classes.text_senha}>Senha</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Digite a senha"
        placeholderTextColor='grey'
        onChangeText={setPassword}
      ></TextInput>

      {/* Utilizar onChangeText para armazenar em uma variavel (senhaRepetida) e comparar se as senhas batem */}
      <Text style={classes.text_repetir_senha}>Repetir senha</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Repita a senha"
        placeholderTextColor='grey'
        onChangeText={setRepeatPassword}
      ></TextInput>

      <Button
        onTouchEnd={handleNew}
        color={colors.bg.text}
        bgColor={colors.main.bg}
        title="Cadastrar"
      />

      <Image
        source={require("../../assets/Taskfy_Login_Register_sem_fundo.png")}
        style={classes.image_taskfy}
      ></Image>

    </View>
  );
}

export default Register;