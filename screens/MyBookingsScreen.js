import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookingsContext } from './BookingsContext';

export default function MyBookingsScreen() {
  const {
    bookings,
    isLoading,
    error,
    loadBookings,
    updateBookingQuantity,
    deleteBooking,
  } = useContext(BookingsContext);

  const confirmDeleteBooking = (booking) => {
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel your booking for "${booking.eventName}"?`,
      [
        { text: 'No, Keep It', style: 'cancel' },
        {
          text: 'Yes, Delete',
          style: 'destructive',
          onPress: () => deleteBooking(booking.id),
        },
      ],
      { cancelable: true }
    );
  };

  // 1. Loading State Feedback
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerState]}>
        <ActivityIndicator size="large" color="#0066FF" />
        <Text style={styles.stateText}>Loading your saved tickets...</Text>
      </View>
    );
  }

  // 2. Error State Feedback
  if (error) {
    return (
      <View style={[styles.container, styles.centerState]}>
        <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadBookings}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Bookings</Text>

      {/* 3. Empty vs Data State */}
      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="ticket-outline" size={48} color="#94a3b8" />
          <Text style={styles.emptyText}>No ticket bookings saved yet.</Text>
        </View>
      ) : (
        bookings.map((booking) => (
          <View
            key={booking.id}
            style={[styles.card, { borderLeftColor: booking.accentColor || '#0066FF' }]}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.eventName}>{booking.eventName}</Text>
              <Text style={styles.totalPrice}>{booking.totalPrice}</Text>
            </View>

            <View style={styles.detailsRow}>
              <Ionicons name="calendar-outline" size={14} color="#94a3b8" style={styles.detailIcon} />
              <Text style={styles.detailText}>{booking.date}</Text>
            </View>

            <View style={styles.detailsRow}>
              <Ionicons name="location-outline" size={14} color="#94a3b8" style={styles.detailIcon} />
              <Text style={styles.detailText}>{booking.venue}</Text>
            </View>

            {/* UPDATE Operation: Inline Ticket Quantity Stepper */}
            <View style={styles.updateRow}>
              <Text style={styles.detailText}>Tickets:</Text>
              <View style={styles.stepperGroup}>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => updateBookingQuantity(booking.id, booking.quantity - 1)}
                >
                  <Ionicons name="remove" size={14} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.stepperValue}>{booking.quantity}</Text>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => updateBookingQuantity(booking.id, booking.quantity + 1)}
                >
                  <Ionicons name="add" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            {booking.bookingDate && (
              <Text style={styles.timestampText}>Booked on: {booking.bookingDate}</Text>
            )}

            {/* DELETE Operation Button */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmDeleteBooking(booking)}
              activeOpacity={0.8}
            >
              <Ionicons name="trash-outline" size={16} color="#ef4444" />
              <Text style={styles.deleteButtonText}>Cancel Booking</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a' },
  centerState: { justifyContent: 'center', alignItems: 'center' },
  stateText: { color: '#94a3b8', fontSize: 15, marginTop: 12 },
  errorText: { color: '#ef4444', fontSize: 15, marginTop: 12, textAlign: 'center' },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#0066FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: '#fff', fontWeight: 'bold' },
  heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#ffffff', marginTop: 16 },
  emptyContainer: { marginTop: 60, alignItems: 'center' },
  emptyText: { fontSize: 15, color: '#94a3b8', textAlign: 'center', marginTop: 10 },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  eventName: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', flex: 1, marginRight: 8 },
  totalPrice: { fontSize: 16, fontWeight: 'bold', color: '#10b981' },
  detailsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  detailIcon: { marginRight: 6 },
  detailText: { fontSize: 14, color: '#cbd5e1' },
  updateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  stepperGroup: { flexDirection: 'row', alignItems: 'center' },
  stepperBtn: {
    backgroundColor: '#334155',
    width: 26,
    height: 26,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: { color: '#ffffff', fontWeight: 'bold', marginHorizontal: 12, fontSize: 15 },
  timestampText: { fontSize: 11, color: '#64748b', marginTop: 8, fontStyle: 'italic' },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#451a03',
    borderWidth: 1,
    borderColor: '#7f1d1d',
  },
  deleteButtonText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});