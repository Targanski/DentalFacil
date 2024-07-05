import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Mais({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao DentalFacil</Text>
      <Text style={styles.description}>
        
      </Text>
      <Text style={styles.description}>
        
      </Text>
      <Text style={styles.listItem}>- .</Text>
      <Text style={styles.listItem}>- .</Text>
      <Text style={styles.listItem}>- .</Text>
      <Text style={styles.listItem}>- .</Text>
      <Text style={styles.description}>
        
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  listItem: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#FF0000', // Vermelho
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
