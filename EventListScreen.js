
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const eventsData = [
  { 
    id: '1', 
    name: 'Calbayog Music Night', 
    date: 'October 10, 2026', 
    venue: 'City Events Hall', 
    price: 'PHP 250', 
    numericPrice: 250 
  },
  { 
    id: '2', 
    name: 'Campus Indie Gig', 
    date: 'October 17, 2026', 
    venue: 'University Activity Center', 
    price: 'PHP 200', 
    numericPrice: 200 
  },
  { 
    id: '3', 
    name: 'Weekend Acoustic Night', 
    date: 'October 24, 2026', 
    venue: 'Downtown Music Hall', 
    price: 'PHP 150', 
    numericPrice: 150 
  },
];

export default function EventListScreen({ navigation }) {
  const [events] = useState(eventsData);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter events dynamically based on user input (Name or Venue)
  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Upcoming Events</Text>
      
      {/* Search Bar Input */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by event name or venue..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Conditional rendering for empty search results */}
      {filteredEvents.length === 0 ? (
        <View style={styles.emptySearchContainer}>
          <Text style={styles.noResultsText}>No events found matching "{searchQuery}"</Text>
        </View>
      ) : (
        filteredEvents.map((event) => (
          <TouchableOpacity 
            key={event.id} 
            style={styles.card}
            onPress={() => navigation.navigate('EventDetails', { event })}
          >
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDetails}>{event.date}</Text>
            <Text style={styles.eventDetails}>{event.venue}</Text>
            <Text style={styles.eventPrice}>{event.price}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  searchBar: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 6, 
    padding: 12, 
    fontSize: 16, 
    marginBottom: 20, 
    backgroundColor: '#f9f9f9' 
  },
  emptySearchContainer: { marginTop: 40, alignItems: 'center' },
  noResultsText: { fontSize: 16, color: '#666', textAlign: 'center' },
  card: { borderWidth: 1, borderColor: '#333', padding: 16, borderRadius:N = 6, marginBottom: 15, backgroundColor: '#f9f9f9', borderRadius: 6 },
  eventName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4, color: '#0066FF' },
  eventDetails: { fontSize: 14, color: '#444', marginBottom: 2 },
  eventPrice: { fontSize: 16, fontWeight: 'bold', marginTop: 6, color: '#222' },
});
