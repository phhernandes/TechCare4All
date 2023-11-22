import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Função assíncrona para salvar os dados do medicamento no AsyncStorage
const saveMedication = async (medicationData, onSubmit) => {
  try {
    // Obtém a lista atual de medicamentos do AsyncStorage ou inicializa uma lista vazia
    const medications = JSON.parse(await AsyncStorage.getItem('medications')) || [];
    
    // Adiciona o novo medicamento à lista
    medications.push(medicationData);
    
    // Salva a lista atualizada de medicamentos no AsyncStorage
    await AsyncStorage.setItem('medications', JSON.stringify(medications));
    
    // Chama a função de callback (se fornecida) após salvar o medicamento
    if (onSubmit) {
      onSubmit();
    }
  } catch (error) {
    console.error('Erro ao salvar o medicamento:', error);
  }
};


// Componente principal do formulário de medicamento
const MedicationForm = ({ patients, onSubmit }) => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Função para lidar com o envio do formulário
  const handleMedicationSubmit = () => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!medicationName || !dosage || !time || !selectedPatient) {
      return;
    }
    
    // Cria um objeto com os dados do medicamento
    const medicationData = { medicationName, dosage, time, selectedPatient };

    // Chama a função para salvar o medicamento no AsyncStorage
    saveMedication(medicationData, onSubmit);

    // Limpa os campos do formulário após o envio
    setMedicationName('');
    setDosage('');
    setTime('');
    setSelectedPatient(null);
  };

  // Renderiza o componente de formulário
  return (
    
    <View style={styles.container}>
      
      <Text style={styles.label}>Selecione o Paciente:</Text>
      <Picker
        selectedValue={selectedPatient}
        onValueChange={(itemValue, itemIndex) => setSelectedPatient(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um paciente" value={null} />
        {patients.map((patient) => (
          <Picker.Item key={patient.id} label={patient.name} value={patient.id} />
        ))}
      </Picker>
      
      <Text style={styles.label}>Nome do Medicamento:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do medicamento"
        value={medicationName}
        onChangeText={setMedicationName}
      />

      <Text style={styles.label}>Dosagem:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a dosagem do medicamento"
        value={dosage}
        onChangeText={setDosage}
      />

      <Text style={styles.label}>Horário:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o horário de administração"
        value={time}
        onChangeText={setTime}
      />

      <Button title="Cadastrar Medicamento" onPress={handleMedicationSubmit} />
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    fontWeight: 400,
    width: "65%",
  },
  picker: {
    height: 40,
    width: '65%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 2,
  },
});

export default MedicationForm;
