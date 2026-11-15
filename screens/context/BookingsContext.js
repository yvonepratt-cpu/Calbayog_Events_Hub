import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BookingsContext = createContext();

const STORAGE_KEY = '@my_bookings';

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const toggleBookingStatus = async (bookingId) => {
    try {
      const updatedBookings = bookings.map((item) => {
        if (item.id === bookingId) {
          const nextStatus = item.status === 'Checked In' ? 'Confirmed' : 'Checked In';
          return { ...item, status: nextStatus };
        }
        return item;
      });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
    } catch (err) {
      setError('Failed to update booking status.');
    }
  };

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
        toggleBookingStatus,
        deleteBooking,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};
