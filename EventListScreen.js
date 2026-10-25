
import React, { useState } from 'react'; // Import React core and useState hook
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'; // Import React Native components

// 👉 YOU CAN ADD NEW EVENTS HERE EASILY!
const eventsData = [ // Array holding static event records
  { 
    id: '1', // Unique identifier for the first event
    name: 'Calbayog Music Night', // Event title
    date: 'October 10, 2026', // Event date
    venue: 'City Events Hall', // Event location venue
    price: 'PHP 250', // Formatted display price string
    numericPrice: 250 // Raw numeric value for logic/calculations
  },
  { 
    id: '2', // Unique identifier for the second event
    name: 'Campus Indie Gig', // Event title
    date: 'October 17, 2026', // Event date
    venue: 'University Activity Center', // Event location venue
    price: 'PHP 200', // Formatted display price string
    numericPrice: 200 // Raw numeric value for calculations
  },
  { 
    id: '3', // Unique identifier for the third event
    name: 'Weekend Acoustic Night', // Event title
    date: 'October 24, 2026', // Event date
    venue: 'Downtown Music Hall', // Event location venue
    price: 'PHP 150', // Formatted display price string
    numericPrice: 150 // Raw numeric value for calculations
  },
  // Example of adding a new event:
  // { 
  //   id: '4', 
  //   name: 'Samar Arts Festival', 
  //   date: 'November 15, 2026', 
  //   venue: 'Calbayog Plaza', 
  //   price: 'PHP 100', 
  //   numericPrice: 100 
  // },
];

export default function EventListScreen({ navigation }) { // Define and export EventListScreen receiving navigation prop
  const [events] = useState(eventsData); // Initialize local state with event data array

  return (
    <ScrollView style={styles.container}> {/* Scrollable wrapper view */}
      <Text style={styles.heading}>Upcoming Events</Text> {/* Screen title heading */}
      
      {events.map((event) => ( // Iterate over each event in state
        <TouchableOpacity 
          key={event.id} // Unique react key attribute for list mapping
          style={styles.card} // Card styling container
          onPress={() => navigation.navigate('EventDetails', { event })} // Navigate to details view, passing event parameters
        >
          <Text style={styles.eventName}>{event.name}</Text> {/* Event title text */}
          <Text style={styles.eventDetails}>{event.date}</Text> {/* Event date text */}
          <Text style={styles.eventDetails}>{event.venue}</Text> {/* Event venue text */}
          <Text style={styles.eventPrice}>{event.price}</Text> {/* Event price text */}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' }, // Root container layout style
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }, // Main heading typography style
  card: { borderWidth: 1, borderColor: '#333', padding: 16, borderRadius: 6, marginBottom: 15, backgroundColor: '#f9f9f9' }, // Individual event card style
  eventName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4, color: '#0066FF' }, // Event title typography style
  eventDetails: { fontSize: 14, color: '#444', marginBottom: 2 }, // General info detail style
  eventPrice: { fontSize: 16, fontWeight: 'bold', marginTop: 6, color: '#222' }, // Event price style
});
