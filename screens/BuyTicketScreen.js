
import React, { useState, useContext } from 'react';

// Import components used to build the screen
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

// Used to display icons
import { Ionicons } from '@expo/vector-icons';

// Used to access booking functions
import { BookingsContext } from './BookingsContext';

// This screen allows users to book event tickets
export default function BuyTicketScreen({ route, navigation }) {

  // Get the selected event from the previous screen
  const { event } = route.params;

  // Get the function for saving a booking
  const { addBooking } = useContext(BookingsContext);

  // Store the number of tickets (starts at 1)
  const [quantity, setQuantity] = useState(1);

  // Use the event color or blue as the default
  const activeColor = event.accentColor || '#0066FF';

  // Increase the number of tickets by 1
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrease tickets but do not go below 1
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Calculate total price based on ticket quantity
  const totalPrice = event.numericPrice * quantity;

  // This function confirms and saves the booking
  const handleConfirmPurchase = async () => {

    // Get the current date and time
    const now = new Date();

    // Format the booking date and time
    const formattedDateTime =
      now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) +
      ' at ' +
      now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

    // Create an object containing booking details
    const booking = {

      // Generate an ID using the current timestamp
      id: Date.now().toString(),

      // Save the selected event name
      eventName: event.name,

      // Save the event date and location
      date: event.date,
      venue: event.venue,

      // Save the number of tickets
      quantity: quantity,

      // Save the price of one ticket
      unitPrice: event.numericPrice,

      // Save the total ticket price
      totalPrice: `PHP ${totalPrice}`,

      // Save the date and time of booking
      bookingDate: formattedDateTime,

      // Set the initial booking status
      status: 'Confirmed',

      // Save the event's theme color
      accentColor: activeColor
    };

    // Save booking using BookingsContext
    const success = await addBooking(booking);

    // Check if the booking was saved successfully
    if (success) {

      // Show a success message
      Alert.alert(
        'Booking Saved!',
        `You have successfully booked ${quantity} ticket(s) for ${event.name}.`,
        [
          {
            text: 'View My Bookings',

            // Go to My Bookings when clicked
            onPress: () => navigation.navigate('My Bookings')
          }
        ]
      );

    } else {

      // Show an error if saving fails
      Alert.alert(
        'Error',
        'Failed to save booking. Please try again.'
      );
    }
  };

  // Display the ticket booking screen
  return (
    <ScrollView style={styles.container}>

      {/* Main card containing booking information */}
      <View
        style={[
          styles.card,
          { borderTopColor: activeColor }
        ]}
      >

        {/* Screen title */}
        <Text style={styles.headerTitle}>
          Complete Your Booking
        </Text>

        {/* Display the selected event name */}
        <Text
          style={[
            styles.eventName,
            { color: activeColor }
          ]}
        >
          {event.name}
        </Text>

        {/* Display the price of one ticket */}
        <Text style={styles.eventPrice}>
          {event.price} per ticket
        </Text>

        {/* Line separating sections */}
        <View style={styles.divider} />

        {/* Ticket quantity label */}
        <Text style={styles.sectionLabel}>
          Select Quantity
        </Text>

        {/* Container for quantity buttons */}
        <View style={styles.counterContainer}>

          {/* Button to decrease ticket quantity */}
          <TouchableOpacity
            style={[
              styles.counterBtn,
              { backgroundColor: activeColor }
            ]}
            onPress={decreaseQuantity}
            activeOpacity={0.7}
          >
            <Ionicons
              name="remove"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>

          {/* Display the selected ticket quantity */}
          <Text style={styles.quantityText}>
            {quantity}
          </Text>

          {/* Button to increase ticket quantity */}
          <TouchableOpacity
            style={[
              styles.counterBtn,
              { backgroundColor: activeColor }
            ]}
            onPress={increaseQuantity}
            activeOpacity={0.7}
          >
            <Ionicons
              name="add"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Display the total booking amount */}
        <View style={styles.summaryContainer}>

          <Text style={styles.summaryLabel}>
            Total Amount:
          </Text>

          {/* Automatically updated total price */}
          <Text
            style={[
              styles.summaryPrice,
              { color: activeColor }
            ]}
          >
            PHP {totalPrice}
          </Text>
        </View>

        {/* Button to confirm the booking */}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            { backgroundColor: activeColor }
          ]}
          onPress={handleConfirmPurchase}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>
            Confirm Booking
          </Text>

          {/* Checkmark icon */}
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color="#fff"
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Styles used to design the booking screen
const styles = StyleSheet.create({

  // Main screen background and spacing
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f172a'
  },

  // Design of the booking card
  card: {
    backgroundColor: '#1e293b',
    padding: 22,
    borderRadius: 14,
    borderTopWidth: 6,
    borderWidth: 1,
    borderColor: '#334155'
  },

  // Style of the screen title
  headerTitle: {
    fontSize: 14,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6
  },

  // Style of the event name
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  },

  // Style of the ticket price
  eventPrice: {
    fontSize: 15,
    color: '#cbd5e1',
    marginBottom: 16
  },

  // Horizontal line between sections
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 16
  },

  // Style of the quantity label
  sectionLabel: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 12
  },

  // Container for the plus and minus buttons
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155'
  },

  // Style of the plus and minus buttons
  counterBtn: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  // Style of the ticket quantity number
  quantityText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginHorizontal: 28
  },

  // Container for the total price
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#334155',
    marginBottom: 20
  },

  // Style of the Total Amount label
  summaryLabel: {
    fontSize: 16,
    color: '#94a3b8'
  },

  // Style of the calculated total price
  summaryPrice: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  // Design of the Confirm Booking button
  confirmButton: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4
  },

  // Style of the Confirm Booking button text
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
