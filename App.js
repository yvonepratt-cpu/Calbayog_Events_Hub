// App.js
import React from 'react'; // Import React core library
import { NavigationContainer } from '@react-navigation/native'; // Import container managing navigation state
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import stack navigator builder
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import bottom tab navigator builder
import { Ionicons } from '@expo/vector-icons'; // Import icon set for tab bar elements

import HomeScreen from './HomeScreen'; // Import Home dashboard screen component
import EventListScreen from './EventListScreen'; // Import screen listing all events
import EventDetailsScreen from './EventDetailsScreen'; // Import screen showing event details
import BuyTicketScreen from './BuyTicketScreen'; // Import screen handling ticket purchase
import MyBookingsScreen from './MyBookingsScreen'; // Import screen displaying user bookings

const Stack = createNativeStackNavigator(); // Initialize stack navigator instance
const Tab = createBottomTabNavigator(); // Initialize tab navigator instance

// Stack navigator grouping the event browsing and booking screens
function EventStack() {
  return (
    <Stack.Navigator initialRouteName="Home"> {/* Set Home as the initial route */}
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> {/* Home screen with hidden header */}
      <Stack.Screen name="Events" component={EventListScreen} options={{ title: 'Explore Events' }} /> {/* Events list screen */}
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Event Details' }} /> {/* Event details screen */}
      <Stack.Screen name="BuyTicket" component={BuyTicketScreen} options={{ title: 'Book Ticket' }} /> {/* Ticket booking screen */}
    </Stack.Navigator>
  );
}

// Root application component rendering bottom tabs
export default function App() {
  return (
    <NavigationContainer> {/* Provide navigation tree context */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => { // Render dynamic icons based on focus
            let iconName;
            if (route.name === 'Explore') {
              iconName = focused ? 'calendar' : 'calendar-outline'; // Toggle calendar icon
            } else if (route.name === 'My Bookings') {
              iconName = focused ? 'ticket' : 'ticket-outline'; // Toggle ticket icon
            }
            return <Ionicons name={iconName} size={size} color={color} />; // Return configured icon
          },
          tabBarActiveTintColor: '#0066FF', // Active tab tint color
          tabBarInactiveTintColor: 'gray', // Inactive tab tint color
        })}
      >
        <Tab.Screen name="Explore" component={EventStack} options={{ headerShown: false }} /> {/* Explore tab wrapping event stack */}
        <Tab.Screen name="My Bookings" component={MyBookingsScreen} options={{ title: 'Saved Tickets' }} /> {/* Bookings tab */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}