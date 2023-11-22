import React, { useState } from 'react';
import { View } from 'react-native';
import PatientForm from '../components/PatientForm';
import { Text } from 'react-native-web';

// Componente principal da tela de cadastro de pacientes
const PatientRegistrationScreen = () => {
  // Estado para controlar a exibição da mensagem de sucesso
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Função para lidar com o cadastro bem-sucedido de paciente
  const handlePatientRegistration = () => {
    console.log('Paciente cadastrado com sucesso!');
    setShowSuccessMessage(true);
    // Define um temporizador para ocultar a mensagem de sucesso após 3 segundos
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Renderiza o componente de tela
  return (
    <View>
      {/* Componente PatientForm para o formulário de cadastro de pacientes */}
      <PatientForm onSubmit={handlePatientRegistration} />
      
      {/* Exibe a mensagem de sucesso se 'showSuccessMessage' for verdadeiro */}
      {showSuccessMessage && (
        <View>
          <Text style={{ color: 'green', textAlign: 'center' }}>
            Paciente cadastrado com sucesso!
          </Text>
        </View>
      )}
    </View>
  );
};

// Exporta o componente para ser utilizado em outros lugares da aplicação
export default PatientRegistrationScreen;
