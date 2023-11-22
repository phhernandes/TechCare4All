import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MedicationItem from '../components/MedicationItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente principal da tela de acompanhamento de administração de medicamentos
const TrackingScreen = ({ navigation }) => {
  // Estado para armazenar a lista de medicamentos
  const [medications, setMedications] = useState([]);

  // Função assíncrona para carregar a lista de medicamentos do AsyncStorage
  const loadMedications = async () => {
    try {
      const savedMedications = await AsyncStorage.getItem('medications');
      if (savedMedications) {
        setMedications(JSON.parse(savedMedications));
      }
    } catch (error) {
      console.error('Erro ao carregar medicamentos:', error);
    }
  };

  // Função para lidar com a administração de medicamento (ainda não implementada)
  const handleAdministerMedication = (medicationId) => {
    console.log('Administração registrada para o medicamento com ID:', medicationId);
  };

  // Efeito colateral para carregar a lista de medicamentos ao focar na tela
  useEffect(() => {
    // Adiciona um ouvinte para o evento de foco na tela
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Lógica de atualização quando a tela é focada
      loadMedications();
    });

    // Remove o ouvinte ao desmontar o componente
    return unsubscribeFocus;
  }, [navigation]);

  // Renderiza o componente de tela
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhamento de Administração de Medicamentos</Text>
      
      {/* Lista de medicamentos usando FlatList e o componente MedicationItem */}
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicationItem
            medication={item}
            onAdminister={handleAdministerMedication}
          />
        )}
      />
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

// Exporta o componente para ser utilizado em outros lugares da aplicação
export default TrackingScreen;
