
import React from 'react'; // Import React core library
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Import React Native components

export default function EventDetailsScreen({ navigation, route }) { // Define and export EventDetailsScreen component receiving navigation and route props
  const event = route?.params?.event || { // Extract passed event or use fallback default event object
    name: 'Calbayog Music Night', // Fallback event name
    date: 'October 10, 2026', // Fallback event date
    venue: 'City Events Hall', // Fallback event venue
    price: 'PHP 250', // Fallback event price string
    numericPrice: 250, // Fallback numeric price value
  };

  const getPriceNumber = () => { // Helper function to parse or return numeric price
    if (event.numericPrice) return event.numericPrice; // Return existing numeric price if available
    const match = String(event.price).match(/\d+/); // Extract digits from price string using regex
    return match ? parseInt(match[0], 10) : 250; // Parse number or fallback to default value
  };

  return (
    <View style={styles.container}> {/* Root container view */}
      <Text style={styles.heading}>Event Details</Text> {/* Main heading text */}

      <Text style={styles.label}>Event:</Text> {/* Label for event name */}
      <Text style={styles.value}>{event.name}</Text> {/* Event name value */}

      <Text style={styles.label}>Date:</Text> {/* Label for event date */}
      <Text style={styles.value}>{event.date}</Text> {/* Event date value */}

      <Text style={styles.label}>Venue:</Text> {/* Label for event venue */}
      <Text style={styles.value}>{event.venue}</Text> {/* Event venue value */}

      <Text style={styles.label}>Ticket:</Text> {/* Label for ticket price */}
      <Text style={styles.value}>{event.price}</Text> {/* Ticket price value */}

      <TouchableOpacity 
        style={styles.buyButton} // Buy ticket button style
        onPress={() => navigation.navigate('BuyTicket', { // Navigate to BuyTicket screen with parsed price data
          event: {
            ...event, // Spread existing event properties
            numericPrice: getPriceNumber() // Ensure numeric price is passed
          } 
        })}
      >
        <Text style={styles.buttonText}>Buy Ticket</Text> {/* Buy button text */}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton} // Back button style
        onPress={() => navigation.goBack()} // Go back to the previous screen on press
      >
        <Text style={styles.buttonText}>Go Back</Text> {/* Back button text */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' }, // Root container style
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }, // Main heading style
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 }, // Field label text style
  value: { fontSize: 18, marginBottom: 10 }, // Field value text style
  buyButton: { backgroundColor: '#0000FF', padding: 15, borderRadius: 4, alignItems: 'center', marginBottom: 10, marginTop: 15 }, // Buy button style
  backButton: { backgroundColor: '#7F7F7F', padding: 15, borderRadius: 4, alignItems: 'center' }, // Back button style
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' }, // Shared button text style
});
