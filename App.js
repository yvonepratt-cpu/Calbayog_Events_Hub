import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookingsContext } from './BookingsContext';

export default function HomeScreen({ navigation }) {
  const { bookings } = useContext(BookingsContext);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.heroSection}>
        <View style={styles.iconCircle}>
          <Ionicons name="calendar" size={40} color="#0066FF" />
        </View>
        <Text style={styles.heading}>Calbayog Events Hub</Text>
        <Text style={styles.subheading}>
          Your ultimate guide to local gigs, cultural festivals, and community gatherings across Calbayog City.
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('Events')}
          activeOpacity={0.7}
        >
          <Ionicons name="search-outline" size={24} color="#0066FF" />
          <View style={styles.featureTextWrapper}>
            <Text style={styles.featureTitle}>Browse & Search</Text>
            <Text style={styles.featureDesc}>Instantly find events by name or venue location.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#64748b" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('My Bookings')}
          activeOpacity={0.7}
        >
          <Ionicons name="ticket-outline" size={24} color="#0066FF" />
          <View style={styles.featureTextWrapper}>
            <Text style={styles.featureTitle}>
              Secure Bookings ({bookings.length})
            </Text>
            <Text style={styles.featureDesc}>Save ticket orders securely to your device storage.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Events')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Explore Upcoming Events</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  contentContainer: { padding: 24, justifyContent: 'center', alignItems: 'center', flexGrow: 1 },
  heroSection: { alignItems: 'center', marginBottom: 35, marginTop: 20 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#0066FF',
  },
  heading: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#ffffff', marginBottom: 10 },
  subheading: { fontSize: 15, color: '#94a3b8', textAlign: 'center', lineHeight: 22, paddingHorizontal: 10 },
  featuresContainer: { width: '100%', marginBottom: 35 },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  featureTextWrapper: { marginLeft: 16, flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: 'bold', color: '#ffffff' },
  featureDesc: { fontSize: 13, color: '#94a3b8', marginTop: 2 },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 8 },
  buttonIcon: { marginLeft: 4 },
});