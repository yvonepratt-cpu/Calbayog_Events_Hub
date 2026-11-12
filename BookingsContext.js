import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BookingsContext = createContext();

const STORAGE_KEY = '@my_bookings';

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // READ: Fetch saved bookings once when the provider mounts
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData !== null) {
        setBookings(JSON.parse(storedData));
      } else {
        setBookings([]);
      }
    } catch (err) {
      setError('Failed to load saved bookings from device storage.');
    } finally {
      setIsLoading(false);
    }
  };

  // CREATE: Add a new booking to storage and state
  const addBooking = async (newBooking) => {
    try {
      const updatedBookings = [newBooking, ...bookings];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      return true;
    } catch (err) {
      setError('Failed to save your booking.');
      return false;
    }
  };

  // UPDATE: Modify ticket quantity and recalculate total price for an existing booking
  const updateBookingQuantity = async (bookingId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const updatedBookings = bookings.map((item) => {
        if (item.id === bookingId) {
          const unitPrice = item.unitPrice || parseInt(item.totalPrice.replace(/[^0-9]/g, ''), 10) / item.quantity;
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: `PHP ${unitPrice * newQuantity}`,
          };
        }
        return item;
      });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
    } catch (err) {
      setError('Failed to update ticket quantity.');
    }
  };

  // DELETE: Filter out a booking by ID and update storage
  const deleteBooking = async (bookingId) => {
    try {
      const updatedBookings = bookings.filter((item) => item.id !== bookingId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
    } catch (err) {
      setError('Failed to cancel booking.');
    }
  };

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        isLoading,
        error,
        loadBookings,
        addBooking,
        updateBookingQuantity,
        deleteBooking,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};