// EventListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export default function EventListScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lifecycle hook: Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Simulated or real API fetch (Using JSONPlaceholder posts mapped as events for demonstration)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      if (!response.ok) throw new Error('Failed to fetch events from server.');
      
      const data = await response.json();
      
      // Map API response to match our Calbayog Event structure
      const formattedEvents = data.map((item, index) => ({
        id: String(item.id),
        name: item.title.slice(0, 25) + '...',
        date: `November ${10 + index}, 2026`,
        venue: index % 2 === 0 ? 'City Events Hall, Calbayog' : 'University Activity Center',
        price: `PHP ${150 + (index * 50)}`,
        numericPrice: 150 + (index * 50),
      }));

      setEvents(formattedEvents);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066FF" />
        <Text style={styles.loadingText}>Loading Calbayog Events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchEvents}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Upcoming Events (API)</Text>
      
      {events.map((event) => (
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
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { borderWidth: 1, borderColor: '#333', padding: 16, borderRadius: 6, marginBottom: 15, backgroundColor: '#f9f9f9' },
  eventName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4, color: '#0066FF' },
  eventDetails: { fontSize: 14, color: '#444', marginBottom: 2 },
  eventPrice: { fontSize: 16, fontWeight: 'bold', marginTop: 6, color: '#222' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginBottom: 15 },
  retryButton: { backgroundColor: '#0066FF', padding: 12, borderRadius: 4 },
  retryText: { color: '#fff', fontWeight: 'bold' },
});