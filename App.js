import React from 'react';

// Used to manage navigation between screens
import { NavigationContainer } from '@react-navigation/native';

// Creates the bottom navigation tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Creates navigation between event screens
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Used to display icons
import { Ionicons } from '@expo/vector-icons';

// Used to create a clickable back button
import { TouchableOpacity } from 'react-native';

// Stores and shares booking information
import { BookingsProvider } from './screens/context/BookingsContext';

// Import all application screens
import HomeScreen from './screens/HomeScreen';
import EventListScreen from './screens/EventListScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import BuyTicketScreen from './screens/BuyTicketScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';

// Create bottom tabs and stack navigation
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// This function creates a reusable back button
function BackButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        // Go back to the previous screen if possible
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          // Otherwise, go to the Home tab
          navigation.navigate('Home');
        }
      }}
      style={{ paddingHorizontal: 15 }}
    >
      {/* Display the back arrow icon */}
      <Ionicons
        name="arrow-back"
        size={26}
        color="#ffffff"
      />
    </TouchableOpacity>
  );
}

// This function handles navigation for event pages
function EventStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        // Remove the header title
        headerTitle: '',

        // Set the header background color
        headerStyle: {
          backgroundColor: '#0f172a',
        },

        // Set the header text color
        headerTintColor: '#ffffff',

        // Display the custom back button
        headerLeft: () => (
          <BackButton navigation={navigation} />
        ),
      })}
    >
      {/* Screen that displays upcoming events */}
      <Stack.Screen
        name="UpcomingEvents"
        component={EventListScreen}
      />

      {/* Screen that displays event information */}
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
      />

      {/* Screen where users can buy tickets */}
      <Stack.Screen
        name="BuyTicket"
        component={BuyTicketScreen}
      />
    </Stack.Navigator>
  );
}

// Main function of the application
export default function App() {
  return (
    // Makes booking data available to all screens
    <BookingsProvider>

      {/* Manages navigation in the application */}
      <NavigationContainer>

        {/* Creates the bottom navigation bar */}
        <Tab.Navigator
          screenOptions={({ route, navigation }) => ({
            // Remove the header title
            headerTitle: '',

            // Set the header background color
            headerStyle: {
              backgroundColor: '#0f172a',
            },

            // Display the back button
            headerLeft: () => (
              <BackButton navigation={navigation} />
            ),

            // Color of the selected tab
            tabBarActiveTintColor: '#3b82f6',

            // Color of unselected tabs
            tabBarInactiveTintColor: '#94a3b8',

            // Background color of the bottom tabs
            tabBarStyle: {
              backgroundColor: '#0f172a',
            },

            // Choose an icon based on the tab name
            tabBarIcon: ({ color, size }) => {

              // Default icon for Home
              let iconName = 'home-outline';

              // Calendar icon for Events
              if (route.name === 'Events') {
                iconName = 'calendar-outline';

              // Ticket icon for My Bookings
              } else if (route.name === 'My Bookings') {
                iconName = 'ticket-outline';
              }

              // Display the selected icon
              return (
                <Ionicons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            },
          })}
        >
          {/* Home tab displays the main screen */}
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              // Hide the header on Home
              headerShown: false,
            }}
          />

          {/* Events tab displays event-related screens */}
          <Tab.Screen
            name="Events"
            component={EventStack}
            options={{
              // Hide the tab header because
              // EventStack has its own header
              headerShown: false,
            }}
          />

          {/* My Bookings tab displays booked tickets */}
          <Tab.Screen
            name="My Bookings"
            component={MyBookingsScreen}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </BookingsProvider>
  );
}
