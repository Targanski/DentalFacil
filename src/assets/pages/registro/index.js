// Importação de bibliotecas e módulos necessários
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC8sVrXV1TzjHE3f2H1LFNFiVJKtMnVidk",
  authDomain: "keyguardian-93b5b.firebaseapp.com",
  projectId: "keyguardian-93b5b",
  storageBucket: "keyguardian-93b5b.appspot.com",
  messagingSenderId: "981423735163",
  appId: "1:981423735163:web:08fdc94f16df063335fdde"
};

// Inicialização do aplicativo Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export function Registro({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [cpf, setCPF] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordValid = (password) => {
    if (password.length <= 6) {
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      return false;
    }

    if (!/\d/.test(password)) {
      return false;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return false;
    }

    return true;
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSave = async () => {
    if (!email || !password || !fullName || !cpf || !phone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!isEmailValid(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    if (!isPasswordValid(password)) {
      Alert.alert('Erro', 'A senha não atende aos critérios necessários.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso', 'Usuário registrado com sucesso.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao registrar o usuário: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar o usuário.');
    }
  }

  const handleLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#5cc6ba" />
          <Image
            source={require('../../imagens/Registro.png')}
            style={styles.image}
          />
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                onChangeText={(text) => setFullName(text)}
                placeholderTextColor="#888888"
              />
              <Icon name="user" size={20} color="#5cc6ba" style={styles.icon} />
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
                placeholder="CPF"
                onChangeText={(text) => setCPF(text)}
                placeholderTextColor="#888888"
              />
              <Icon name="id-card" size={20} color="#5cc6ba" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Telefone"
                onChangeText={(text) => setPhone(text)}
                placeholderTextColor="#888888"
              />
              <Icon name="phone" size={20} color="#5cc6ba" style={styles.icon} />
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
            <TouchableOpacity style={styles.loginButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
              <Text style={styles.registerButtonText}>Já tem uma conta? Entre aqui.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#5cc6ba',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000000',
  },
  loginButton: {
    backgroundColor: '#5cc6ba',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
  registerButton: {
    backgroundColor: 'transparent',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFFF',
    fontSize: 18,
    fontWeight: 'bold', 
  },
  registerButtonText: {
    color: '#0056fe',
    fontSize: 14,
  },
  image: {
    alignSelf: 'center', // Centraliza a imagem horizontalmente
    marginTop: 50,
    marginBottom: -10,
    width: '50%',
    height: 150,
    resizeMode: 'contain',
  },
  icon: {
    marginLeft: -20,
  },
});
