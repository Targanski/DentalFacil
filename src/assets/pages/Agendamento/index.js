import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../../firebase.config';

// Configurar o LocaleConfig para português
LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.',
    'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'
  ],
  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

const BookingScreen = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    observation: ''
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [userID, setUserID] = useState(null);
  const [dentistData, setDentistData] = useState(null);
  const { dentistId } = route.params;

  useEffect(() => {
    const fetchDentistInfo = async () => {
      try {
        const dentistDoc = await getDoc(doc(db, 'Dentistas', dentistId));
        if (dentistDoc.exists()) {
          const dentistData = dentistDoc.data();
          setDentistData(dentistData);
        }
      } catch (error) {
        console.error("Erro ao buscar informações do dentista:", error);
      }
    };
    
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserID(user.uid);
      fetchDentistInfo();
    } else {
      navigation.navigate('Login');
    }
  }, [dentistId, navigation]);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setModalVisible(true);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    setShowTimeSlots(true);
  };

  const handleBooking = async () => {
    try {
      if (!userID) {
        alert('Usuário não autenticado!');
        return;
      }

      if (!selectedTime) {
        alert('Por favor, selecione um horário!');
        return;
      }

      const appointmentData = {
        date: selectedDate,
        time: selectedTime,
        userID: userID,
        formData: formData,
        dentistID: dentistId,
        dentistName: dentistData?.nome || 'Nome Indisponível',
        specialty: dentistData?.especialidade || 'Especialidade Indisponível'
      };
      
      await addDoc(collection(db, 'Agendamentos'), appointmentData);
      
      setModalVisible(false);
      setShowTimeSlots(false);
      setSelectedTime('');
      setSelectedDate('');
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        observation: ''
      });
      alert('Agendamento Confirmado!');
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar agendar a consulta. Tente novamente.');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const renderTimeSlots = () => {
    const availableTimes = ['9:00', '10:00', '14:00'];
    return (
      <View style={styles.timeSlotsContainer}>
        <Text style={styles.timeSlotsTitle}>Horários Disponíveis:</Text>
        {availableTimes.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.availableTime, selectedTime === time && styles.selectedTime]}
            onPress={() => handleTimeSelect(time)}
          >
            <Text style={styles.timeText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#5cc6ba' },
        }}
        minDate={today}
        theme={{
          textDayFontFamily: '',
          textMonthFontFamily: '',
          textDayHeaderFontFamily: '',
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {!showTimeSlots ? (
              <>
                <Text style={styles.formTitle}>Preencha os dados para agendar:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome Completo"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Número de Telefone"
                  value={formData.phoneNumber}
                  onChangeText={(text) => handleInputChange('phoneNumber', text)}
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Observação"
                  multiline={true}
                  value={formData.observation}
                  onChangeText={(text) => handleInputChange('observation', text)}
                />
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}
                  >
                    <Text style={styles.nextButtonText}>Avançar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {renderTimeSlots()}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={handleBooking}
                >
                  <Text style={styles.bookButtonText}>Agendar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#5cc6ba',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 80,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#000',
  },
  nextButton: {
    backgroundColor: '#5cc6ba',
    padding: 10,
    borderRadius: 5,
  },
  nextButtonText: {
    color:    '#fff',
    fontWeight: 'bold',
  },
  timeSlotsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  timeSlotsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5cc6ba',
  },
  availableTime: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '50%',
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: '#5cc6ba',
  },
  timeText: {
    color: '#000',
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
  },
  bookButton: {
    backgroundColor: '#5cc6ba',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BookingScreen;

