import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EventDetailsScreen({ route, navigation }) {
  const { event } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.heroImage} />

      <View style={[styles.card, { borderTopColor: event.accentColor }]}>
        <Text style={[styles.title, { color: event.accentColor }]}>{event.name}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={18} color="#94a3b8" style={styles.icon} />
          <Text style={styles.infoText}>{event.date}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color="#94a3b8" style={styles.icon} />
          <Text style={styles.infoText}>{event.venue}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="pricetag-outline" size={18} color="#94a3b8" style={styles.icon} />
          <Text style={styles.infoText}>{event.price} per ticket</Text>
        </View>

        <Text style={styles.sectionHeader}>About Event</Text>
        <Text style={styles.description}>
          Join us for an exciting experience in Calbayog City! Don't miss out on great live music, cultural performances, and vibrant community gatherings.
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: event.accentColor }]}
          onPress={() => navigation.navigate('BuyTicket', { event })}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Proceed to Buy Ticket</Text>
          <Ionicons name="ticket-outline" size={20} color="#fff" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  heroImage: { width: '100%', height: 200 },
  card: {
    backgroundColor: '#1e293b',
    padding: 22,
    borderRadius: 14,
    borderTopWidth: 6,
    borderWidth: 1,
    borderColor: '#334155',
    margin: 20,
    marginTop: -20,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  icon: { marginRight: 10 },
  infoText: { fontSize: 16, color: '#e2e8f0' },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginTop: 20, marginBottom: 8 },
  description: { fontSize: 14, color: '#94a3b8', lineHeight: 22, marginBottom: 25 },
  button: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 8 },
  buttonIcon: { marginLeft: 4 },
});