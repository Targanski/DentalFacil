import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const navigation = useNavigation();

  const handleAgendarConsulta = () => {
    navigation.navigate('Servicos', { headerShown: true }); // Navega para a tela de Serviços com a barra de navegação visível
  };
  

  const handleASobrenos = () => {
    navigation.navigate('Mais'); // Supondo que 'Mais' seja o nome da tela de Mais
  };

  const handleSuporteAtendimento = () => {
    Linking.openURL('whatsapp://send?phone=6599590773'); // Substitua 'SEUNUMERO' pelo número de telefone do WhatsApp
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#5cc6ba']}
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Bem-vindo ao DentalFacil</Text>
      </View>

      {/* Adicionando componente de imagem e texto sobre o Dental Fácil */}
      <TouchableOpacity style={styles.dentalFacilContainer}>
        <Image
          source={require("../../imagens/sggg.png")} // Substitua o caminho pela localização real da sua imagem
          style={styles.dentalFacilImage}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.card} onPress={handleAgendarConsulta}>
          <Ionicons name="calendar" size={24} color="#5cc6ba" />
          <Text style={styles.cardText}>Agendar Consulta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleSuporteAtendimento}>
  <Ionicons name="chatbubbles-outline" size={24} color="#5cc6ba" />
  <Text style={styles.cardText}>Suporte de Atendimento</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleASobrenos}>
          <Ionicons name="information-circle" size={24} color="#5cc6ba" />
          <Text style={styles.cardText}>Sobre Nós</Text>
        </TouchableOpacity>
      </ScrollView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'transparent',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, 
    padding: 1
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    width: '80%',
  },
  cardText: {
    marginLeft: 20,
    fontSize: 18,
    color: '#333333',
  },
  dentalFacilContainer: {
    alignItems: 'center',
    marginBottom: 10,
    flex: 5
  },
  dentalFacilImage: {
    width: 250, // Diminui o tamanho da imagem
    height: 250, // Diminui o tamanho da imagem
    borderRadius: 5, // Ajusta o borderRadius para metade da largura e altura para manter o formato circular
    marginBottom: 1,
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'transparent',
  },
});

export default Home;
