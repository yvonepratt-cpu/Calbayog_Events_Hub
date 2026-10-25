
import React from 'react'; // Import core React library
import { NavigationContainer } from '@react-navigation/native'; // Import navigation state container
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import native stack navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import bottom tab navigator
import { Ionicons } from '@expo/vector-icons'; // Import vector icons for tabs

import HomeScreen from './HomeScreen'; // Import Home screen component
import EventListScreen from './EventListScreen'; // Import Event list screen component
import EventDetailsScreen from './EventDetailsScreen'; // Import Event details screen component
import BuyTicketScreen from './BuyTicketScreen'; // Import Ticket purchase screen component
import MyBookingsScreen from './MyBookingsScreen'; // Import Bookings screen component

const Stack = createNativeStackNavigator(); // Initialize stack navigator
const Tab = createBottomTabNavigator(); // Initialize bottom tab navigator

// Stack navigator for event exploration and booking flow
function EventStack() {
  return (
    <Stack.Navigator initialRouteName="Home"> {/* Set initial screen to Home */}
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> {/* Home screen */}
      <Stack.Screen name="Events" component={EventListScreen} options={{ title: 'Explore Events' }} /> {/* Events list screen */}
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Event Details' }} /> {/* Event details screen */}
      <Stack.Screen name="BuyTicket" component={BuyTicketScreen} options={{ title: 'Book Ticket' }} /> {/* Buy ticket screen */}
    </Stack.Navigator>
  );
}

// Root application component with bottom tab navigation
export default function App() {
  return (
    <NavigationContainer> {/* Wrap app in navigation container */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => { // Configure icons for each tab dynamically
            let iconName;
            if (route.name === 'Explore') {
              iconName = focused ? 'calendar' : 'calendar-outline'; // Set Explore tab icon
            } else if (route.name === 'My Bookings') {
              iconName = focused ? 'ticket' : 'ticket-outline'; // Set My Bookings tab icon
            }
            return <Ionicons name={iconName} size={size} color={color} />; // Return the icon component
          },
          tabBarActiveTintColor: '#0066FF', // Color for active tab
          tabBarInactiveTintColor: 'gray', // Color for inactive tab
        })}
      >
        <Tab.Screen name="Explore" component={EventStack} options={{ headerShown: false }} /> {/* Explore tab containing the stack */}
        <Tab.Screen name="My Bookings" component={MyBookingsScreen} options={{ title: 'Saved Tickets' }} /> {/* My Bookings tab */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
