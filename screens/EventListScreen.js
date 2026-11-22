import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

// Demo API endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

export default function EventListScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to load events.');
      }

      const data = await response.json();

      // Convert API posts into event objects
      const formattedEvents = data.map((item, index) => ({
        id: String(item.id),
        name: item.title,
        date: `December ${index + 1}, 2026`,
        venue: 'Calbayog City Events Center',
        price: 'PHP 250',
        numericPrice: 250,
        category: 'Community',
        image:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
        accentColor: '#3b82f6',
      }));

      setEvents(formattedEvents);
    } catch (err) {
      setError('Unable to load events. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  // Run when the screen first appears
  useEffect(() => {
    fetchEvents();
  }, []);

  // Search events by name or venue
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchText.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchText.toLowerCase())
  );

  // Display each event
  const renderEvent = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() =>
        navigation.navigate('EventDetails', { event: item })
      }
    >
      <Image source={{ uri: item.image }} style={styles.eventImage} />

      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.name}</Text>

        <Text style={styles.eventText}>
          <Ionicons name="calendar-outline" /> {item.date}
        </Text>

        <Text style={styles.eventText}>
          <Ionicons name="location-outline" /> {item.venue}
        </Text>

        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming Events</Text>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#94a3b8" />

        <TextInput
          style={styles.searchInput}
          placeholder="Search event name or venue..."
          placeholderTextColor="#94a3b8"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" />
      ) : error ? (
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>{error}</Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchEvents}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No events found.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },

  searchInput: {
    flex: 1,
    color: '#ffffff',
    padding: 12,
    fontSize: 15,
  },

  eventCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },

  eventImage: {
    width: '100%',
    height: 150,
  },

  eventInfo: {
    padding: 15,
  },

  eventTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  eventText: {
    color: '#cbd5e1',
    marginBottom: 7,
    fontSize: 14,
  },

  price: {
    color: '#60a5fa',
    fontWeight: 'bold',
    marginTop: 5,
  },

  messageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

  errorText: {
    color: '#f87171',
    textAlign: 'center',
    marginBottom: 15,
  },

  retryButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  emptyText: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 30,
  },
});
