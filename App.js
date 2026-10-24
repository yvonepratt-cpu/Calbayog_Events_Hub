import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import EventListScreen from './EventListScreen';
import EventDetailsScreen from './EventDetailsScreen';
import BuyTicketScreen from './BuyTicketScreen';
import MyBookingsScreen from './MyBookingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for the Events exploration flow
function EventStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Events" component={EventListScreen} options={{ title: 'Explore Events' }} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Event Details' }} />
      <Stack.Screen name="BuyTicket" component={BuyTicketScreen} options={{ title: 'Book Ticket' }} />
    </Stack.Navigator>
  );
}

// Root App with Bottom Tab Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Explore') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'My Bookings') {
              iconName = focused ? 'ticket' : 'ticket-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0066FF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Explore" component={EventStack} options={{ headerShown: false }} />
        <Tab.Screen name="My Bookings" component={MyBookingsScreen} options={{ title: 'Saved Tickets' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
