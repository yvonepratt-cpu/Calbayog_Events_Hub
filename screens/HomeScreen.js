
import React, { useContext } from 'react';

// Import components used to build the Home screen
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

// Used to display icons
import { Ionicons } from '@expo/vector-icons';

// Used to access saved booking information
import { BookingsContext } from './BookingsContext';

// This function displays the main Home screen
export default function HomeScreen({ navigation }) {

  // Get the list of bookings from BookingsContext
  const { bookings } = useContext(BookingsContext);

  // Function to navigate to the Upcoming Events screen
  const goToEvents = () => {

    // Open the Events tab and show UpcomingEvents
    navigation.navigate('Events', {
      screen: 'UpcomingEvents'
    });
  };

  // Display the Home screen
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >

      {/* Main welcome section */}
      <View style={styles.heroSection}>

        {/* Circle containing the calendar icon */}
        <View style={styles.iconCircle}>
          <Ionicons
            name="calendar"
            size={40}
            color="#0066FF"
          />
        </View>

        {/* Display the application name */}
        <Text style={styles.heading}>
          Calbayog Events Hub
        </Text>

        {/* Display the application description */}
        <Text style={styles.subheading}>
          Your ultimate guide to local gigs, cultural festivals,
          and community gatherings across Calbayog City.
        </Text>
      </View>

      {/* Container for the application features */}
      <View style={styles.featuresContainer}>

        {/* First feature: Browse and Search events */}
        <TouchableOpacity
          style={styles.featureCard}

          // Open the event list when clicked
          onPress={goToEvents}
          activeOpacity={0.7}
        >

          {/* Search icon */}
          <Ionicons
            name="search-outline"
            size={24}
            color="#0066FF"
          />

          {/* Text explaining the Browse and Search feature */}
          <View style={styles.featureTextWrapper}>
            <Text style={styles.featureTitle}>
              Browse & Search
            </Text>

            <Text style={styles.featureDesc}>
              Instantly find events by name or venue location.
            </Text>
          </View>

          {/* Arrow icon indicating navigation */}
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#64748b"
          />
        </TouchableOpacity>

        {/* Second feature: View saved bookings */}
        <TouchableOpacity
          style={styles.featureCard}

          // Open the My Bookings screen when clicked
          onPress={() => navigation.navigate('My Bookings')}
          activeOpacity={0.7}
        >

          {/* Ticket icon */}
          <Ionicons
            name="ticket-outline"
            size={24}
            color="#0066FF"
          />

          {/* Text explaining the booking feature */}
          <View style={styles.featureTextWrapper}>

            {/* Display the number of saved bookings */}
            <Text style={styles.featureTitle}>
              Secure Bookings ({bookings.length})
            </Text>

            <Text style={styles.featureDesc}>
              Save ticket orders securely to your device.
            </Text>
          </View>

          {/* Arrow icon indicating navigation */}
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#64748b"
          />
        </TouchableOpacity>
      </View>

      {/* Main button to explore available events */}
      <TouchableOpacity
        style={styles.button}

        // Navigate to Upcoming Events when clicked
        onPress={goToEvents}
        activeOpacity={0.8}
      >

        {/* Text displayed inside the button */}
        <Text style={styles.buttonText}>
          Explore Events
        </Text>

        {/* Arrow icon displayed beside the button text */}
        <Ionicons
          name="arrow-forward"
          size={20}
          color="#fff"
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styles used to design the Home screen
const styles = StyleSheet.create({

  // Main screen background
  container: {
    flex: 1,
    backgroundColor: '#0f172a'
  },

  // Center the content and add spacing
  contentContainer: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },

  // Style of the welcome section
  heroSection: {
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 20
  },

  // Design of the circle around the calendar icon
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#0066FF'
  },

  // Style of the application title
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 10
  },

  // Style of the application description
  subheading: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10
  },

  // Container for the feature cards
  featuresContainer: {
    width: '100%',
    marginBottom: 35
  },

  // Design of each feature card
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155'
  },

  // Arrange the text inside each feature card
  featureTextWrapper: {
    marginLeft: 16,
    flex: 1
  },

  // Style of the feature title
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  },

  // Style of the feature description
  featureDesc: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2
  },

  // Design of the Explore Events button
  button: {
    flexDirection: 'row',
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6
  },

  // Style of the Explore Events button text
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8
  },

  // Add space beside the arrow icon
  buttonIcon: {
    marginLeft: 4
  }
});
