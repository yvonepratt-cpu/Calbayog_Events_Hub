import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { BookingsProvider } from './BookingsContext';
import HomeScreen from './HomeScreen';
import EventListScreen from './EventListScreen';
import EventDetailsScreen from './EventDetailsScreen';
import BuyTicketScreen from './BuyTicketScreen';
import MyBookingsScreen from './MyBookingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function EventStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1e293b' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="UpcomingEvents" component={EventListScreen} options={{ title: 'Explore Events' }} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Event Details' }} />
      <Stack.Screen name="BuyTicket" component={BuyTicketScreen} options={{ title: 'Book Ticket' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <BookingsProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { backgroundColor: '#1e293b', borderTopColor: '#334155' },
            tabBarActiveTintColor: '#0066FF',
            tabBarInactiveTintColor: '#94a3b8',
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home-outline';
              else if (route.name === 'Events') iconName = 'calendar-outline';
              else if (route.name === 'My Bookings') iconName = 'ticket-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Events" component={EventStack} />
          <Tab.Screen name="My Bookings" component={MyBookingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </BookingsProvider>
  );
}
