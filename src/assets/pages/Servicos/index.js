import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase.config';  

const windowWidth = Dimensions.get('window').width;

export function Servicos() {
  const [searchText, setSearchText] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesCollection = collection(db, 'Servicos');
        const serviceSnapshot = await getDocs(servicesCollection);
        const servicesList = serviceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(servicesList);
      } catch (error) {
        setError("Erro ao buscar serviços. Por favor, tente novamente mais tarde.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const openDentistList = async (serviceId) => {
    try {
      const service = services.find(service => service.id === serviceId);
      if (service) {
        const dentistRefs = service.Dentistas;
        if (dentistRefs && Array.isArray(dentistRefs)) {
          const dentists = [];
          for (const ref of dentistRefs) {
            console.log(`Buscando dentista na referência: ${ref.path}`);
            const dentistDoc = await getDoc(doc(db, ref.path));
            console.log("Dentista encontrado:", dentistDoc.data());
            if (dentistDoc.exists()) {
              dentists.push({ id: dentistDoc.id, ...dentistDoc.data() });
            } else {
              console.error(`Dentista com ID ${ref.id} não encontrado.`);
            }
          }
          if (dentists.length > 0) {
            navigation.navigate('DentistList', { dentists });
          } else {
            console.error('Nenhum dentista encontrado para este serviço.');
          }
        } else {
          console.error('Nenhuma referência de dentista encontrada.');
        }
      } else {
        console.error(`Serviço "${serviceId}" não encontrado.`);
      }
    } catch (error) {
      console.error("Erro ao abrir a lista de dentistas:", error);
    }
  };
  
  

  const isTextInServiceName = (text, serviceName) => {
    return serviceName.toLowerCase().includes(text.toLowerCase());
  };

  const filteredServices = searchText ? services.filter(service => isTextInServiceName(searchText, service.nome)) : services;

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar serviços"
          placeholderTextColor="#888888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Carregando serviços...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.servicesContainer}>
          {filteredServices.map(service => (
            <TouchableOpacity key={service.id} style={styles.serviceItem} onPress={() => openDentistList(service.id)}>
              <Image source={{ uri: service.imagem[0] }} style={styles.serviceImage} />
              <Text style={styles.serviceText}>
                {service.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#5cc6ba",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: "center",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  serviceItem: {
    width: 110,
    backgroundColor: "#ffff",
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginTop: 10,
  },
  serviceText: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 10,
    color: "#888888",
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#5cc6ba',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});

export default Servicos;
