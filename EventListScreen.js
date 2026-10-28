
import React, { useState } from 'react'; // Import React core and useState hook
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'; // Import React Native components
import { Ionicons } from '@expo/vector-icons'; // Import vector icons library

const categories = ['All', 'Music', 'Culture', 'Tech']; // Available event filter categories array

const eventsData = [ // Array holding event records with categories, image links, and dates
  { 
    id: '1', // Unique event ID
    name: 'Calbayog Music Night', // Event title
    date: 'October 10, 2026', // Formatted event date string
    rawDate: new Date('2026-10-10'), // Raw date object for sorting
    venue: 'City Events Hall', // Event venue location
    price: 'PHP 250', // Formatted price string
    numericPrice: 250, // Numeric price value for sorting
    category: 'Music', // Event category
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', // Event image URI
    accentColor: '#3b82f6', // Accent color
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

export default function EventListScreen({ navigation }) { // Define and export EventListScreen component receiving navigation prop
  const [searchQuery, setSearchQuery] = useState(''); // Initialize search query state
  const [selectedCategory, setSelectedCategory] = useState('All'); // Initialize selected filter category state
  const [sortBy, setSortBy] = useState('date'); // Initialize sort option state ('date' or 'price')

  // Filter and sort events dynamically based on user search, category, and sorting preferences
  const filteredEvents = eventsData
    .filter(event => {
      const matchesSearch = 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = 
        selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.numericPrice - b.numericPrice; // Sort by numeric price ascending
      }
      return a.rawDate - b.rawDate; // Sort by raw date ascending
    });

  return (
    <ScrollView style={styles.container}> {/* Root scrollable container view */}
      <Text style={styles.heading}>Upcoming Events</Text> {/* Main heading text */}
      
      {/* Search Bar Input */}
      <View style={styles.searchContainer}> {/* Search container wrapper */}
        <Ionicons name="search" size={20} color="#94a3b8" style={styles.searchIcon} /> {/* Search icon */}
        <TextInput
          style={styles.searchBar} // Search text input style
          placeholder="Search by event name or venue..." // Placeholder text
          placeholderTextColor="#94a3b8" // Placeholder text color
          value={searchQuery} // Search query value
          onChangeText={setSearchQuery} // Update search query on text change
        />
        {searchQuery.length > 0 && ( // Conditionally render clear search button when query exists
          <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
            <Ionicons name="close-circle" size={20} color="#94a3b8" /> {/* Clear input icon */}
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal Category Filter Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat} // Unique key for category pill
            style={[styles.categoryPill, selectedCategory === cat && styles.activeCategoryPill]} // Dynamic category pill style
            onPress={() => setSelectedCategory(cat)} // Update selected category on press
            activeOpacity={0.8} // Active touch feedback opacity
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.activeCategoryText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sorting Controls */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort By:</Text> {/* Sort label text */}
        <TouchableOpacity 
          style={[styles.sortButton, sortBy === 'date' && styles.activeSortButton]} // Date sort button style
          onPress={() => setSortBy('date')} // Set sort preference to date
        >
          <Ionicons name="calendar-outline" size={14} color={sortBy === 'date' ? '#fff' : '#94a3b8'} style={{ marginRight: 4 }} />
          <Text style={[styles.sortButtonText, sortBy === 'date' && styles.activeSortText]}>Date</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sortButton, sortBy === 'price' && styles.activeSortButton]} // Price sort button style
          onPress={() => setSortBy('price')} // Set sort preference to price
        >
          <Ionicons name="pricetag-outline" size={14} color={sortBy === 'price' ? '#fff' : '#94a3b8'} style={{ marginRight: 4 }} />
          <Text style={[styles.sortButtonText, sortBy === 'price' && styles.activeSortText]}>Price</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional rendering for empty search results */}
      {filteredEvents.length === 0 ? (
        <View style={styles.emptySearchContainer}>
          <Ionicons name="search-outline" size={48} color="#94a3b8" /> {/* Empty search icon */}
          <Text style={styles.noResultsText}>No events match your search.</Text> {/* Empty results message */}
        </View>
      ) : (
        filteredEvents.map((event) => ( // Map over filtered and sorted events
          <TouchableOpacity 
            key={event.id} // Unique react key attribute
            style={[styles.card, { borderLeftColor: event.accentColor }]} // Card container style with left accent border
            onPress={() => navigation.navigate('EventDetails', { event })} // Navigate to EventDetails screen passing event parameter
            activeOpacity={0.9} // Active touch opacity feedback
          >
            <Image source={{ uri: event.image }} style={styles.cardImage} /> {/* Event cover image */}
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={styles.eventName}>{event.name}</Text> {/* Event title text */}
                <View style={[styles.priceBadge, { backgroundColor: event.accentColor }]}>
                  <Text style={styles.eventPrice}>{event.price}</Text> {/* Price badge text */}
                </View>
              </View>
              
              <View style={styles.detailsRow}>
                <Ionicons name="calendar-outline" size={14} color="#94a3b8" style={styles.detailIcon} />
                <Text style={styles.eventDetails}>{event.date}</Text> {/* Event date text */}
              </View>
              
              <View style={styles.detailsRow}>
                <Ionicons name="location-outline" size={14} color="#94a3b8" style={styles.detailIcon} />
                <Text style={styles.eventDetails}>{event.venue}</Text> {/* Event venue text */}
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a' }, // Root container style
  heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 16, color: '#ffffff' }, // Heading style
  searchContainer: {
    flexDirection: 'row', // Horizontal alignment for search items
    alignItems: 'center', // Center vertically
    backgroundColor: '#1e293b', // Search container background color
    borderRadius: 10, // Rounded container corners
    borderWidth: 1, // Border width
    borderColor: '#334155', // Border color
    paddingHorizontal: 12, // Horizontal inner padding
    marginBottom: 16, // Bottom margin
  },
  searchIcon: { marginRight: 8 }, // Search icon right margin
  searchBar: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#ffffff' }, // Search text input style
  categoriesContainer: { flexDirection: 'row', marginBottom: 16 }, // Categories scroll container style
  categoryPill: {
    paddingHorizontal: 16, // Pill horizontal padding
    paddingVertical: 8, // Pill vertical padding
    borderRadius: 20, // Rounded pill corners
    backgroundColor: '#1e293b', // Pill background color
    borderWidth: 1, // Border width
    borderColor: '#334155', // Border color
    marginRight: 8, // Right margin spacing
  },
  activeCategoryPill: { backgroundColor: '#0066FF', borderColor: '#0066FF' }, // Active category pill style
  categoryText: { fontSize: 13, color: '#94a3b8', fontWeight: '600' }, // Category text style
  activeCategoryText: { color: '#ffffff' }, // Active category text style
  sortContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 }, // Sort container row style
  sortLabel: { fontSize: 13, color: '#94a3b8', marginRight: 10, fontWeight: '600' }, // Sort label text style
  sortButton: {
    flexDirection: 'row', // Horizontal alignment for sort button content
    alignItems: 'center', // Center vertically
    backgroundColor: '#1e293b', // Sort button background color
    paddingHorizontal: 12, // Horizontal padding
    paddingVertical: 6, // Vertical padding
    borderRadius: 8, // Rounded button corners
    borderWidth: 1, // Border width
    borderColor: '#334155', // Border color
    marginRight: 8, // Right margin spacing
  },
  activeSortButton: { backgroundColor: '#334155', borderColor: '#0066FF' }, // Active sort button style
  sortButtonText: { fontSize: 12, color: '#94a3b8' }, // Sort button text style
  activeSortText: { color: '#ffffff', fontWeight: 'bold' }, // Active sort button text style
  emptySearchContainer: { marginTop: 40, alignItems: 'center' }, // Empty search wrapper style
  noResultsText: { fontSize: 15, color: '#94a3b8', textAlign: 'center', marginTop: 10 }, // No results text style
  card: { 
    backgroundColor: '#1e293b', // Card background color
    borderRadius: 12, // Rounded card corners
    marginBottom: 18, // Bottom margin spacing
    overflow: 'hidden', // Hide overflow for image layout
    borderLeftWidth: 6, // Left accent border width
    borderWidth: 1, // Card border width
    borderColor: '#334155', // Card border color
    elevation: 4, // Android shadow elevation
  },
  cardImage: { width: '100%', height: 140 }, // Card image dimensions style
  cardBody: { padding: 16 }, // Card body inner padding style
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }, // Card header row style
  eventName: { fontSize: 18, fontWeight: 'bold', flex: 1, marginRight: 8, color: '#ffffff' }, // Event name typography style
  priceBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 }, // Price badge container style
  eventPrice: { fontSize: 13, fontWeight: 'bold', color: '#ffffff' }, // Event price text style
  detailsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 }, // Details row layout style
  detailIcon: { marginRight: 6 }, // Detail icon right margin
  eventDetails: { fontSize: 14, color: '#cbd5e1' }, // Event details text style
});
