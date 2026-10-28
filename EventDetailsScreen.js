
import React from 'react'; // Import React core library
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'; // Import core React Native UI components
import { Ionicons } from '@expo/vector-icons'; // Import vector icons library

export default function EventDetailsScreen({ route, navigation }) { // Define and export EventDetailsScreen component receiving route and navigation props
  const { event } = route.params; // Extract event object from navigation route parameters

  return (
    <ScrollView style={styles.container}> {/* Root scrollable container view */}
      <Image source={{ uri: event.image }} style={styles.heroImage} /> {/* Hero cover image loaded from URI */}

      <View style={[styles.card, { borderTopColor: event.accentColor }]}> {/* Main content card with dynamic top accent border */}
        <Text style={[styles.title, { color: event.accentColor }]}>{event.name}</Text> {/* Event title text with dynamic accent color */}
        
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={18} color="#94a3b8" style={styles.icon} /> {/* Calendar icon */}
          <Text style={styles.infoText}>{event.date}</Text> {/* Event date text */}
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color="#94a3b8" style={styles.icon} /> {/* Location icon */}
          <Text style={styles.infoText}>{event.venue}</Text> {/* Event venue text */}
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="pricetag-outline" size={18} color="#94a3b8" style={styles.icon} /> {/* Price tag icon */}
          <Text style={styles.infoText}>{event.price} per ticket</Text> {/* Event price text */}
        </View>

        <Text style={styles.sectionHeader}>About Event</Text> {/* Section heading text */}
        <Text style={styles.description}>
          Join us for an exciting experience in Calbayog City! Don't miss out on great live music, cultural performances, and vibrant community gatherings.
        </Text>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: event.accentColor }]} // Proceed button style with dynamic background color
          onPress={() => navigation.navigate('BuyTicket', { event })} // Navigate to BuyTicket screen passing event data on press
          activeOpacity={0.8} // Active touch opacity feedback
        >
          <Text style={styles.buttonText}>Proceed to Buy Ticket</Text> {/* Button label text */}
          <Ionicons name="ticket-outline" size={20} color="#fff" style={styles.buttonIcon} /> {/* Ticket icon */}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' }, // Root container style with dark background
  heroImage: { width: '100%', height: 200 }, // Hero image styling dimensions
  card: { 
    backgroundColor: '#1e293b', // Card background color
    padding: 22, // Card inner padding
    borderRadius: 14, // Rounded card corners
    borderTopWidth: 6, // Top accent border width
    borderWidth: 1, // Card border width
    borderColor: '#334155', // Card border color
    margin: 20, // Outer card margins
    marginTop: -20, // Overlaps image for a sleek modern feel
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 }, // Title typography style
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 }, // Info row layout style
  icon: { marginRight: 10 }, // Detail icon right margin
  infoText: { fontSize: 16, color: '#e2e8f0' }, // Info detail text style
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginTop: 20, marginBottom: 8 }, // Section header style
  description: { fontSize: 14, color: '#94a3b8', lineHeight: 22, marginBottom: 25 }, // Description text style
  button: { 
    flexDirection: 'row', // Horizontal layout for button text and icon
    paddingVertical: 14, // Vertical padding
    borderRadius: 10, // Rounded button corners
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset dimensions
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 4, // Android shadow elevation
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 8 }, // Button text style
  buttonIcon: { marginLeft: 4 }, // Button icon spacing style
});
