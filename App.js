// Importa as bibliotecas necessárias do React Navigation e as telas correspondentes
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PatientRegistrationScreen from './screens/PatientRegistrationScreen';
import MedicationRegistrationScreen from './screens/MedicationRegistrationScreen';
import TrackingScreen from './screens/TrackingScreen';

// Cria instâncias dos navegadores de guias e pilha
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Componente para a navegação da pilha relacionada aos pacientes
const PatientStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Cadastro de Pacientes" component={PatientRegistrationScreen} />
  </Stack.Navigator>
);

// Componente para a navegação da pilha relacionada aos medicamentos
const MedicationStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Cadastro de Medicamento" component={MedicationRegistrationScreen} />
  </Stack.Navigator>
);

// Componente principal que contém a navegação em guias
const App = () => {
  return (
    <NavigationContainer>
      {/* Guia de navegação inferior (bottom tabs) */}
      <Tab.Navigator>
        {/* Cada guia possui um nome e é associada a um componente de navegação específico */}
        <Tab.Screen name="Pacientes" component={PatientStack} />
        <Tab.Screen name="Medicamentos" component={MedicationStack} />
        <Tab.Screen name="Acompanhamento" component={TrackingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
