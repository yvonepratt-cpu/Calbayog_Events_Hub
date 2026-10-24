// BuyTicketScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BuyTicketScreen({ navigation, route }) {
  const event = route?.params?.event || {
    name: 'Calbayog Music Night',
    date: 'October 10, 2026',
    venue: 'City Events Hall',
    numericPrice: 250,
  };

  const unitPrice = event.numericPrice || 250;
  const [quantity, setQuantity] = useState(1);

  // Save booking data to AsyncStorage
  const handleConfirmAndPay = async () => {
    const totalPrice = unitPrice * quantity;
    const newBooking = {
      id: Date.now().toString(),
      name: event.name,
      date: event.date,
      venue: event.venue,
      quantity,
      totalPrice,
      bookedAt: new Date().toLocaleString(),
    };

    try {
      // Retrieve existing bookings
      const existingBookingsJSON = await AsyncStorage.getItem('@my_bookings');
      const existingBookings = existingBookingsJSON ? JSON.parse(existingBookingsJSON) : [];
      
      // Append new booking
      const updatedBookings = [newBooking, ...existingBookings];
      await AsyncStorage.setItem('@my_bookings', JSON.stringify(updatedBookings));

      Alert.alert(
        "Ticket Confirmed!",
        `Successfully booked ${quantity} ticket(s) for ${event.name}.\nTotal: PHP ${totalPrice}`,
        [
          {
            text: "View My Bookings",
            onPress: () => navigation.navigate('My Bookings')
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save booking to device storage.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Confirm Purchase</Text>

      <View style={styles.ticketCard}>
        <Text style={styles.ticketTitle}>{event.name}</Text>
        <Text style={styles.ticketSublabel}>DATE: {event.date}</Text>
        <Text style={styles.ticketSublabel}>VENUE: {event.venue}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Price per Ticket:</Text>
        <Text style={styles.value}>PHP {unitPrice}</Text>
      </View>

      <View style={styles.qtyRow}>
        <Text style={styles.label}>Quantity:</Text>
        <View style={styles.counter}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.totalValue}>PHP {unitPrice * quantity}</Text>
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmAndPay}>
        <Text style={styles.btnText}>Confirm & Pay</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  ticketCard: { borderWidth: 1.5, borderColor: '#0066FF', backgroundColor: '#f8f9fa', borderRadius: 8, padding: 16, marginBottom: 20 },
  ticketTitle: { fontSize: 18, fontWeight: 'bold', color: '#0066FF', marginBottom: 8 },
  ticketSublabel: { fontSize: 13, color: '#444', fontWeight: '500', marginTop: 4 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  qtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  label: { fontSize: 16, fontWeight: '600' },
  value: { fontSize: 16 },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#0066FF' },
  counter: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { backgroundColor: '#e0e0e0', width: 36, height: 36, borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { fontSize: 18, fontWeight: 'bold' },
  qtyText: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },
  confirmBtn: { backgroundColor: '#0066FF', paddingVertical: 14, borderRadius: 6, alignItems: 'center', marginTop: 15 },
  cancelBtn: { backgroundColor: '#7F7F7F', paddingVertical: 14, borderRadius: 6, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});