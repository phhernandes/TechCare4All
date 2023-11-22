import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import MedicationForm from '../components/MedicationForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente principal da tela de cadastro de medicamentos
const MedicationRegistrationScreen = ({ navigation }) => {
  // Estados para controlar a exibição da mensagem de sucesso e armazenar a lista de pacientes
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [patients, setPatients] = useState([]);

  // Função assíncrona para carregar a lista de pacientes do AsyncStorage
  const loadPatients = async () => {
    try {
      const savedPatients = await AsyncStorage.getItem('patients');
      if (savedPatients) {
        setPatients(JSON.parse(savedPatients));
      }
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    }
  };

  // Função para lidar com o cadastro bem-sucedido de medicamento
  const handleMedicationRegistration = () => {
    console.log('Medicamento cadastrado com sucesso!');
    setShowSuccessMessage(true);
    // Define um temporizador para ocultar a mensagem de sucesso após 3 segundos
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Efeito colateral para carregar a lista de pacientes ao focar na tela
  useEffect(() => {
    // Adiciona um ouvinte para o evento de foco na tela
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Lógica de atualização quando a tela é focada
      loadPatients();
    });

    // Remove o ouvinte ao desmontar o componente
    return unsubscribeFocus;
  }, [navigation]);

  // Renderiza o componente de tela
  return (
    <View>
      {/* Componente MedicationForm para o formulário de cadastro de medicamentos */}
      <MedicationForm patients={patients} onSubmit={handleMedicationRegistration} />
      
      {/* Exibe a mensagem de sucesso se 'showSuccessMessage' for verdadeiro */}
      {showSuccessMessage && (
        <View>
          <Text style={{ color: 'green', textAlign: 'center' }}>
            Medicamento cadastrado com sucesso!
          </Text>
        </View>
      )}
    </View>
  );
};

// Exporta o componente para ser utilizado em outros lugares da aplicação
export default MedicationRegistrationScreen;
