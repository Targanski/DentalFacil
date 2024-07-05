import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../firebase.config';

export function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!isEmailValid(email)) {
      Alert.alert('Erro', 'Por favor, insira um endereço de e-mail válido.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigation.navigate('Principal');
    } catch (error) {
      Alert.alert('Erro', 'Credenciais incorretas. Tente novamente.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Registro');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#5cc6ba" />
        <View style={styles.imageContainer}>
          <Image source={require('../../imagens/sggg.png')} style={styles.image} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#888888"
          />
          <Icon name="envelope" size={20} color="#5cc6ba" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#888888"
          />
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="#5cc6ba"
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Ainda não tem uma conta?</Text>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate('EsqueciSenha')}
        >
          <Text style={styles.forgotPasswordButtonText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: -80,
  },
  imageContainer: {
    width: '55%',
    aspectRatio: 2 / 4,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    width: '80%',
    justifyContent: 'center', // Centraliza horizontalmente
  },
  input: {
    backgroundColor: 'transparent', 
    flex: 1, // Para ocupar todo o espaço disponível no container
    height: 40,
    borderColor: '#5cc6ba', // cor da borda
    borderWidth: 1, // adiciona borda ao campo de entrada
    marginBottom: 5,
    paddingHorizontal: 10,
    color: '#000', // cor do texto
    borderRadius: 10, // borda arredondada
  },
  loginButton: {
    backgroundColor: '#5cc6ba', // cor de fundo do botão
    width: '53%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 25,
  },
  registerButton: {
    marginLeft: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#000',
    fontSize: 15,
  },
  registerButtonText: {
    color: '#1E90FF',
    fontSize: 14,
  },
  image: {
    flex: 1,
    marginTop: 220,
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  icon: {
    marginLeft: -30,
  },
  forgotPasswordButton: {
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  forgotPasswordButtonText: {
    color: '#1E90FF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
