// MyBookingsScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function MyBookingsScreen() {
  const [bookings, setBookings] = useState([]);

  // Load bookings whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadBookings();
    }, [])
  );

  const loadBookings = async () => {
    try {
      const storedBookings = await AsyncStorage.getItem('@my_bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.log('Failed to load bookings');
    }
  };

  const clearBookings = async () => {
    Alert.alert("Clear History", "Are you sure you want to clear all bookings?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem('@my_bookings');
          setBookings([]);
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>My Booked Tickets</Text>
        {bookings.length > 0 && (
          <TouchableOpacity onPress={clearBookings}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tickets booked yet.</Text>
          <Text style={styles.emptySubtext}>Book tickets from the Explore tab to save them here.</Text>
        </View>
      ) : (
        bookings.map((item) => (
          <View key={item.id} style={styles.bookingCard}>
            <Text style={styles.bookingTitle}>{item.name}</Text>
            <Text style={styles.bookingDetail}>📅 {item.date}</Text>
            <Text style={styles.bookingDetail}>📍 {item.venue}</Text>
            <Text style={styles.bookingDetail}>🎟️ Quantity: {item.quantity}</Text>
            <Text style={styles.bookingTotal}>Total Paid: PHP {item.totalPrice}</Text>
            <Text style={styles.bookingDate}>Booked on: {item.bookedAt}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  heading: { fontSize: 24, fontWeight: 'bold' },
  clearText: { color: 'red', fontWeight: 'bold' },
  emptyContainer: { marginTop: 100, alignItems: 'center', paddingHorizontal: 20 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#666', marginBottom: 5 },
  emptySubtext: { fontSize: 14, color: '#888', textAlign: 'center' },
  bookingCard: { borderWidth: 1, borderColor: '#0066FF', borderRadius: 8, padding: 15, marginBottom: 15, backgroundColor: '#f0f4ff' },
  bookingTitle: { fontSize: 16, fontWeight: 'bold', color: '#0066FF', marginBottom: 6 },
  bookingDetail: { fontSize: 14, color: '#333', marginBottom: 3 },
  bookingTotal: { fontSize: 15, fontWeight: 'bold', color: '#000', marginTop: 6 },
  bookingDate: { fontSize: 11, color: '#666', marginTop: 4, fontStyle: 'italic' },
});