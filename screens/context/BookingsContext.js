import React, { createContext, useState, useEffect } from 'react';

// Used to save and retrieve bookings from device storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context to share booking data between screens
export const BookingsContext = createContext();

// Key used to identify saved bookings in storage
const STORAGE_KEY = '@my_bookings';

// Provides booking data and functions to other screens
export const BookingsProvider = ({ children }) => {

  // Stores the list of bookings
  const [bookings, setBookings] = useState([]);

  // Checks if bookings are still loading
  const [isLoading, setIsLoading] = useState(true);

  // Stores error messages if something goes wrong
  const [error, setError] = useState(null);

  // Automatically loads saved bookings when the app starts
  useEffect(() => {
    loadBookings();
  }, []);

  // This function loads bookings from device storage
  const loadBookings = async () => {

    // Start loading and clear previous errors
    setIsLoading(true);
    setError(null);

    try {
      // Get saved bookings from AsyncStorage
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedData !== null) {

        // Convert saved text into an array of bookings
        setBookings(JSON.parse(storedData));

      } else {

        // Use an empty array if no bookings are saved
        setBookings([]);
      }

    } catch (err) {

      // Show an error if loading fails
      setError('Failed to load saved bookings from device storage.');

    } finally {

      // Stop loading whether successful or not
      setIsLoading(false);
    }
  };

  // This function adds and saves a new booking
  const addBooking = async (newBooking) => {
    try {

      // Add the new booking at the beginning of the list
      const updatedBookings = [newBooking, ...bookings];

      // Save the updated booking list to device storage
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedBookings)
      );

      // Update the bookings displayed in the app
      setBookings(updatedBookings);

      // Return true if saving is successful
      return true;

    } catch (err) {

      // Show an error if saving fails
      setError('Failed to save your booking.');

      // Return false if saving fails
      return false;
    }
  };

  // This function changes the status of a booking
  const toggleBookingStatus = async (bookingId) => {
    try {

      // Find the booking using its ID
      const updatedBookings = bookings.map((item) => {

        if (item.id === bookingId) {

          // Switch between Confirmed and Checked In
          const nextStatus =
            item.status === 'Checked In'
              ? 'Confirmed'
              : 'Checked In';

          // Return the booking with its updated status
          return { ...item, status: nextStatus };
        }

        // Keep other bookings unchanged
        return item;
      });

      // Save the updated bookings to device storage
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedBookings)
      );

      // Update the booking list
      setBookings(updatedBookings);

    } catch (err) {

      // Show an error if updating fails
      setError('Failed to update booking status.');
    }
  };

  // This function deletes or cancels a booking
  const deleteBooking = async (bookingId) => {
    try {

      // Remove the booking that matches the given ID
      const updatedBookings = bookings.filter(
        (item) => item.id !== bookingId
      );

      // Save the remaining bookings to device storage
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedBookings)
      );

      // Update the booking list after deletion
      setBookings(updatedBookings);

    } catch (err) {

      // Show an error if deleting fails
      setError('Failed to cancel booking.');
    }
  };

  // Share booking data and functions with other screens
  return (
    <BookingsContext.Provider
      value={{
        bookings,             // List of saved bookings
        isLoading,            // Loading status
        error,                // Error messages
        loadBookings,         // Loads saved bookings
        addBooking,           // Adds a new booking
        toggleBookingStatus,  // Changes booking status
        deleteBooking,        // Deletes a booking
      }}
    >
      {/* Allow other screens to access the context */}
      {children}
    </BookingsContext.Provider>
  );
};
