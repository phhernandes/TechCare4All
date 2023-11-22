import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Função assíncrona para salvar os dados do paciente no AsyncStorage
const savePatient = async (patientData, onSubmit) => {
  try {
    // Obtém a lista atual de pacientes do AsyncStorage ou inicializa uma lista vazia
    const patients = JSON.parse(await AsyncStorage.getItem('patients')) || [];
    
    // Adiciona o novo paciente à lista
    patients.push(patientData);
    
    // Salva a lista atualizada de pacientes no AsyncStorage
    await AsyncStorage.setItem('patients', JSON.stringify(patients));
    
    // Salva a lista atualizada de pacientes no AsyncStorage
    if (onSubmit) {
      onSubmit();
    }
  } catch (error) {
    console.error('Erro ao salvar o paciente:', error);
  }
};

// Salva a lista atualizada de pacientes no AsyncStorage
const PatientForm = ({ onSubmit }) => {
  // Estados para armazenar os dados do formulário
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  // Função para lidar com o envio do formulário
  const handlePatientSubmit = () => {
    // Função para lidar com o envio do formulário
    if (!name || !age || !gender) {
      return;
    }

    // Cria um objeto com os dados do paciente
    const patientData = { name, age, gender };
    // Chama a função para salvar o paciente no AsyncStorage
    savePatient(patientData, onSubmit);

    // Limpa os campos do formulário após o envio
    setName('');
    setAge('');
    setGender('');
  };

  // Renderiza o componente de formulário
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Paciente:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do paciente"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Idade:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a idade do paciente"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.label}>Gênero:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o gênero" value="" />
        <Picker.Item label="Homem" value="Homem" />
        <Picker.Item label="Mulher" value="Mulher" />
      </Picker>

      <Button title="Cadastrar Paciente" onPress={handlePatientSubmit} />
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 42,
    paddingBottom: 42,
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

export default PatientForm;
