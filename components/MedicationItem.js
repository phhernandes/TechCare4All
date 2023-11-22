import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componente funcional MedicationItem que recebe um objeto 'medication' como propriedade
const MedicationItem = ({ medication}) => {

  // Extrai as propriedades relevantes do objeto 'medication'
  const { dosage, time, medicationName, selectedPatient } = medication;
  
  // Renderiza as informações do medicamento em um contêiner
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Paciente: ${selectedPatient}`}</Text>
      <Text style={styles.text}>{`Medicamento: ${medicationName} (${dosage})`}</Text>
      <Text style={styles.text}>{`Horário: ${time}`}</Text>
    </View>
  );
};

// Estilos para o componente MedicationItem
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MedicationItem;
