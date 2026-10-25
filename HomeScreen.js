
import React from 'react'; // Import React core library
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Import core React Native components and styling tools

export default function HomeScreen({ navigation }) { // Define and export HomeScreen component receiving navigation prop
  return (
    <View style={styles.container}> {/* Root container view */}
      <Text style={styles.heading}>CALBAYOG EVENTS HUB</Text> {/* Main title heading */}
      <Text style={styles.subheading}> {/* Subheading container */}
        Browse upcoming local events, view ticket details, and save dates to attend. {/* Descriptive subtitle text */}
      </Text>
      <TouchableOpacity  
        style={styles.button} // Touchable button styling 
        onPress={() => navigation.navigate('Events')} // Navigate to Events screen on press
      >
        <Text style={styles.buttonText}>Browse Events</Text> {/* Button label text */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'flex-start' }, // Root container layout style
  heading: {  
    fontSize: 26, // Heading font size
    fontWeight: 'bold', // Heading font weight
    textAlign: 'center', // Center-align heading text
    marginVertical: 15, // Vertical margins for heading
  },
  subheading: {  
    fontSize: 16, // Subheading font size
    color: '#333', // Subheading text color
    textAlign: 'center', // Center-align subheading text
    marginBottom: 25, // Bottom margin spacing
    lineHeight: 22, // Line height for readable spacing
  },
  button: {  
    backgroundColor: '#0000FF', // Button background color
    padding: 15, // Inner padding for button
    borderRadius: 4, // Rounded corners for button
    alignItems: 'center' // Center-align button content
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' }, // Button label text styles
});
