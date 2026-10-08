// Import React library from react package
import React from 'react';
// Import core components from react-native for UI layout and styling
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Export default functional component EventDetailsScreen receiving navigation and route props
export default function EventDetailsScreen({ navigation, route }) {
  // Extract event object from navigation route parameters or fallback to default event object
  const event = route?.params?.event || {
    name: 'Calbayog Music Night',
    date: 'October 10, 2026',
    venue: 'City Events Hall',
    price: 'PHP 250',
    numericPrice: 250,
  };

  // Extracts numeric price even if price is passed as string like "PHP 200"
  // Helper function to calculate numeric price value
  const getPriceNumber = () => {
    // Return existing numericPrice if it exists
    if (event.numericPrice) return event.numericPrice;
    // Extract numbers from price string using regular expression
    const match = String(event.price).match(/\d+/);
    // Parse matched digits as integer or default to 250
    return match ? parseInt(match[0], 10) : 250;
  };

  // Return JSX layout structure
  return (
    /* Outer container view with padding and white background */
    <View style={styles.container}>
      {/* Render main heading text for event details */}
      <Text style={styles.heading}>Event Details</Text>

      {/* Render label text for event name field */}
      <Text style={styles.label}>Event:</Text>
      {/* Display dynamic event name text */}
      <Text style={styles.value}>{event.name}</Text>

      {/* Render label text for event date field */}
      <Text style={styles.label}>Date:</Text>
      {/* Display dynamic event date text */}
      <Text style={styles.value}>{event.date}</Text>

      {/* Render label text for venue field */}
      <Text style={styles.label}>Venue:</Text>
      {/* Display dynamic event venue text */}
      <Text style={styles.value}>{event.venue}</Text>

      {/* Render label text for ticket price field */}
      <Text style={styles.label}>Ticket:</Text>
      {/* Display dynamic event price text */}
      <Text style={styles.value}>{event.price}</Text>

      {/* Pass exact price to BuyTicket Screen */}
      {/* Touchable button to navigate to BuyTicket screen with event parameters */}
      <TouchableOpacity 
        style={styles.buyButton} 
        onPress={() => navigation.navigate('BuyTicket', { 
          event: {
            ...event,
            numericPrice: getPriceNumber()
          } 
        })}
      >
        {/* Label text inside buy button */}
        <Text style={styles.buttonText}>Buy Ticket</Text>
      </TouchableOpacity>

      {/* Touchable button to go back to previous screen */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        {/* Label text inside back button */}
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

// Create stylesheet object for styling components
const styles = StyleSheet.create({
  // Flex layout container styling
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  // Heading text styling
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  // Label text styling
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  // Value text styling
  value: { fontSize: 18, marginBottom: 10 },
  // Buy button container styling
  buyButton: { backgroundColor: '#0000FF', padding: 15, borderRadius: 4, alignItems: 'center', marginBottom: 10, marginTop: 15 },
  // Back button container styling
  backButton: { backgroundColor: '#7F7F7F', padding: 15, borderRadius: 4, alignItems: 'center' },
  // Button text font styling
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});