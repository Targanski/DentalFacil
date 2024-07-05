import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native';

const DentistList = ({ navigation, route }) => {
  const { dentists } = route.params;
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleNavigateToDentistDetails = (dentist) => {
    setSelectedDentist(dentist);
    setModalVisible(true);
  };

  const handleScheduleAppointment = (dentistId) => {
    navigation.navigate('Agenda', { dentistId });
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dentists.map(dentist => (
        <View key={dentist.id} style={styles.dentistItem}>
          <View style={styles.dentistDetails}>
            {dentist.imagem ? (
              <Image
                source={{ uri: dentist.imagem[0] }}
                style={styles.dentistImage}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />}
              />
            ) : (
              <ActivityIndicator style={styles.dentistImage} />
            )}
            <View style={styles.dentistInfo}>
              <Text style={styles.dentistName}>{dentist.nome}</Text>
              <Text style={styles.dentistSpecialty}>{dentist.especialidade}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.detailsButton} onPress={() => handleNavigateToDentistDetails(dentist)}>
              <Text style={styles.detailsButtonText}>Detalhes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scheduleButton} onPress={() => handleScheduleAppointment(dentist.id)}>
              <Text style={styles.scheduleButtonText}>Agendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Modal para exibir detalhes do dentista */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes do Dentista</Text>
            {selectedDentist && (
              <>
                <Image source={{ uri: selectedDentist.imagem[0] }} style={styles.modalImage} />
                <Text style={styles.modalText}>{selectedDentist.nome}</Text>
                <Text style={styles.modalText}>{selectedDentist.especialidade}</Text>
                {/* Adicione mais informações do dentista aqui, se necessário */}
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  dentistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 3,
    elevation: 5,
    marginBottom: 4,
    width: '90%',
  },
  dentistDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dentistImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 15,
  },
  dentistInfo: {
    flex: 1,
  },
  dentistName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dentistSpecialty: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  detailsButton: {
    backgroundColor: '#5cc6ba',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  scheduleButton: {
    backgroundColor: '#ffa500',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 11,
    alignSelf: 'flex-start',
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#5cc6ba',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default DentistList;
