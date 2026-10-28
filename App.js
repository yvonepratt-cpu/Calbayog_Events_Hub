
import React from 'react'; // Import React core library
import { NavigationContainer } from '@react-navigation/native'; // Import navigation state container
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import bottom tab navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import native stack navigator
import { Ionicons } from '@expo/vector-icons'; // Import vector icons library

import HomeScreen from './HomeScreen'; // Import Home screen component
import EventListScreen from './EventListScreen'; // Import Event list screen component
import EventDetailsScreen from './EventDetailsScreen'; // Import Event details screen component
import BuyTicketScreen from './BuyTicketScreen'; // Import Ticket purchase screen component
import MyBookingsScreen from './MyBookingsScreen'; // Import Bookings screen component

const Stack = createNativeStackNavigator(); // Initialize stack navigator instance
const Tab = createBottomTabNavigator(); // Initialize bottom tab navigator instance

function EventStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1e293b' }, // Custom header background color
        headerTintColor: '#ffffff', // Header text and icon tint color
        headerTitleStyle: { fontWeight: 'bold' }, // Header title bold font weight style
      }}
    >
      <Stack.Screen name="UpcomingEvents" component={EventListScreen} options={{ title: 'Explore Events' }} /> {/* Upcoming events screen */}
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Event Details' }} /> {/* Event details screen */}
      <Stack.Screen name="BuyTicket" component={BuyTicketScreen} options={{ title: 'Book Ticket' }} /> {/* Buy ticket screen */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer> {/* Wrap app within navigation container context */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Hide default headers for bottom tab screens
          tabBarStyle: { backgroundColor: '#1e293b', borderTopColor: '#334155' }, // Custom tab bar background and top border styling
          tabBarActiveTintColor: '#0066FF', // Color tint for active tabs
          tabBarInactiveTintColor: '#94a3b8', // Color tint for inactive tabs
          tabBarIcon: ({ color, size }) => { // Configure dynamic tab bar icons based on route name
            let iconName;
            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Events') iconName = 'calendar-outline';
            else if (route.name === 'My Bookings') iconName = 'ticket-outline';
            return <Ionicons name={iconName} size={size} color={color} />; // Return configured icon element
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} /> {/* Home tab screen */}
        <Tab.Screen name="Events" component={EventStack} /> {/* Events tab wrapping the event stack */}
        <Tab.Screen name="My Bookings" component={MyBookingsScreen} /> {/* Saved bookings tab screen */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
