
import React, { useState } from 'react'; // Import React core and useState hook
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'; // Import React Native components
import { Ionicons } from '@expo/vector-icons'; // Import vector icons library

const eventsData = [ // Array holding event records with styling properties
  { 
    id: '1', // Unique event ID
    name: 'Calbayog Music Night', // Event title
    date: 'October 10, 2026', // Event date
    venue: 'City Events Hall', // Event venue
    price: 'PHP 70', // Formatted price string
    numericPrice: 70, // Numeric price value
    accentColor: '#3b82f6', // Vibrant Blue accent color
    bgColor: '#eff6ff' // Background card color
  },
  { 
    id: '2', // Unique event ID
    name: 'Campus Indie Gig', // Event title
    date: 'November 17, 2026', // Event date
    venue: 'Northwest Samar State University (Oval)', // Event venue
    price: 'PHP 250', // Formatted price string
    numericPrice: 250, // Numeric price value
    accentColor: '#8b5cf6', // Vibrant Purple accent color
    bgColor: '#f5f3ff' // Background card color
  },
  { 
    id: '3', // Unique event ID
    name: 'Weekend Acoustic Night', // Event title
    date: 'October 24, 2026', // Event date
    venue: 'Sports Center', // Event venue
    price: 'PHP 150', // Formatted price string
    numericPrice: 150, // Numeric price value
    accentColor: '#10b981', // Vibrant Green accent color
    bgColor: '#ecfdf5' // Background card color
  },
  { 
    id: '4', // Unique event ID
    name: 'Sarakiki Cultural Fest', // Event title
    date: 'November 05, 2026', // Event date
    venue: 'Calbayog City Plaza', // Event venue
    price: 'PHP 100', // Formatted price string
    numericPrice: 100, // Numeric price value
    accentColor: '#f59e0b', // Amber / Gold accent color
    bgColor: '#fffbeb' // Background card color
  },
  { 
    id: '5', // Unique event ID
    name: 'Samar Youth Tech Summit', // Event title
    date: 'November 12, 2026', // Event date
    venue: 'San Policarpo National High School', // Event venue
    price: 'PHP 180', // Formatted price string
    numericPrice: 180, // Numeric price value
    accentColor: '#ec4899', // Hot Pink / Rose accent color
    bgColor: '#fdf2f8' // Background card color
  },
];

export default function EventListScreen({ navigation }) { // Define and export EventListScreen receiving navigation prop
  const [events] = useState(eventsData); // Initialize events state with dataset
  const [searchQuery, setSearchQuery] = useState(''); // Initialize search query state for input filtering

  // Filter events dynamically based on user input (Name or Venue)
  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}> {/* Root scrollable container view */}
      <Text style={styles.heading}>Upcoming Events</Text> {/* Main heading text */}
      
      {/* Search Bar Input */}
      <View style={styles.searchContainer}> {/* Search input wrapper container */}
        <Ionicons name="search" size={20} color="#94a3b8" style={styles.searchIcon} /> {/* Search icon */}
        <TextInput
          style={styles.searchBar} // Search text input style
          placeholder="Search by event name or venue..." // Placeholder text
          placeholderTextColor="#94a3b8" // Placeholder text color
          value={searchQuery} // Current search query value
          onChangeText={setSearchQuery} // Update search query state on text change
        />
      </View>

      {/* Conditional rendering for empty search results */}
      {filteredEvents.length === 0 ? (
        <View style={styles.emptySearchContainer}> {/* Empty results wrapper view */}
          <Ionicons name="search-outline" size={48} color="#94a3b8" /> {/* Empty search icon */}
          <Text style={styles.noResultsText}>No events found matching "{searchQuery}"</Text> {/* Empty message text */}
        </View>
      ) : (
        filteredEvents.map((event) => ( // Map over filtered events list
          <TouchableOpacity 
            key={event.id} // Unique react key attribute
            style={[styles.card, { backgroundColor: event.bgColor, borderLeftColor: event.accentColor }]} // Dynamic card background and border colors
            onPress={() => navigation.navigate('EventDetails', { event })} // Navigate to EventDetails screen passing event data
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.eventName, { color: event.accentColor }]}>{event.name}</Text> {/* Event name with accent color */}
              <View style={[styles.priceBadge, { backgroundColor: event.accentColor }]}>
                <Text style={styles.eventPrice}>{event.price}</Text> {/* Event price badge text */}
              </View>
            </View>
            
            <View style={styles.detailsRow}>
              <Ionicons name="calendar-outline" size={14} color="#475569" style={styles.detailIcon} /> {/* Calendar icon */}
              <Text style={styles.eventDetails}>{event.date}</Text> {/* Event date text */}
            </View>
            
            <View style={styles.detailsRow}>
              <Ionicons name="location-outline" size={14} color="#475569" style={styles.detailIcon} /> {/* Location icon */}
              <Text style={styles.eventDetails}>{event.venue}</Text> {/* Event venue text */}
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a' }, // Root container style
  heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 16, color: '#ffffff' }, // Heading style
  searchContainer: {
    flexDirection: 'row', // Horizontal alignment for search items
    alignItems: 'center', // Center vertically
    backgroundColor: '#1e293b', // Search container background color
    borderRadius: 10, // Rounded container corners
    borderWidth: 1, // Container border width
    borderColor: '#334155', // Container border color
    paddingHorizontal: 12, // Horizontal inner padding
    marginBottom: 20, // Bottom margin
  },
  searchIcon: { marginRight: 8 }, // Search icon right margin
  searchBar: { 
    flex: 1, // Take remaining available width
    paddingVertical: 12, // Vertical padding
    fontSize: 15, // Text font size
    color: '#ffffff', // Text input color
  },
  emptySearchContainer: { marginTop: 40, alignItems: 'center' }, // Empty search wrapper style
  noResultsText: { fontSize: 16, color: '#94a3b8', textAlign: 'center', marginTop: 10 }, // No results text style
  card: { 
    padding: 18, // Card inner padding
    borderRadius: 12, // Rounded card corners
    marginBottom: 16, // Bottom margin spacing
    borderLeftWidth: 6, // Left border width for accent strip
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset dimensions
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 3, // Android shadow elevation
  },
  cardHeader: {
    flexDirection: 'row', // Horizontal layout for header elements
    justifyContent: 'space-between', // Space out title and badge
    alignItems: 'center', // Center items vertically
    marginBottom: 10, // Bottom margin
  },
  eventName: { fontSize: 18, fontWeight: 'bold', flex: 1, marginRight: 8 }, // Event name typography style
  priceBadge: {
    paddingHorizontal: 10, // Badge horizontal padding
    paddingVertical: 5, // Badge vertical padding
    borderRadius: 6, // Rounded badge corners
  },
  eventPrice: { fontSize: 13, fontWeight: 'bold', color: '#ffffff' }, // Event price text style
  detailsRow: {
    flexDirection: 'row', // Horizontal layout for details row
    alignItems: 'center', // Center items vertically
    marginBottom: 4, // Bottom margin spacing
  },
  detailIcon: { marginRight: 6 }, // Detail icon right margin
  eventDetails: { fontSize: 14, color: '#334155' }, // Detail text style
});
