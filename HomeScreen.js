
import React from 'react'; // Import React core library
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'; // Import core React Native UI components
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons vector icons library

export default function HomeScreen({ navigation }) { // Define and export HomeScreen component receiving navigation prop
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}> {/* Root scrollable container view */}
      <View style={styles.heroSection}> {/* Hero section wrapper */}
        <View style={styles.iconCircle}> {/* Decorative icon background circle */}
          <Ionicons name="calendar" size={40} color="#0066FF" /> {/* Calendar icon */}
        </View>
        <Text style={styles.heading}>Calbayog Events Hub</Text> {/* App heading title text */}
        <Text style={styles.subheading}> {/* Subtitle description text */}
          Your ultimate guide to local gigs, cultural festivals, and community gatherings across Calbayog City.
        </Text>
      </View>

      <View style={styles.featuresContainer}> {/* Container holding feature cards */}
        <TouchableOpacity 
          style={styles.featureCard} // Feature card style container
          onPress={() => navigation.navigate('Events')} // Navigate to Events screen on press
          activeOpacity={0.7} // Active touch opacity feedback
        >
          <Ionicons name="search-outline" size={24} color="#0066FF" /> {/* Search icon */}
          <View style={styles.featureTextWrapper}> {/* Text wrapper view */}
            <Text style={styles.featureTitle}>Browse & Search</Text> {/* Feature title text */}
            <Text style={styles.featureDesc}>Instantly find events by name or venue location.</Text> {/* Feature description text */}
          </View>
          <Ionicons name="chevron-forward" size={20} color="#64748b" /> {/* Right arrow icon */}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.featureCard} // Feature card style container
          onPress={() => navigation.navigate('My Bookings')} // Navigate to My Bookings screen on press
          activeOpacity={0.7} // Active touch opacity feedback
        >
          <Ionicons name="ticket-outline" size={24} color="#0066FF" /> {/* Ticket icon */}
          <View style={styles.featureTextWrapper}> {/* Text wrapper view */}
            <Text style={styles.featureTitle}>Secure Bookings</Text> {/* Feature title text */}
            <Text style={styles.featureDesc}>Save ticket orders securely to your device storage.</Text> {/* Feature description text */}
          </View>
          <Ionicons name="chevron-forward" size={20} color="#64748b" /> {/* Right arrow icon */}
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.button} // Main call-to-action button style
        onPress={() => navigation.navigate('Events')} // Navigate to Events screen on press
        activeOpacity={0.8} // Active touch opacity feedback
      >
        <Text style={styles.buttonText}>Explore Upcoming Events</Text> {/* Button label text */}
        <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} /> {/* Arrow icon */}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' }, // Root container style with dark background
  contentContainer: { padding: 24, justifyContent: 'center', alignItems: 'center', flexGrow: 1 }, // Scroll content layout container style
  heroSection: { alignItems: 'center', marginBottom: 35, marginTop: 20 }, // Hero section spacing and alignment
  iconCircle: {
    width: 80, // Circle width dimension
    height: 80, // Circle height dimension
    borderRadius: 40, // Circular border radius
    backgroundColor: '#1e293b', // Circle background color
    justifyContent: 'center', // Center icon vertically
    alignItems: 'center', // Center icon horizontally
    marginBottom: 16, // Bottom margin
    borderWidth: 2, // Border width
    borderColor: '#0066FF', // Border color
  },
  heading: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#ffffff', marginBottom: 10 }, // Heading style
  subheading: { fontSize: 15, color: '#94a3b8', textAlign: 'center', lineHeight: 22, paddingHorizontal: 10 }, // Subheading style
  featuresContainer: { width: '100%', marginBottom: 35 }, // Features container style
  featureCard: { 
    flexDirection: 'row', // Horizontal layout for card elements
    backgroundColor: '#1e293b', // Card background color
    padding: 16, // Card inner padding
    borderRadius: 12, // Rounded card corners
    alignItems: 'center', // Center items vertically
    marginBottom: 14, // Bottom margin spacing
    borderWidth: 1, // Card border width
    borderColor: '#334155', // Card border color
  },
  featureTextWrapper: { marginLeft: 16, flex: 1 }, // Feature text wrapper style
  featureTitle: { fontSize: 16, fontWeight: 'bold', color: '#ffffff' }, // Feature title text style
  featureDesc: { fontSize: 13, color: '#94a3b8', marginTop: 2 }, // Feature description text style
  button: { 
    flexDirection: 'row', // Horizontal layout for text and icon
    backgroundColor: '#0066FF', // Button background color
    paddingVertical: 16, // Vertical padding
    paddingHorizontal: 25, // Horizontal padding
    borderRadius: 10, // Rounded button corners
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
    width: '100%', // Full-width button style
    shadowColor: '#0066FF', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset dimensions
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 8, // Shadow blur radius
    elevation: 6, // Android shadow elevation
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 8 }, // Button text style
  buttonIcon: { marginLeft: 4 }, // Button icon spacing style
});
