import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { Ionicons } from '@expo/vector-icons';

export function Agenda({ navigation }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Agendamentos'), (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setAgendamentos(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAlarm = (appointment) => {
    // Lógica para configurar o alarme aqui
    // Isso pode envolver a integração com APIs nativas do dispositivo para agendar alarmes
  };

  const renderAgendamento = ({ item }) => (
    <TouchableOpacity
      style={styles.agendamentoItem}
      onPress={() => {
        setSelectedAppointment(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.agendamentoHeader}>
        <Image source={require('../../imagens/sggg.png')} style={styles.agendamentoImage} />
        <View style={styles.agendamentoInfo}>
          <Text style={styles.agendamentoTitle}>{item.dentistName}</Text>
          <Text style={styles.agendamentoSubtitle}>{item.specialty}</Text>
          <Text style={styles.agendamentoDateTime}>{item.date} às {item.time}</Text>
        </View>
        <Ionicons name="calendar" size={24} color="#a6ded5" />
      </View>
    </TouchableOpacity>
  );

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={agendamentos}
        renderItem={renderAgendamento}
        keyExtractor={(item) => item.id}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedAppointment && (
              <>
                <Text style={styles.modalTitle}>Detalhes do Agendamento</Text>
                <Text style={styles.modalText}><Text style={styles.boldText}>Dentista:</Text> {selectedAppointment.dentistName}</Text>
                <Text style={styles.modalText}><Text style={styles.boldText}>Especialidade:</Text> {selectedAppointment.specialty}</Text>
                <Text style={styles.modalText}><Text style={styles.boldText}>Data:</Text> {selectedAppointment.date}</Text>
                <Text style={styles.modalText}><Text style={styles.boldText}>Hora:</Text> {selectedAppointment.time}</Text>
                <Text style={styles.modalText}><Text style={styles.boldText}>Nome do Paciente:</Text> {selectedAppointment.formData.name}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  agendamentoItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para alinhar a imagem à esquerda e o ícone à direita
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  agendamentoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agendamentoInfo: {
    flex: 1,
  },
  agendamentoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  
  agendamentoSubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'left',
  },
  agendamentoDateTime: {
    fontSize: 14,
    color: '#777',
    textAlign: 'left',
  },
  agendamentoImage: {
    width: 45, // Defina o tamanho da imagem conforme necessário
    height: 45,
    borderRadius: 10, // Metade da largura ou
  },
  modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 20,
  alignItems: 'center',
  width: '80%',
  shadowColor: '#000',
  shadowOffset: {
  width: 0,
  height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  },
  modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
  },
  modalText: {
  fontSize: 16,
  marginBottom: 10,
  textAlign: 'center',
  },
  closeButton: {
  backgroundColor: '#FF6347',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  marginTop: 10,
  },
  closeButtonText: {
  color: '#fff',
  fontSize: 16,
  textAlign: 'center',
  },
  boldText: {
  fontWeight: 'bold',
  },
  });
  
  export default Agenda;