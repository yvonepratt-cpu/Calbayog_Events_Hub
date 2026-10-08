// Import React and useState hook from react package
import React, { useState } from 'react';
// Import UI and feedback components from react-native
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Export default functional component BuyTicketScreen receiving navigation and route props
export default function BuyTicketScreen({ navigation, route }) {
  // Extract event object from route parameters or fallback to default event details
  const event = route?.params?.event || {
    name: 'Calbayog Music Night',
    date: 'October 10, 2026',
    venue: 'City Events Hall',
    numericPrice: 250,
  };

  // Determine unit ticket price from numericPrice prop or extract numbers from string price
  const unitPrice = event.numericPrice || (
    event.price ? parseInt(String(event.price).match(/\d+/)[0], 10) : 250
  );

  // Initialize state variable for ticket quantity defaulting to 1
  const [quantity, setQuantity] = useState(1);

  // CLEAN ALERT - NO ENTRY, NO REF NO, NO EXTRA NOTE
  // Function handler to calculate total price and pop up purchase confirmation alert
  const handleConfirmAndPay = () => {
    // Calculate final total price based on quantity
    const totalPrice = unitPrice * quantity;

    // Display confirmation native alert modal
    Alert.alert(
      "Ticket Confirmed!",
      `Event: ${event.name}\nTickets: ${quantity} x (PHP ${unitPrice})\nTotal Paid: PHP ${totalPrice}`,
      [
        {
          text: "Done",
          onPress: () => navigation.navigate('Home')
        }
      ]
    );
  };

  // Return JSX layout structure
  return (
    /* Outer main screen container view */
    <View style={styles.container}>
      {/* Render screen header title text */}
      <Text style={styles.heading}>Buy Ticket</Text>

      {/* Ticket Card Preview */}
      {/* Card view component showcasing ticket overview */}
      <View style={styles.ticketCard}>
        {/* Top section row inside ticket preview card */}
        <View style={styles.ticketHeader}>
          {/* Display event title inside ticket header */}
          <Text style={styles.ticketTitle}>{event.name}</Text>
          {/* Display admit count badge label inside header */}
          <Text style={styles.ticketBadge}>ADMIT {quantity}</Text>
        </View>
        
        {/* Body section view inside ticket preview card */}
        <View style={styles.ticketBody}>
          {/* Sublabel header for event date and time */}
          <Text style={styles.ticketSublabel}>DATE & TIME</Text>
          {/* Value text showing event date */}
          <Text style={styles.ticketValue}>{event.date}</Text>

          {/* Sublabel header for event venue location */}
          <Text style={styles.ticketSublabel}>VENUE</Text>
          {/* Value text showing venue location */}
          <Text style={styles.ticketValue}>{event.venue}</Text>
        </View>
      </View>

      {/* Price Details */}
      {/* Information row container showing individual ticket price */}
      <View style={styles.infoRow}>
        {/* Label text for price per ticket */}
        <Text style={styles.label}>Price per Ticket:</Text>
        {/* Formatted value display for price per ticket */}
        <Text style={styles.value}>PHP {unitPrice}</Text>
      </View>

      {/* Quantity selection interactive row view */}
      <View style={styles.qtyRow}>
        {/* Label text for quantity selector */}
        <Text style={styles.label}>Quantity:</Text>
        {/* Counter controls wrapper container */}
        <View style={styles.counter}>
          {/* Decrease quantity button component */}
          <TouchableOpacity 
            style={styles.qtyBtn} 
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            {/* Text label for minus button symbol */}
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>

          {/* Display current selected ticket quantity text */}
          <Text style={styles.qtyText}>{quantity}</Text>

          {/* Increase quantity button component */}
          <TouchableOpacity 
            style={styles.qtyBtn} 
            onPress={() => setQuantity(quantity + 1)}
          >
            {/* Text label for plus button symbol */}
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Summary row showing calculated total price amount */}
      <View style={styles.infoRow}>
        {/* Label text for total amount */}
        <Text style={styles.label}>Total Amount:</Text>
        {/* Formatted total cost text display */}
        <Text style={styles.totalValue}>PHP {unitPrice * quantity}</Text>
      </View>

      {/* Confirm & Pay Button */}
      {/* Touchable button component to trigger ticket confirmation alert */}
      <TouchableOpacity 
        style={styles.confirmBtn} 
        onPress={handleConfirmAndPay}
      >
        {/* Label text inside confirm button */}
        <Text style={styles.btnText}>Confirm & Pay</Text>
      </TouchableOpacity>

      {/* Touchable button component to cancel and navigate back */}
      <TouchableOpacity 
        style={styles.cancelBtn} 
        onPress={() => navigation.goBack()}
      >
        {/* Label text inside cancel button */}
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

// Create stylesheet configuration object
const styles = StyleSheet.create({
  // Root container screen layout styling
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  // Screen title heading text styling
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  // Ticket preview card box styling
  ticketCard: { borderWidth: 1.5, borderColor: '#0066FF', backgroundColor: '#f8f9fa', borderRadius: 8, padding: 16, marginBottom: 20 },
  // Flex row layout for ticket card header
  ticketHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  // Card header event title text styling
  ticketTitle: { fontSize: 18, fontWeight: 'bold', color: '#0066FF', flex: 1 },
  // Admit badge styling inside ticket header
  ticketBadge: { backgroundColor: '#0066FF', color: '#fff', fontSize: 12, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  // Ticket card content body spacing
  ticketBody: { marginTop: 4 },
  // Ticket info sublabel text styling
  ticketSublabel: { fontSize: 11, color: '#666', fontWeight: 'bold', marginTop: 6 },
  // Ticket info value text styling
  ticketValue: { fontSize: 15, color: '#222', fontWeight: '500' },
  // Generic key-value summary row flex layout
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  // Quantity row layout styling
  qtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  // General text label font styling
  label: { fontSize: 16, fontWeight: '600' },
  // Standard text value font styling
  value: { fontSize: 16 },
  // Highlighted total amount price text styling
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#0066FF' },
  // Counter buttons horizontal flex row container
  counter: { flexDirection: 'row', alignItems: 'center' },
  // Plus/Minus counter touchable button styling
  qtyBtn: { backgroundColor: '#e0e0e0', width: 36, height: 36, borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  // Counter button symbol text styling
  qtyBtnText: { fontSize: 18, fontWeight: 'bold' },
  // Quantity display text font styling
  qtyText: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },
  // Primary confirm and pay button box styling
  confirmBtn: { backgroundColor: '#0066FF', paddingVertical: 14, borderRadius: 6, alignItems: 'center', marginTop: 15 },
  // Secondary cancel button box styling
  cancelBtn: { backgroundColor: '#7F7F7F', paddingVertical: 14, borderRadius: 6, alignItems: 'center', marginTop: 10 },
  // Confirm button text font styling
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  // Cancel button text font styling
  cancelText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});