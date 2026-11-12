import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = ['All', 'Music', 'Culture', 'Tech'];

const initialEventsData = [
  {
    id: '1',
    name: 'Calbayog Music Night',
    date: 'October 10, 2026',
    rawDate: new Date('2026-10-10'),
    venue: 'City Events Hall',
    price: 'PHP 250',
    numericPrice: 250,
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    accentColor: '#3b82f6',
  },
  {
    id: '2',
    name: 'Campus Indie Gig',
    date: 'October 17, 2026',
    rawDate: new Date('2026-10-17'),
    venue: 'University Activity Center',
    price: 'PHP 200',
    numericPrice: 200,
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    accentColor: '#8b5cf6',
  },
  {
    id: '3',
    name: 'Weekend Acoustic Night',
    date: 'October 24, 2026',
    rawDate: new Date('2026-10-24'),
    venue: 'Downtown Music Hall',
    price: 'PHP 150',
    numericPrice: 150,
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    accentColor: '#10b981',
  },
  {
    id: '4',
    name: 'Sarakiki Cultural Fest',
    date: 'November 05, 2026',
    rawDate: new Date('2026-11-05'),
    venue: 'Calbayog City Plaza',
    price: 'PHP 300',
    numericPrice: 300,
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    accentColor: '#f59e0b',
  },
  {
    id: '5',
    name: 'Samar Youth Tech Summit',
    date: 'November 12, 2026',
    rawDate: new Date('2026-11-12'),
    venue: 'Convention Center Hall B',
    price: 'PHP 180',
    numericPrice: 180,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    accentColor: '#ec4899',
  },
];

export default function EventListScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  // Simulate an asynchronous data fetch using a Promise on mount []
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const data = await new Promise((resolve) => {
        setTimeout(() => resolve(initialEventsData), 600);
      });
      setEvents(data);
      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  // Dependency array example: logs filter/sort state updates
  useEffect(() => {
    console.log(`Filter updated -> Category: ${selectedCategory}, Sort: ${sortBy}`);
  }, [selectedCategory, sortBy]);

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.numericPrice - b.numericPrice;
      }
      return a.rawDate - b.rawDate;
    });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Upcoming Events</Text>

      {/* Search Bar Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94a3b8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search by event name or venue..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {/* Conditional Mounting/Unmounting of clear button */}
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
            <Ionicons name="close-circle" size={20} color="#94a3b8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal Category Filter Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryPill, selectedCategory === cat && styles.activeCategoryPill]}
            onPress={() => setSelectedCategory(cat)}
            activeOpacity={0.8}
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.activeCategoryText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sorting Controls */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort By:</Text>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'date' && styles.activeSortButton]}
          onPress={() => setSortBy('date')}
        >
          <Ionicons name="calendar-outline" size={14} color={sortBy === 'date' ? '#fff' : '#94a3b8'} style={{ marginRight: 4 }} />
          <Text style={[styles.sortButtonText, sortBy === 'date' && styles.activeSortText]}>Date</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'price' && styles.activeSortButton]}
          onPress={() => setSortBy('price')}
        >
          <Ionicons name="pricetag-outline" size={14} color={sortBy === 'price' ? '#fff' : '#94a3b8'} style={{ marginRight: 4 }} />
          <Text style={[styles.sortButtonText, sortBy === 'price' && styles.activeSortText]}>Price</Text>
        </TouchableOpacity>
      </View>

      {/* Loading, Empty, and Data UI States */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066FF" />
          <Text style={styles.loadingText}>Loading local events...</Text>
        </View>
      ) : filteredEvents.length === 0 ? (
        <View style={styles.emptySearchContainer}>
          <Ionicons name="search-outline" size={48} color="#94a3b8" />
          <Text style={styles.noResultsText}>No events match your search.</Text>
        </View>
      ) : (
        filteredEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={[styles.card, { borderLeftColor: event.accentColor }]}
            onPress={() => navigation.navigate('EventDetails', { event })}
            activeOpacity={0.9}
          >
            <Image source={{ uri: event.image }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={styles.eventName}>{event.name}</Text>
                <View style={[styles.priceBadge, { backgroundColor: event.accentColor }]}>
                  <Text style={styles.eventPrice}>{event.price}</Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <Ionicons name="calendar-outline" size={14} color="#94a3b8" style={styles.detailIcon} />
                <Text style={styles.eventDetails}>{event.date}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Ionicons name="location-outline" size={14} color="#94a3b8" style={styles.detailIcon} />
                <Text style={styles.eventDetails}>{event.venue}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a' },
  heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 16, color: '#ffffff' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  searchBar: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#ffffff' },
  categoriesContainer: { flexDirection: 'row', marginBottom: 16 },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    marginRight: 8,
  },
  activeCategoryPill: { backgroundColor: '#0066FF', borderColor: '#0066FF' },
  categoryText: { fontSize: 13, color: '#94a3b8', fontWeight: '600' },
  activeCategoryText: { color: '#ffffff' },
  sortContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  sortLabel: { fontSize: 13, color: '#94a3b8', marginRight: 10, fontWeight: '600' },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    marginRight: 8,
  },
  activeSortButton: { backgroundColor: '#334155', borderColor: '#0066FF' },
  sortButtonText: { fontSize: 12, color: '#94a3b8' },
  activeSortText: { color: '#ffffff', fontWeight: 'bold' },
  loadingContainer: { marginTop: 50, alignItems: 'center' },
  loadingText: { fontSize: 14, color: '#94a3b8', marginTop: 12 },
  emptySearchContainer: { marginTop: 40, alignItems: 'center' },
  noResultsText: { fontSize: 15, color: '#94a3b8', textAlign: 'center', marginTop: 10 },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 18,
    overflow: 'hidden',
    borderLeftWidth: 6,
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 4,
  },
  cardImage: { width: '100%', height: 140 },
  cardBody: { padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  eventName: { fontSize: 18, fontWeight: 'bold', flex: 1, marginRight: 8, color: '#ffffff' },
  priceBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  eventPrice: { fontSize: 13, fontWeight: 'bold', color: '#ffffff' },
  detailsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  detailIcon: { marginRight: 6 },
  eventDetails: { fontSize: 14, color: '#cbd5e1' },
});