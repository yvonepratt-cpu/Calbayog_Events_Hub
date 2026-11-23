
import React, { useContext } from 'react';

// Import components used to build the screen
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';

// Used to display icons
import { Ionicons } from '@expo/vector-icons';

// Used to access saved bookings and booking functions
import { BookingsContext } from './BookingsContext';

// This screen displays and manages saved bookings
export default function MyBookingsScreen() {

  // Get booking information and functions from context
  const {
    bookings,             // List of saved bookings
    isLoading,            // Checks if bookings are loading
    error,                // Stores error messages
    loadBookings,         // Loads saved bookings
    toggleBookingStatus,  // Changes booking status
    deleteBooking         // Deletes a booking
  } = useContext(BookingsContext);

  // Ask the user before deleting a booking
  const confirmDeleteBooking = (booking) => {

    // Display a confirmation message
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel your booking for "${booking.eventName}"?`,
      [
        {
          // Keep the booking when No is selected
          text: 'No, Keep It',
          style: 'cancel'
        },
        {
          // Delete the booking when Yes is selected
          text: 'Yes, Delete',
          style: 'destructive',

          // Call deleteBooking using the booking ID
          onPress: () => deleteBooking(booking.id)
        }
      ],
      { cancelable: true }
    );
  };

  // Show a loading screen while retrieving bookings
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerState]}>

        {/* Display loading animation */}
        <ActivityIndicator size="large" color="#0066FF" />

        {/* Display loading message */}
        <Text style={styles.stateText}>
          Loading your saved tickets...
        </Text>
      </View>
    );
  }

  // Show an error screen if loading or saving fails
  if (error) {
    return (
      <View style={[styles.container, styles.centerState]}>

        {/* Display error icon */}
        <Ionicons
          name="alert-circle-outline"
          size={48}
          color="#ef4444"
        />

        {/* Display the error message */}
        <Text style={styles.errorText}>
          {error}
        </Text>

        {/* Button to try loading bookings again */}
        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadBookings}
        >
          <Text style={styles.retryText}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Display the main My Bookings screen
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >

      {/* Main screen title */}
      <Text style={styles.heading}>
        My Bookings
      </Text>

      {/* Check if there are no saved bookings */}
      {bookings.length === 0 ? (

        // Display a message when the booking list is empty
        <View style={styles.emptyContainer}>

          {/* Ticket icon */}
          <Ionicons
            name="ticket-outline"
            size={48}
            color="#94a3b8"
          />

          {/* Empty booking message */}
          <Text style={styles.emptyText}>
            No ticket bookings saved yet.
          </Text>
        </View>

      ) : (

        // Display each saved booking
        bookings.map((booking) => {

          // Check if the booking is already checked in
          const isCheckedIn =
            booking.status === 'Checked In';

          return (

            // Card containing booking information
            <View
              key={booking.id}
              style={[
                styles.card,
                {
                  // Use the event color for the left border
                  borderLeftColor:
                    booking.accentColor || '#0066FF'
                }
              ]}
            >

              {/* Header containing event name and price */}
              <View style={styles.cardHeader}>

                {/* Display the event name */}
                <Text style={styles.eventName}>
                  {booking.eventName}
                </Text>

                {/* Display the total booking price */}
                <Text style={styles.totalPrice}>
                  {booking.totalPrice}
                </Text>
              </View>

              {/* Display the event date */}
              <View style={styles.detailsRow}>
                <Ionicons
                  name="calendar-outline"
                  size={14}
                  color="#94a3b8"
                  style={styles.detailIcon}
                />

                <Text style={styles.detailText}>
                  {booking.date}
                </Text>
              </View>

              {/* Display the event venue */}
              <View style={styles.detailsRow}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color="#94a3b8"
                  style={styles.detailIcon}
                />

                <Text style={styles.detailText}>
                  {booking.venue}
                </Text>
              </View>

              {/* Display the number of booked tickets */}
              <View style={styles.detailsRow}>
                <Ionicons
                  name="people-outline"
                  size={14}
                  color="#94a3b8"
                  style={styles.detailIcon}
                />

                <Text style={styles.detailText}>
                  {booking.quantity} Ticket(s)
                </Text>
              </View>

              {/* Show booking date if it is available */}
              {booking.bookingDate && (
                <Text style={styles.timestampText}>
                  Booked on: {booking.bookingDate}
                </Text>
              )}

              {/* Container for booking action buttons */}
              <View style={styles.actionsRow}>

                {/* Button to change the booking status */}
                <TouchableOpacity
                  style={[
                    styles.statusButton,

                    // Apply green style if already checked in
                    isCheckedIn && styles.checkedInButton
                  ]}

                  // Change status when the button is clicked
                  onPress={() =>
                    toggleBookingStatus(booking.id)
                  }
                  activeOpacity={0.8}
                >

                  {/* Change icon based on booking status */}
                  <Ionicons
                    name={
                      isCheckedIn
                        ? 'checkmark-done-circle'
                        : 'checkmark-circle-outline'
                    }
                    size={16}
                    color={
                      isCheckedIn ? '#10b981' : '#38bdf8'
                    }
                  />

                  {/* Display the current status button text */}
                  <Text
                    style={[
                      styles.statusButtonText,
                      isCheckedIn && styles.checkedInText
                    ]}
                  >
                    {isCheckedIn
                      ? 'Checked In'
                      : 'Mark Checked In'}
                  </Text>
                </TouchableOpacity>

                {/* Button to cancel or delete a booking */}
                <TouchableOpacity
                  style={styles.deleteButton}

                  // Ask for confirmation before deleting
                  onPress={() =>
                    confirmDeleteBooking(booking)
                  }
                  activeOpacity={0.8}
                >

                  {/* Delete icon */}
                  <Ionicons
                    name="trash-outline"
                    size={16}
                    color="#ef4444"
                  />

                  {/* Cancel button text */}
                  <Text style={styles.deleteButtonText}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

// Styles used to design the My Bookings screen
const styles = StyleSheet.create({

  // Main screen background and spacing
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f172a'
  },

  // Center the loading and error messages
  centerState: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Style of the loading message
  stateText: {
    color: '#94a3b8',
    fontSize: 15,
    marginTop: 12
  },

  // Style of error messages
  errorText: {
    color: '#ef4444',
    fontSize: 15,
    marginTop: 12,
    textAlign: 'center'
  },

  // Design of the Retry button
  retryButton: {
    marginTop: 16,
    backgroundColor: '#0066FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },

  // Style of the Retry button text
  retryText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  // Style of the My Bookings title
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    marginTop: 16
  },

  // Center the message when there are no bookings
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center'
  },

  // Style of the empty booking message
  emptyText: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 10
  },

  // Design of each booking card
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderWidth: 1,
    borderColor: '#334155'
  },

  // Arrange event name and price horizontally
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },

  // Style of the event name
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    marginRight: 8
  },

  // Style of the total booking price
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981'
  },

  // Arrange booking details in a row
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },

  // Add space beside each detail icon
  detailIcon: {
    marginRight: 6
  },

  // Style of the booking information
  detailText: {
    fontSize: 14,
    color: '#cbd5e1'
  },

  // Style of the booking date and time
  timestampText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 8,
    fontStyle: 'italic'
  },

  // Arrange the action buttons horizontally
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14
  },

  // Design of the Mark Checked In button
  statusButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#0c4a6e',
    borderWidth: 1,
    borderColor: '#0369a1'
  },

  // Green background when booking is checked in
  checkedInButton: {
    backgroundColor: '#064e3b',
    borderColor: '#047857'
  },

  // Style of the status button text
  statusButtonText: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 6
  },

  // Green text when booking is checked in
  checkedInText: {
    color: '#10b981'
  },

  // Design of the Cancel button
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#451a03',
    borderWidth: 1,
    borderColor: '#7f1d1d'
  },

  // Style of the Cancel button text
  deleteButtonText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 6
  }
});
