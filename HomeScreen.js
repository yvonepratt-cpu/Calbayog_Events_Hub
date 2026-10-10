// Import React library from react package
import React from 'react';
// Import core layout, text, touch, and styling components from react-native
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Export default functional component HomeScreen receiving navigation prop
export default function HomeScreen({ navigation }) {
  // Return JSX layout structure
  return (
    /* Main container view with top-aligned flex layout and padding */
    <View style={styles.container}>
      {/* Centered Main Title */}
      <Text style={styles.heading}>CALBAYOG EVENTS HUB</Text>

      {/* Render subheading text describing screen purpose */}
      <Text style={styles.subheading}>
        Browse upcoming local events, view ticket details, and save dates to attend.
      </Text>

      {/* Touchable opacity button to trigger navigation to Events screen */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Events')}
      >
        {/* Label text inside button */}
        <Text style={styles.buttonText}>Browse Events</Text>
      </TouchableOpacity>
    </View>
  );
}

// Create stylesheet object for styling components
const styles = StyleSheet.create({
  // Container styling filling full screen space with white background
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'flex-start' },
  // Heading text styling
  heading: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', // Centers the title horizontally
    marginVertical: 15,
  },
  // Subheading text styling
  subheading: { 
    fontSize: 16, 
    color: '#333', 
    textAlign: 'center', // Centers the description text
    marginBottom: 25, 
    lineHeight: 22,
  },
  // Primary button container styling
  button: { 
    backgroundColor: '#0000FF', 
    padding: 15, 
    borderRadius: 4, 
    alignItems: 'center' 
  },
  // Button text font and color styling
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});