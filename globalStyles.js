// Import the StyleSheet object from react-native for styling components
import { StyleSheet } from 'react-native';

// Export the styles object created using StyleSheet.create
export const styles = StyleSheet.create({

  // Main container layout styling for views
  container: {
    // Allows container to expand and fill available screen space
    flex: 1,
    // Adds inner padding around all sides of the container
    padding: 20,
    // Sets background color of container to white
    backgroundColor: 'white'
  },

  // Header and title text style configuration
  title: {
    // Sets font size for large title text
    fontSize: 28,
    // Applies bold font weight to title
    fontWeight: 'bold',
    // Adds spacing below the title text
    marginBottom: 20
  },

  // Main content description text style configuration
  description: {
    // Sets font size for description text
    fontSize: 18,
    // Adds spacing below the description block
    marginBottom: 30
  },

  // Primary interactive action button style configuration
  button: {
    // Sets primary button background color to blue
    backgroundColor: 'blue',
    // Adds inner padding around button label
    padding: 15,
    // Centers content horizontally inside the button
    alignItems: 'center',
    // Adds bottom margin separating it from adjacent components
    marginBottom: 15
  },

  // Secondary or back action button style configuration
  backButton: {
    // Sets background color of back button to gray
    backgroundColor: 'gray',
    // Adds inner padding around back button label
    padding: 15,
    // Centers text horizontally inside the button
    alignItems: 'center'
  },

  // Font styling for text inside buttons
  buttonText: {
    // Sets button text color to white
    color: 'white',
    // Sets font size for button text
    fontSize: 18
  },

  // Individual event card container item style
  eventItem: {
    // Adds inner padding within the event card box
    padding: 15,
    // Sets border width around event item card
    borderWidth: 1,
    // Sets border color of event item card to gray
    borderColor: 'gray',
    // Adds bottom margin separating card from next list item
    marginBottom: 10
  },

  // Title text style for individual event list items
  eventTitle: {
    // Sets font size for event title
    fontSize: 20,
    // Applies bold text weight to event title
    fontWeight: 'bold',
    // Adds bottom margin below event title
    marginBottom: 5
  },

  // Supporting body text style for event items
  eventText: {
    // Sets font size for event info text
    fontSize: 16,
    // Adds small margin below each event text line
    marginBottom: 3
  },

  // Ticket price display text style for event items
  eventPrice: {
    // Sets font size for price text
    fontSize: 16,
    // Applies bold text weight to highlight price
    fontWeight: 'bold',
    // Adds spacing above the price display element
    marginTop: 5
  },

  // General field label text style configuration
  label: {
    // Sets font size for field labels
    fontSize: 16,
    // Applies bold text weight to labels
    fontWeight: 'bold',
    // Adds top margin above label text
    marginTop: 10
  },

  // Detail view text content style configuration
  detail: {
    // Sets font size for detail text entries
    fontSize: 20,
    // Adds bottom margin below detail text
    marginBottom: 10
  }

});