
import React from 'react';

// Import components used to design the screen
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

// Used to display icons
import { Ionicons } from '@expo/vector-icons';

// This screen displays the selected event information
export default function EventDetailsScreen({ route, navigation }) {

  // Get the selected event from the previous screen
  const { event } = route.params;

  // Display the event details screen
  return (
    <ScrollView style={styles.container}>

      {/* Display the event image */}
      <Image
        source={{ uri: event.image }}
        style={styles.heroImage}
      />

      {/* Main card containing the event information */}
      <View
        style={[
          styles.card,
          { borderTopColor: event.accentColor }
        ]}
      >

        {/* Display the name of the event */}
        <Text
          style={[
            styles.title,
            { color: event.accentColor }
          ]}
        >
          {event.name}
        </Text>

        {/* Display the event date */}
        <View style={styles.infoRow}>

          {/* Calendar icon */}
          <Ionicons
            name="calendar-outline"
            size={18}
            color="#94a3b8"
            style={styles.icon}
          />

          <Text style={styles.infoText}>
            {event.date}
          </Text>
        </View>

        {/* Display the event location */}
        <View style={styles.infoRow}>

          {/* Location icon */}
          <Ionicons
            name="location-outline"
            size={18}
            color="#94a3b8"
            style={styles.icon}
          />

          <Text style={styles.infoText}>
            {event.venue}
          </Text>
        </View>

        {/* Display the ticket price */}
        <View style={styles.infoRow}>

          {/* Price tag icon */}
          <Ionicons
            name="pricetag-outline"
            size={18}
            color="#94a3b8"
            style={styles.icon}
          />

          <Text style={styles.infoText}>
            {event.price} per ticket
          </Text>
        </View>

        {/* Title for the event description */}
        <Text style={styles.sectionHeader}>
          About Event
        </Text>

        {/* Display the sample event description */}
        <Text style={styles.description}>
          This is a sample event listing for the Calbayog
          Events Hub school project. Bookings are for
          demonstration only.
        </Text>

        {/* Button to proceed to ticket booking */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: event.accentColor }
          ]}

          // Go to BuyTicket and pass the selected event
          onPress={() =>
            navigation.navigate('BuyTicket', { event })
          }
          activeOpacity={0.8}
        >

          {/* Text displayed inside the button */}
          <Text style={styles.buttonText}>
            Proceed to Buy Ticket
          </Text>

          {/* Ticket icon displayed beside the text */}
          <Ionicons
            name="ticket-outline"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Styles used to design the event details screen
const styles = StyleSheet.create({

  // Main screen background
  container: {
    flex: 1,
    backgroundColor: '#0f172a'
  },

  // Size of the event image
  heroImage: {
    width: '100%',
    height: 200
  },

  // Design of the event information card
  card: {
    backgroundColor: '#1e293b',
    padding: 22,
    borderRadius: 14,
    borderTopWidth: 6,
    borderWidth: 1,
    borderColor: '#334155',
    margin: 20,
    marginTop: -20
  },

  // Style of the event name
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },

  // Arrange the icon and text in one row
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },

  // Add space between the icon and text
  icon: {
    marginRight: 10
  },

  // Style of the date, venue, and price text
  infoText: {
    fontSize: 16,
    color: '#e2e8f0'
  },

  // Style of the About Event title
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 8
  },

  // Style of the event description
  description: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 22,
    marginBottom: 25
  },

  // Design of the Buy Ticket button
  button: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4
  },

  // Style of the button text
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8
  },

  // Add spacing beside the ticket icon
  buttonIcon: {
    marginLeft: 4
  }
});
