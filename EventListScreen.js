// Import React library from react package
import React from 'react';
// Import core layout and UI components from react-native
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Array containing list objects for mock upcoming event data
const events = [
  // First event item object with id, date, name, venue, and price properties
  { id: '1', date: 'October 10, 2026', name: 'Calbayog Music Night',venue: 'City Events Hall', price: 'PHP 250' },
  // Second event item object with id, name, date, venue, and price properties
  { id: '2', name: 'Campus Indie Gig', date: 'October 17, 2026', venue: 'University Activity Center', price: 'PHP 200' },
  // Third event item object with id, name, date, venue, and price properties
  { id: '3', name: 'Weekend Acoustic Night', date: 'October 24, 2026', venue: 'Downtown Music Hall', price: 'PHP 150' },
];

// Export default functional component EventsScreen receiving navigation prop
export default function EventsScreen({ navigation }) {
  // Return JSX template structure
  return (
    /* Scrollable container view with styles applied */
    <ScrollView style={styles.container}>
      {/* Render heading text for the events list */}
      <Text style={styles.heading}>Upcoming Events</Text>
      
      {/* Iterate through events array using map function to render event cards dynamically */}
      {events.map((event) => (
        /* Touchable card component that triggers navigation on press */
        <TouchableOpacity 
          key={event.id} 
          style={styles.card}
          onPress={() => navigation.navigate('EventDetails', { event })}
        >
          {/* Display event title/name text */}
          <Text style={styles.eventName}>{event.name}</Text>
          {/* Display event date text */}
          <Text style={styles.eventDetails}>{event.date}</Text>
          {/* Display event venue location text */}
          <Text style={styles.eventDetails}>{event.venue}</Text>
          {/* Display event ticket price text */}
          <Text style={styles.eventPrice}>{event.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// Create stylesheet configuration object
const styles = StyleSheet.create({
  // Root container screen layout styling
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  // Screen title header text styling
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  // Event item card container box styling
  card: { borderWidth: 1, borderColor: '#333', padding: 16, borderRadius: 4, marginBottom: 15 },
  // Card event title name font styling
  eventName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  // Card detail labels font and color styling
  eventDetails: { fontSize: 14, color: '#444', marginBottom: 2 },
  // Card price tag bold text styling
  eventPrice: { fontSize: 16, fontWeight: 'bold', marginTop: 6 },
});