// Import the core React library to enable JSX and React components
import React from 'react';

// Import the container that manages navigation state and tree
import {
  NavigationContainer
} from '@react-navigation/native';

// Import the function to create a native stack navigator
import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';

// Import the Home screen component from the local directory
import HomeScreen from './HomeScreen';
// Import the Event List screen component from the local directory
import EventListScreen from './EventListScreen';
// Import the Event Details screen component from the local directory
import EventDetailsScreen from './EventDetailsScreen';
// Import the Buy Ticket screen component from the local directory
import BuyTicketScreen from './BuyTicketScreen';

// Initialize the Stack navigator instance containing Navigator and Screen components
const Stack = createNativeStackNavigator();

// Define and export the root main App functional component
export default function App() {

  // Return the JSX elements that define the navigation architecture
  return (

    // Wrap the entire app in the navigation container to maintain state
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">

        {/* Define the screen route for "Home" using the HomeScreen component */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        {/* Define the screen route for "Events" using the EventListScreen component */}
        <Stack.Screen
          name="Events"
          component={EventListScreen}
        />

        {/* Define the screen route for "EventDetails" using the EventDetailsScreen component */}
        <Stack.Screen
          name="EventDetails"
          component={EventDetailsScreen}
        />

        {/* Define the screen route for "BuyTicket" with custom header options */}
        <Stack.Screen 
          name="BuyTicket" 
          component={BuyTicketScreen} 
          options={{ title: 'BuyTicket' }} 
        />

      </Stack.Navigator>

    </NavigationContainer>

  );

}