import { Text, View, StyleSheet, TextInput, Image, Alert } from "react-native";
import Button from "../../components/Button";

import { theme } from "../../config";
import { colors as useColors } from "../../config/styles";
import { colors } from "../../config/styles";
import useStyles from "./styles";

import { usersStorage } from "../../services/AsyncStorage";
import React, { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Register = () => {
  /** As cores estão configuradas, basta usá-las dentro do arquivo styles.js */
  const colors = useColors(theme);
  const classes = useStyles(colors);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const createUser = async () => {
    const id = uuid.v4();

    if (password != repeatPassword) {
      return Alert.alert('Senhas diferentes', 'Por favor, repita a senha');
    }

    const newUser = {
      id,
      username: username,
      password: password,
    }

    const saveUser = async (newUser) => {
      const users = await usersStorage.getValues();

      const userExists = users.some((user) => user.username === newUser.username);
      if (!userExists) {
        await usersStorage.setValue(newUser);
      } else {
        return Alert.alert('Usuário já existe!');
      }

    }
    saveUser(newUser);
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
        onChangeText={setUsername}
        value={username}
      ></TextInput>

      <Text style={classes.text_senha}>Senha</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Digite a senha"
        placeholderTextColor='grey'
        onChangeText={setPassword}
        value={password}
      ></TextInput>

      <Text style={classes.text_repetir_senha}>Repetir senha</Text>
      <TextInput
        style={classes.textInput}
        placeholder="Repita a senha"
        placeholderTextColor='grey'
        onChangeText={setRepeatPassword}
        value={repeatPassword}
      ></TextInput>

      <Button
        color={colors.bg.text}
        bgColor={colors.main.bg}
        title="CADASTRAR"
        onTouchEnd={createUser}
        fullWidth
      />

      <Image
        source={require("../../assets/Taskfy_Login_Register_sem_fundo.png")}
        style={classes.image_taskfy}
      ></Image>

    </View>
  );
}

export default Register;