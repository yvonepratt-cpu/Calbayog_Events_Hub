
import React, { useState, useCallback } from 'react'; // Import React core, useState, and useCallback hook
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'; // Import React Native components and Alert module
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local data retrieval
import { useFocusEffect } from '@react-navigation/native'; // Import navigation focus hook to reload data on screen focus

export default function MyBookingsScreen() { // Define and export MyBookingsScreen component
  const [bookings, setBookings] = useState([]); // Initialize bookings array state

  useFocusEffect(
    useCallback(() => {
      loadBookings(); // Reload bookings whenever the screen gains focus
    }, [])
  );

  const loadBookings = async () => { // Asynchronous function to load saved bookings from storage
    try {
      const storedBookings = await AsyncStorage.getItem('@my_bookings'); // Fetch stored bookings JSON string
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings)); // Parse and set bookings state if data exists
      } else {
        setBookings([]); // Reset bookings state to empty array if no data found
      }
    } catch (error) {
      console.log('Failed to load bookings'); // Log error if loading fails
    }
  };

  const clearBookings = async () => { // Function to prompt and clear all saved bookings
    Alert.alert("Clear History", "Are you sure you want to clear all bookings?", [
      { text: "Cancel", style: "cancel" }, // Cancel option
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem('@my_bookings'); // Remove bookings item from AsyncStorage
          setBookings([]); // Reset local bookings state
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}> {/* Root scrollable view container */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>My Booked Tickets</Text> {/* Header title text */}
        {bookings.length > 0 && ( // Conditionally render "Clear All" button if bookings exist
          <TouchableOpacity onPress={clearBookings}>
            <Text style={styles.clearText}>Clear All</Text> {/* Clear all text button */}
          </TouchableOpacity>
        )}
      </View>

      {bookings.length === 0 ? ( // Conditionally render empty state or booking list cards
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tickets booked yet.</Text> {/* Empty state title */}
          <Text style={styles.emptySubtext}>Book tickets from the Explore tab to save them here.</Text> {/* Empty state description */}
        </View>
      ) : (
        bookings.map((item) => ( // Map over saved bookings array
          <View key={item.id} style={styles.bookingCard}> {/* Unique card container for each booking */}
            <Text style={styles.bookingTitle}>{item.name}</Text> {/* Booked event name */}
            <Text style={styles.bookingDetail}>📅 {item.date}</Text> {/* Event date detail */}
            <Text style={styles.bookingDetail}>📍 {item.venue}</Text> {/* Event venue detail */}
            <Text style={styles.bookingDetail}>🎟️ Quantity: {item.quantity}</Text> {/* Ticket quantity detail */}
            <Text style={styles.bookingTotal}>Total Paid: PHP {item.totalPrice}</Text> {/* Total price paid */}
            <Text style={styles.bookingDate}>Booked on: {item.bookedAt}</Text> {/* Timestamp when booked */}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' }, // Root container style
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }, // Header row style
  heading: { fontSize: 24, fontWeight: 'bold' }, // Main heading style
  clearText: { color: 'red', fontWeight: 'bold' }, // Clear text button style
  emptyContainer: { marginTop: 100, alignItems: 'center', paddingHorizontal: 20 }, // Empty state container style
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#666', marginBottom: 5 }, // Empty state heading style
  emptySubtext: { fontSize: 14, color: '#888', textAlign: 'center' }, // Empty state subtext style
  bookingCard: { borderWidth: 1, borderColor: '#0066FF', borderRadius: 8, padding: 15, marginBottom: 15, backgroundColor: '#f0f4ff' }, // Booking card style
  bookingTitle: { fontSize: 16, fontWeight: 'bold', color: '#0066FF', marginBottom: 6 }, // Booking title style
  bookingDetail: { fontSize: 14, color: '#333', marginBottom: 3 }, // Booking detail text style
  bookingTotal: { fontSize: 15, fontWeight: 'bold', color: '#000', marginTop: 6 }, // Booking total text style
  bookingDate: { fontSize: 11, color: '#666', marginTop: 4, fontStyle: 'italic' }, // Booking timestamp style
});
