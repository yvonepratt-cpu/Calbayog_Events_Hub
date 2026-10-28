
import React, { useState } from 'react'; // Import React core and useState hook
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native'; // Import core React Native UI components
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local data persistence
import { Ionicons } from '@expo/vector-icons'; // Import vector icons library

export default function BuyTicketScreen({ route, navigation }) { // Define and export BuyTicketScreen component receiving route and navigation props
  const { event } = route.params; // Extract event object from navigation route parameters
  const [quantity, setQuantity] = useState(1); // Initialize ticket quantity state with 1

  const activeColor = event.accentColor || '#0066FF'; // Set active theme color using event accent color or fallback

  const increaseQuantity = () => setQuantity(prev => prev + 1); // Function to increment ticket quantity
  const decreaseQuantity = () => { // Function to decrement ticket quantity with lower limit of 1
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const totalPrice = event.numericPrice * quantity; // Calculate total price based on unit price and quantity

  const handleConfirmPurchase = async () => { // Asynchronous function to handle purchase confirmation and saving
    const now = new Date(); // Get current date and time instance
    const formattedDateTime = now.toLocaleDateString('en-US', { // Format current date string
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) + ' at ' + now.toLocaleTimeString('en-US', { // Format current time string with 12-hour format
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const booking = { // Construct booking record object
      id: Date.now().toString(), // Generate unique ID string using timestamp
      eventName: event.name, // Event name
      date: event.date, // Event date
      venue: event.venue, // Event venue
      quantity, // Ticket quantity
      totalPrice: `PHP ${totalPrice}`, // Formatted total price string
      bookingDate: formattedDateTime, // Saved with exact Date & Time timestamp
      accentColor: activeColor, // Accent color for styling
    };

    try {
      const existingBookings = await AsyncStorage.getItem('@my_bookings'); // Retrieve existing bookings from storage
      const bookings = existingBookings ? JSON.parse(existingBookings) : []; // Parse stored bookings or default to empty array
      const updatedBookings = [booking, ...bookings]; // Prepend new booking to array
      
      await AsyncStorage.setItem('@my_bookings', JSON.stringify(updatedBookings)); // Save updated bookings array to local storage

      Alert.alert( // Show success alert dialog
        'Success!', 
        `You have successfully booked ${quantity} ticket(s) for ${event.name}.`,
        [
          { 
            text: 'View My Bookings', 
            onPress: () => navigation.navigate('My Bookings') // Navigate to My Bookings screen on press
          }
        ]
      );
    } catch (e) {
      Alert.alert('Error', 'Failed to save booking. Please try again.'); // Show error alert if saving fails
    }
  };

  return (
    <ScrollView style={styles.container}> {/* Root scrollable container view */}
      <View style={[styles.card, { borderTopColor: activeColor }]}> {/* Card container with dynamic top accent border */}
        <Text style={styles.headerTitle}>Complete Your Booking</Text> {/* Section header title text */}
        <Text style={[styles.eventName, { color: activeColor }]}>{event.name}</Text> {/* Event name text with dynamic accent color */}
        <Text style={styles.eventPrice}>{event.price} per ticket</Text> {/* Unit price display text */}

        <View style={styles.divider} /> {/* Divider line */}

        <Text style={styles.sectionLabel}>Select Quantity</Text> {/* Quantity selection section label */}
        <View style={styles.counterContainer}> {/* Counter control box container */}
          <TouchableOpacity 
            style={[styles.counterBtn, { backgroundColor: activeColor }]} // Decrease button style with dynamic background color
            onPress={decreaseQuantity} // Decrease quantity handler
            activeOpacity={0.7} // Active touch opacity feedback
          >
            <Ionicons name="remove" size={20} color="#fff" /> {/* Minus icon */}
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{quantity}</Text> {/* Current quantity number display */}
          
          <TouchableOpacity 
            style={[styles.counterBtn, { backgroundColor: activeColor }]} // Increase button style with dynamic background color
            onPress={increaseQuantity} // Increase quantity handler
            activeOpacity={0.7} // Active touch opacity feedback
          >
            <Ionicons name="add" size={20} color="#fff" /> {/* Plus icon */}
          </TouchableOpacity>
        </View>

        <View style={styles.summaryContainer}> {/* Price summary row container */}
          <Text style={styles.summaryLabel}>Total Amount:</Text> {/* Total amount label */}
          <Text style={[styles.summaryPrice, { color: activeColor }]}>PHP {totalPrice}</Text> {/* Total price value with dynamic color */}
        </View>

        <TouchableOpacity 
          style={[styles.confirmButton, { backgroundColor: activeColor }]} // Confirm button style with dynamic background color
          onPress={handleConfirmPurchase} // Trigger purchase confirmation handler
          activeOpacity={0.8} // Active touch opacity feedback
        >
          <Text style={styles.confirmButtonText}>Confirm & Pay</Text> {/* Button label text */}
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginLeft: 6 }} /> {/* Checkmark icon */}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a' }, // Root container style with dark background
  card: { 
    backgroundColor: '#1e293b', // Card background color
    padding: 22, // Card inner padding
    borderRadius: 14, // Rounded card corners
    borderTopWidth: 6, // Top accent border width
    borderWidth: 1, // Card border width
    borderColor: '#334155', // Card border color
  },
  headerTitle: { fontSize: 14, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }, // Header title style
  eventName: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 }, // Event name typography style
  eventPrice: { fontSize: 15, color: '#cbd5e1', marginBottom: 16 }, // Event price style
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 16 }, // Divider style
  sectionLabel: { fontSize: 16, color: '#ffffff', fontWeight: 'bold', marginBottom: 12 }, // Section label style
  counterContainer: { 
    flexDirection: 'row', // Horizontal layout for counter elements
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
    backgroundColor: '#0f172a', // Counter background color
    borderRadius: 10, // Rounded counter container corners
    padding: 12, // Counter inner padding
    marginBottom: 20, // Bottom margin spacing
    borderWidth: 1, // Counter border width
    borderColor: '#334155' // Counter border color
  },
  counterBtn: { width: 42, height: 42, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }, // Counter button style dimensions
  quantityText: { fontSize: 22, fontWeight: 'bold', color: '#ffffff', marginHorizontal: 28 }, // Quantity text display style
  summaryContainer: { 
    flexDirection: 'row', // Horizontal layout for summary elements
    justifyContent: 'space-between', // Space out label and price
    alignItems: 'center', // Center items vertically
    paddingVertical: 14, // Vertical inner padding
    borderTopWidth: 1, // Top border width
    borderColor: '#334155', // Border color
    marginBottom: 20 // Bottom margin spacing
  },
  summaryLabel: { fontSize: 16, color: '#94a3b8' }, // Summary label text style
  summaryPrice: { fontSize: 24, fontWeight: 'bold' }, // Summary price text style
  confirmButton: { 
    flexDirection: 'row', // Horizontal layout for text and icon
    paddingVertical: 16, // Vertical padding
    borderRadius: 10, // Rounded button corners
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset dimensions
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 4, // Android shadow elevation
  },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }, // Confirm button label text style
});
