
import React, { useState } from 'react'; // Import React core and useState hook
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'; // Import core React Native UI components
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local data retrieval and deletion
import { useFocusEffect } from '@react-navigation/native'; // Import navigation focus hook to reload data on screen focus
import { Ionicons } from '@expo/vector-icons'; // Import vector icons library

export default function MyBookingsScreen() { // Define and export MyBookingsScreen component
  const [bookings, setBookings] = useState([]); // Initialize bookings array state

  // Load saved bookings every time screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadBookings(); // Invoke loadBookings when screen focuses
    }, [])
  );

  const loadBookings = async () => { // Asynchronous function to fetch bookings from local storage
    try {
      const data = await AsyncStorage.getItem('@my_bookings'); // Retrieve stored bookings data string
      if (data !== null) {
        setBookings(JSON.parse(data)); // Parse and set bookings state if data exists
      } else {
        setBookings([]); // Reset bookings state to empty array if no data found
      }
    } catch (e) {
      console.log('Failed to load bookings:', e); // Log error if loading fails
    }
  };

  const deleteSingleBooking = (id, eventName) => { // Function to prompt user and delete a specific single booking
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to delete your ticket for ${eventName}?`,
      [
        { text: 'Keep Ticket', style: 'cancel' }, // Cancel option
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            const updated = bookings.filter(b => b.id !== id); // Filter out the deleted booking item by ID
            setBookings(updated); // Update local bookings state
            await AsyncStorage.setItem('@my_bookings', JSON.stringify(updated)); // Save updated array back to storage
          }
        }
      ]
    );
  };

  const clearAllBookings = async () => { // Function to prompt user and clear all saved bookings
    Alert.alert(
      'Clear All Bookings',
      'Are you sure you want to delete all saved tickets?',
      [
        { text: 'Cancel', style: 'cancel' }, // Cancel option
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('@my_bookings'); // Remove bookings item from AsyncStorage
            setBookings([]); // Reset local bookings state to empty array
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => { // Render function for FlatList items
    const cardColor = item.accentColor || '#3b82f6'; // Determine card accent color with fallback
    const displayTimestamp = item.bookingDate || new Date().toLocaleDateString('en-US', { // Guaranteed fallback timestamp if bookingDate is missing
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) + ' at ' + new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return (
      <View style={[styles.card, { borderLeftColor: cardColor }]}> {/* Card container with dynamic left border accent color */}
        <View style={styles.cardHeader}>
          <Text style={[styles.eventName, { color: cardColor }]}>{item.eventName}</Text> {/* Event name text with dynamic accent color */}
          
          <View style={styles.headerRightActions}>
            <View style={[styles.qtyBadge, { backgroundColor: cardColor }]}> {/* Quantity badge with dynamic background color */}
              <Text style={styles.qtyBadgeText}>{item.quantity} Ticket(s)</Text> {/* Quantity badge text */}
            </View>
            
            <TouchableOpacity 
              onPress={() => deleteSingleBooking(item.id, item.eventName)} // Trigger single booking deletion on press
              style={styles.trashBtn} // Trash button style container
              activeOpacity={0.7} // Active touch opacity feedback
            >
              <Ionicons name="trash-outline" size={18} color="#ef4444" /> {/* Trash icon */}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={14} color="#94a3b8" style={styles.icon} /> {/* Calendar icon */}
          <Text style={styles.infoText}>Event Date: {item.date}</Text> {/* Event date text */}
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color="#94a3b8" style={styles.icon} /> {/* Location icon */}
          <Text style={styles.infoText}>Venue: {item.venue}</Text> {/* Event venue text */}
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={14} color="#94a3b8" style={styles.icon} /> {/* Cash icon */}
          <Text style={styles.infoText}>Paid: {item.totalPrice}</Text> {/* Total price paid text */}
        </View>

        <View style={styles.timestampContainer}>
          <Ionicons name="time-outline" size={14} color="#38bdf8" style={{ marginRight: 6 }} /> {/* Time icon */}
          <Text style={styles.timestampLabel}>Booked on: </Text> {/* Timestamp label text */}
          <Text style={styles.timestampValue}>{displayTimestamp}</Text> {/* Timestamp value text */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}> {/* Root container view */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Saved Tickets</Text> {/* Header heading title */}
        {bookings.length > 0 && ( // Conditionally render "Clear All" button if bookings exist
          <TouchableOpacity onPress={clearAllBookings} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>Clear All</Text> {/* Clear all button label */}
          </TouchableOpacity>
        )}
      </View>

      {bookings.length === 0 ? ( // Conditionally render empty state or bookings list
        <View style={styles.emptyContainer}>
          <Ionicons name="ticket-outline" size={64} color="#334155" /> {/* Empty state ticket icon */}
          <Text style={styles.emptyTitle}>No Booked Tickets Yet</Text> {/* Empty state title */}
          <Text style={styles.emptySub}>Explore events and book your tickets to see them listed here.</Text> {/* Empty state description */}
        </View>
      ) : (
        <FlatList
          data={bookings} // Data array for FlatList
          keyExtractor={(item) => item.id} // Unique key extractor function
          renderItem={renderItem} // Render function for each item
          contentContainerStyle={styles.listContent} // List content container style
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a' }, // Root container style with dark background
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, // Header row layout style
  heading: { fontSize: 26, fontWeight: 'bold', color: '#ffffff' }, // Heading title style
  clearBtn: { backgroundColor: '#ef4444', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 }, // Clear button style
  clearBtnText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' }, // Clear button text style
  listContent: { paddingBottom: 20 }, // FlatList content padding style
  card: { 
    backgroundColor: '#1e293b', // Card background color
    padding: 16, // Card inner padding
    borderRadius: 12, // Rounded card corners
    marginBottom: 14, // Spacing between cards
    borderLeftWidth: 6, // Left accent border width
    borderWidth: 1, // Card border width
    borderColor: '#334155', // Card border color
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }, // Card header row layout style
  eventName: { fontSize: 17, fontWeight: 'bold', flex: 1, marginRight: 8 }, // Event name typography style
  headerRightActions: { flexDirection: 'row', alignItems: 'center' }, // Right header actions container style
  qtyBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 8 }, // Quantity badge style
  qtyBadgeText: { fontSize: 11, fontWeight: 'bold', color: '#ffffff' }, // Quantity badge text style
  trashBtn: { padding: 4 }, // Trash button container padding style
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 }, // Info row layout style
  icon: { marginRight: 6 }, // Detail icon right margin
  infoText: { fontSize: 14, color: '#cbd5e1' }, // Info detail text style
  timestampContainer: { 
    flexDirection: 'row', // Horizontal layout for timestamp
    alignItems: 'center', // Center vertically
    marginTop: 12, // Top margin spacing
    paddingTop: 10, // Top inner padding
    borderTopWidth: 1, // Top border width
    borderColor: '#334155' // Top border color
  },
  timestampLabel: { fontSize: 13, color: '#94a3b8', fontWeight: '500' }, // Timestamp label style
  timestampValue: { fontSize: 13, color: '#38bdf8', fontWeight: '600' }, // Timestamp value style
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }, // Empty state container style
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#ffffff', marginTop: 12 }, // Empty state title style
  emptySub: { fontSize: 14, color: '#64748b', textAlign: 'center', marginTop: 6, paddingHorizontal: 30 }, // Empty state subtitle style
});
