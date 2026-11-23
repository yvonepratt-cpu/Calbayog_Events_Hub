import { StyleSheet } from 'react-native';

// Create reusable styles for different screens
export const styles = StyleSheet.create({

  // Main container of the screen
  container: {
    flex: 1, // Fill the available screen space
    padding: 20, // Add space inside the container
    backgroundColor: 'white' // Set background to white
  },

  // Style of the main screen title
  title: {
    fontSize: 28, // Set the text size
    fontWeight: 'bold', // Make the title bold
    marginBottom: 20 // Add space below the title
  },

  // Style of the description text
  description: {
    fontSize: 18, // Set description text size
    marginBottom: 30 // Add space below the description
  },

  // Style of the primary button
  button: {
    backgroundColor: 'blue', // Set button color to blue
    padding: 15, // Add space inside the button
    alignItems: 'center', // Center the button content
    marginBottom: 15 // Add space below the button
  },

  // Style of the back button
  backButton: {
    backgroundColor: 'gray', // Set button color to gray
    padding: 15, // Add space inside the button
    alignItems: 'center' // Center the button content
  },

  // Style of the text inside buttons
  buttonText: {
    color: 'white', // Set text color to white
    fontSize: 18 // Set button text size
  },

  // Style of each event card
  eventItem: {
    padding: 15, // Add space inside the event card
    borderWidth: 1, // Set border thickness
    borderColor: 'gray', // Set border color
    marginBottom: 10 // Add space between event cards
  },

  // Style of the event title
  eventTitle: {
    fontSize: 20, // Set event title size
    fontWeight: 'bold', // Make event title bold
    marginBottom: 5 // Add space below the title
  },

  // Style of the event information
  eventText: {
    fontSize: 16, // Set information text size
    marginBottom: 3 // Add small space below the text
  },

  // Style of the ticket price
  eventPrice: {
    fontSize: 16, // Set ticket price text size
    fontWeight: 'bold', // Make the price bold
    marginTop: 5 // Add space above the price
  },

  // Style of input labels
  label: {
    fontSize: 16, // Set label text size
    fontWeight: 'bold', // Make the label bold
    marginTop: 10 // Add space above the label
  },

  // Style of the event details text
  detail: {
    fontSize: 20, // Set details text size
    marginBottom: 10 // Add space below each detail
  }

});
