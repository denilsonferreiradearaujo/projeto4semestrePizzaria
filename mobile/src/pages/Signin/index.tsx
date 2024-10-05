import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { AuthContext } from "../../contexts/AuthContext"

export default function SignIn() {
  const { signIn, loadingAuth, errorMessage, clearError } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => clearError(); // Limpa a mensagem de erro ao alterar os campos de email ou senha
    console.log("useEffect")
  }, [email, password]);

  async function handleLogin() {
    // Função auxiliar para validar o formato do email
    function isValidEmail(email: string) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
      console.log("isValidEmail step")
    }

    // Função auxiliar para validar a força da senha
    function isValidPassword(password: string) {
      const minLength = 6;
      // const passwordRegex =
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return password.length >= minLength; // passwordRegex.test(password)
      console.log("isValidPassword step")

    }
    try {
      if (email === "" || password === "") {
        // Verificação se email ou senha estão vazios
        Alert.alert('Preencha os campos email e senha.')
        console.log("Preencha os campos email e senha.")

        return;
      }

      if (!isValidEmail(email)) {
        // Verificação de formato de email
        Alert.alert("Erro", "Formato de email inválido!");
        console.log("Formato de email inválido!");
        return;
      }

      if (!isValidPassword(password)) {
        // Verificação de força da senha
        Alert.alert(
          "Erro",
          "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
        );
        return;
      }
      await signIn({ email, password });
    } catch (error) {
      console.log("Erro ao acessar!", error);
    }

  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#f0f0f0"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="sua senha"
          placeholderTextColor="#f0f0f0"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}

        </TouchableOpacity>

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage && Alert.alert("Error",errorMessage)}</Text> // Exibe a mensagem de erro
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    marginBottom: 18,
    width: 300,
    height: 80,
  },

  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 34,
    paddingHorizontal: 14,
  },

  input: {
    width: "95%",
    height: 40,
    backgroundColor: "#101026",
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: "#FFC107",
    borderWidth: 0.3,
    borderColor: '#8a8a8a',
  },

  button: {
    width: "95%",
    height: 40,
    backgroundColor: "#B22222",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#101026",
  },

  errorMessage: {
    fontSize: 15,
    // fontWeight: "bold",
    color: "#b22222",
    paddingTop: 8,
  }
});
