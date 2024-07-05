import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, Platform, KeyboardAvoidingView} from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';

export function EsqueciSenha({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        Alert.alert('Erro', 'Por favor, insira um endereço de e-mail válido.');
        return;
      }

      await sendPasswordResetEmail(auth, email);
      Alert.alert('Sucesso', 'Um e-mail de redefinição de senha foi enviado para o seu endereço de e-mail.');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', `Ocorreu um erro ao enviar o e-mail de redefinição de senha. ${error.message}`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#5cc6ba" />
        <View style={[styles.imageContainer, { marginTop: -150 }]}>
          <Image
            source={require('../../imagens/senha.png')} 
            style={styles.image}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#888888"
          />
          <Icon name="envelope" size={20} color="#000000" style={styles.icon} />
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    width: '55%',
    aspectRatio: 2 / 4,
    resizeMode: 'contain',
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
},

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#5cc6ba',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000000',
  },
  resetButton: {
    backgroundColor: '#5cc6ba',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    marginTop: 300,
    width: '55%',
  },
  icon: {
    marginLeft: -30,
  },
});
