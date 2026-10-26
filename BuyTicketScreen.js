
import React, { useState } from 'react'; // Import React core and useState hook
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'; // Import core UI components and Alert module
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import local device storage library

export default function BuyTicketScreen({ navigation, route }) { // Define and export BuyTicketScreen component receiving navigation and route props
  const event = route?.params?.event || { // Extract passed event or use default fallback object
    name: 'Calbayog Music Night', // Fallback event name
    date: 'October 10, 2026', // Fallback event date
    venue: 'City Events Hall', // Fallback event venue
    numericPrice: 250, // Fallback numeric price
  };

  const unitPrice = event.numericPrice || ( // Extract or calculate unit price per ticket
    event.price ? parseInt(String(event.price).match(/\d+/)[0], 10) : 250
  );

  const [quantity, setQuantity] = useState(1); // Initialize ticket quantity state with a default value of 1

  const handleConfirmAndPay = async () => { // Asynchronous function to process payment and save booking
    const totalPrice = unitPrice * quantity; // Calculate total price based on unit price and quantity
    const newBooking = { // Construct new booking record object
      id: Date.now().toString(), // Generate unique string ID using current timestamp
      name: event.name, // Event name
      date: event.date, // Event date
      venue: event.venue, // Event venue
      quantity, // Purchased quantity
      totalPrice, // Total amount paid
      bookedAt: new Date().toLocaleString(), // Formatted timestamp for booking date/time
    };

    try {
      const existingBookingsJSON = await AsyncStorage.getItem('@my_bookings'); // Retrieve existing bookings from storage
      const existingBookings = existingBookingsJSON ? JSON.parse(existingBookingsJSON) : []; // Parse stored JSON or default to empty array
      
      const updatedBookings = [newBooking, ...existingBookings]; // Prepend new booking to existing list
      await AsyncStorage.setItem('@my_bookings', JSON.stringify(updatedBookings)); // Save updated list back to device storage

      Alert.alert( // Show success confirmation alert dialog
        "Ticket Confirmed!",
        `Event: ${event.name}\nTickets: ${quantity} x (PHP ${unitPrice})\nTotal Paid: PHP ${totalPrice}`,
        [
          {
            text: "View My Bookings",
            onPress: () => navigation.navigate('My Bookings') // Navigate to bookings screen on press
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save booking to device storage."); // Show error alert if storage fails
    }
  };

  return (
    <View style={styles.container}> {/* Root container layout view */}
      <Text style={styles.heading}>Buy Ticket</Text> {/* Main heading text */}

      <View style={styles.ticketCard}> {/* Ticket summary preview card container */}
        <View style={styles.ticketHeader}>
          <Text style={styles.ticketTitle}>{event.name}</Text> {/* Event title inside card */}
          <Text style={styles.ticketBadge}>ADMIT {quantity}</Text> {/* Admission count badge */}
        </View>
        
        <View style={styles.ticketBody}>
          <Text style={styles.ticketSublabel}>DATE & TIME</Text> {/* Date section label */}
          <Text style={styles.ticketValue}>{event.date}</Text> {/* Event date value */}

          <Text style={styles.ticketSublabel}>VENUE</Text> {/* Venue section label */}
          <Text style={styles.ticketValue}>{event.venue}</Text> {/* Event venue value */}
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Price per Ticket:</Text> {/* Unit price label */}
        <Text style={styles.value}>PHP {unitPrice}</Text> {/* Unit price value */}
      </View>

      <View style={styles.qtyRow}>
        <Text style={styles.label}>Quantity:</Text> {/* Quantity selection label */}
        <View style={styles.counter}>
          <TouchableOpacity 
            style={styles.qtyBtn} 
            onPress={() => setQuantity(Math.max(1, quantity - 1))} // Decrease quantity with minimum limit of 1
          >
            <Text style={styles.qtyBtnText}>-</Text> {/* Minus symbol */}
          </TouchableOpacity>

          <Text style={styles.qtyText}>{quantity}</Text> {/* Current quantity display */}

          <TouchableOpacity 
            style={styles.qtyBtn} 
            onPress={() => setQuantity(quantity + 1)} // Increase quantity on press
          >
            <Text style={styles.qtyBtnText}>+</Text> {/* Plus symbol */}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Total Amount:</Text> {/* Total amount label */}
        <Text style={styles.totalValue}>PHP {unitPrice * quantity}</Text> {/* Calculated total price value */}
      </View>

      <TouchableOpacity 
        style={styles.confirmBtn} 
        onPress={handleConfirmAndPay} // Trigger payment and storage confirmation on press
      >
        <Text style={styles.btnText}>Confirm & Pay</Text> {/* Confirm button text */}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.cancelBtn} 
        onPress={() => navigation.goBack()} // Go back to the previous screen on press
      >
        <Text style={styles.cancelText}>Cancel</Text> {/* Cancel button text */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' }, // Root container style
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 }, // Heading style
  ticketCard: { borderWidth: 1.5, borderColor: '#0066FF', backgroundColor: '#f8f9fa', borderRadius: 8, padding: 16, marginBottom: 20 }, // Ticket card style
  ticketHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }, // Ticket card header style
  ticketTitle: { fontSize: 18, fontWeight: 'bold', color: '#0066FF', flex: 1 }, // Ticket title typography style
  ticketBadge: { backgroundColor: '#0066FF', color: '#fff', fontSize: 12, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }, // Badge style
  ticketBody: { marginTop: 4 }, // Ticket body style
  ticketSublabel: { fontSize: 11, color: '#666', fontWeight: 'bold', marginTop: 6 }, // Ticket sublabel style
  ticketValue: { fontSize: 15, color: '#222', fontWeight: '500' }, // Ticket value style
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, // Info row layout style
  qtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }, // Quantity row layout style
  label: { fontSize: 16, fontWeight: '600' }, // Label text style
  value: { fontSize: 16 }, // Value text style
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#0066FF' }, // Total amount text style
  counter: { flexDirection: 'row', alignItems: 'center' }, // Counter container style
  qtyBtn: { backgroundColor: '#e0e0e0', width: 36, height: 36, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }, // Counter button box style
  qtyBtnText: { fontSize: 18, fontWeight: 'bold' }, // Counter button text style
  qtyText: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' }, // Counter number display style
  confirmBtn: { backgroundColor: '#0066FF', paddingVertical: 14, borderRadius: 6, alignItems: 'center', marginTop: 15 }, // Confirm button style
  cancelBtn: { backgroundColor: '#7F7F7F', paddingVertical: 14, borderRadius: 6, alignItems: 'center', marginTop: 10 }, // Cancel button style
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }, // Confirm button text style
  cancelText: { color: '#fff', fontSize: 16, fontWeight: '500' }, // Cancel button text style
});
