import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookingsContext } from './BookingsContext';

export default function BuyTicketScreen({ route, navigation }) {
  const { event } = route.params;
  const { addBooking } = useContext(BookingsContext);
  const [quantity, setQuantity] = useState(1);

  const activeColor = event.accentColor || '#0066FF';

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const totalPrice = event.numericPrice * quantity;

  const handleConfirmPurchase = async () => {
    const now = new Date();
    const formattedDateTime =
      now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) +
      ' at ' +
      now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

    const booking = {
      id: Date.now().toString(),
      eventName: event.name,
      date: event.date,
      venue: event.venue,
      quantity,
      unitPrice: event.numericPrice,
      totalPrice: `PHP ${totalPrice}`,
      bookingDate: formattedDateTime,
      accentColor: activeColor,
    };

    const success = await addBooking(booking);

    if (success) {
      Alert.alert(
        'Success!',
        `You have successfully booked ${quantity} ticket(s) for ${event.name}.`,
        [
          {
            text: 'View My Bookings',
            onPress: () => navigation.navigate('My Bookings'),
          },
        ]
      );
    } else {
      Alert.alert('Error', 'Failed to save booking. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.card, { borderTopColor: activeColor }]}>
        <Text style={styles.headerTitle}>Complete Your Booking</Text>
        <Text style={[styles.eventName, { color: activeColor }]}>{event.name}</Text>
        <Text style={styles.eventPrice}>{event.price} per ticket</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>Select Quantity</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={[styles.counterBtn, { backgroundColor: activeColor }]}
            onPress={decreaseQuantity}
            activeOpacity={0.7}
          >
            <Ionicons name="remove" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity
            style={[styles.counterBtn, { backgroundColor: activeColor }]}
            onPress={increaseQuantity}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryLabel}>Total Amount:</Text>
          <Text style={[styles.summaryPrice, { color: activeColor }]}>PHP {totalPrice}</Text>
        </View>

        <TouchableOpacity
          style={[styles.confirmButton, { backgroundColor: activeColor }]}
          onPress={handleConfirmPurchase}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>Confirm & Pay</Text>
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a' },
  card: {
    backgroundColor: '#1e293b',
    padding: 22,
    borderRadius: 14,
    borderTopWidth: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  headerTitle: { fontSize: 14, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  eventName: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  eventPrice: { fontSize: 15, color: '#cbd5e1', marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 16 },
  sectionLabel: { fontSize: 16, color: '#ffffff', fontWeight: 'bold', marginBottom: 12 },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  counterBtn: { width: 42, height: 42, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  quantityText: { fontSize: 22, fontWeight: 'bold', color: '#ffffff', marginHorizontal: 28 },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
  },
  summaryLabel: { fontSize: 16, color: '#94a3b8' },
  summaryPrice: { fontSize: 24, fontWeight: 'bold' },
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
    elevation: 4,
  },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});