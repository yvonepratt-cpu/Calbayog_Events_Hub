
import React, { useEffect, useMemo, useState } from 'react';

// Import components used to build the screen
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Used to display icons
import { Ionicons } from '@expo/vector-icons';

// Import sample events and categories
import { categories, initialEventsData } from './data/eventsData';

// Practice API used to demonstrate online data fetching
// These are sample posts, not real Calbayog events
const API_URL =
  'https://jsonplaceholder.typicode.com/posts?_limit=5';

// This screen displays the list of available events
export default function EventListScreen({ navigation }) {

  // Stores the text entered in the search bar
  const [search, setSearch] = useState('');

  // Stores the selected category (default is All)
  const [category, setCategory] = useState('All');

  // Stores the posts received from the online API
  const [apiPosts, setApiPosts] = useState([]);

  // Checks if API data is still loading
  const [loading, setLoading] = useState(true);

  // Checks if the user is refreshing the list
  const [refreshing, setRefreshing] = useState(false);

  // Stores an error message if API fetching fails
  const [apiError, setApiError] = useState('');

  // Automatically fetch API data when the screen loads
  useEffect(() => {

    // Allows the request to be cancelled
    const controller = new AbortController();

    // Load the online sample posts
    loadApiPosts(controller.signal);

    // Cancel the request when the screen is removed
    return () => controller.abort();

  }, []);

  // This function gets sample posts from the online API
  async function loadApiPosts(signal) {

    // Clear the previous error message
    setApiError('');

    try {

      // Send a request to the API
      const response = await fetch(API_URL, { signal });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Server returned ' + response.status);
      }

      // Convert the API response into JavaScript data
      const data = await response.json();

      // Check if the received data is an array
      if (!Array.isArray(data)) {
        throw new Error('Unexpected API response');
      }

      // Store the received posts
      setApiPosts(data);

    } catch (error) {

      // Show an error if fetching fails
      // Ignore errors caused by cancelling the request
      if (error.name !== 'AbortError') {
        setApiError(
          'Could not load the online API demo. Check your internet connection.'
        );
      }

    } finally {

      // Stop the loading and refreshing indicators
      if (!signal || !signal.aborted) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }

  // This function refreshes the online API data
  async function refresh() {

    // Show the refreshing indicator
    setRefreshing(true);

    // Fetch the API data again
    await loadApiPosts();
  }

  // Filter events based on search text and category
  const filteredEvents = useMemo(() => {

    // Check each event in the sample event list
    return initialEventsData.filter(event => {

      // Check if the event matches the selected category
      const matchesCategory =
        category === 'All' || event.category === category;

      // Remove extra spaces and convert search to lowercase
      const term = search.trim().toLowerCase();

      // Check if the event name or venue matches the search
      const matchesSearch =
        event.name.toLowerCase().includes(term) ||
        event.venue.toLowerCase().includes(term);

      // Display only events that match both conditions
      return matchesCategory && matchesSearch;

    });

  }, [search, category]);

  // Header containing the search bar and category filters
  const header = (
    <View>

      {/* Main screen title */}
      <Text style={styles.heading}>
        Explore Events
      </Text>

      {/* Short description below the title */}
      <Text style={styles.subheading}>
        Browse sample Calbayog events and choose a ticket.
      </Text>

      {/* Search bar container */}
      <View style={styles.searchBox}>

        {/* Search icon */}
        <Ionicons
          name="search-outline"
          size={20}
          color="#94a3b8"
        />

        {/* Input field for searching events */}
        <TextInput
          style={styles.input}
          placeholder="Search event name or venue..."
          placeholderTextColor="#94a3b8"
          value={search}
          onChangeText={setSearch}
          accessibilityLabel="Search events"
        />

        {/* Show clear button when search is not empty */}
        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearch('')}
            accessibilityLabel="Clear search"
          >
            {/* Clear search icon */}
            <Ionicons
              name="close-circle"
              size={20}
              color="#94a3b8"
            />
          </TouchableOpacity>
        )}

      </View>

      {/* Container for category filter buttons */}
      <View style={styles.filters}>

        {/* Create a button for every category */}
        {categories.map(item => (
          <TouchableOpacity
            key={item}

            // Change the selected category when clicked
            onPress={() => setCategory(item)}

            // Highlight the selected category
            style={[
              styles.filter,
              category === item && styles.activeFilter
            ]}
          >
            <Text
              style={[
                styles.filterText,
                category === item && styles.activeFilterText
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}

      </View>

      {/* Display the number of matching events */}
      <Text style={styles.sectionTitle}>
        Events ({filteredEvents.length})
      </Text>

    </View>
  );

  // Footer displaying the online API demonstration
  const footer = (
    <View style={styles.apiBox}>

      {/* API section title */}
      <Text style={styles.sectionTitle}>
        Online API Fetching Demo
      </Text>

      {/* Explain that API posts are only sample data */}
      <Text style={styles.note}>
        These titles come from JSONPlaceholder, a practice API.
        They are NOT real events or tickets.
      </Text>

      {/* Display loading, error, or API results */}
      {loading ? (

        // Show loading indicator while fetching data
        <ActivityIndicator color="#60a5fa" />

      ) : apiError ? (

        // Display an error if fetching fails
        <View>
          <Text style={styles.error}>
            {apiError}
          </Text>

          {/* Button to try fetching again */}
          <TouchableOpacity
            onPress={refresh}
            style={styles.retry}
          >
            <Text style={styles.retryText}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>

      ) : (

        // Display the titles received from the API
        apiPosts.map(post => (
          <Text key={post.id} style={styles.post}>
            {'\u2022'} {post.title}
          </Text>
        ))

      )}

    </View>
  );

  // Main screen displaying the list of events
  return (
    <FlatList

      // Apply the screen styles
      style={styles.container}
      contentContainerStyle={styles.content}

      // Use the filtered events as the list data
      data={filteredEvents}

      // Give each event a unique key
      keyExtractor={item => item.id}

      // Display the search bar and category filters
      ListHeaderComponent={header}

      // Display the API demonstration at the bottom
      ListFooterComponent={footer}

      // Show a message when no events match
      ListEmptyComponent={
        <Text style={styles.empty}>
          No events match your search.
        </Text>
      }

      // Allow users to refresh by pulling down
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor="#60a5fa"
        />
      }

      // Display each event as a clickable card
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}

          // Open the event details when clicked
          onPress={() =>
            navigation.navigate('EventDetails', {
              event: item
            })
          }
          activeOpacity={0.8}
        >

          {/* Display the event image */}
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />

          {/* Container for event information */}
          <View style={styles.cardBody}>

            {/* Display the event category */}
            <Text
              style={[
                styles.category,
                { color: item.accentColor }
              ]}
            >
              {item.category}
            </Text>

            {/* Display the event name */}
            <Text style={styles.eventName}>
              {item.name}
            </Text>

            {/* Display the event date */}
            <Text style={styles.detail}>
              <Ionicons name="calendar-outline" /> {item.date}
            </Text>

            {/* Display the event venue */}
            <Text style={styles.detail}>
              <Ionicons name="location-outline" /> {item.venue}
            </Text>

            {/* Bottom section for price and details link */}
            <View style={styles.bottom}>

              {/* Display the ticket price */}
              <Text style={styles.price}>
                {item.price}
              </Text>

              {/* Text indicating that details can be viewed */}
              <Text style={styles.link}>
                View Details ›
              </Text>

            </View>

          </View>

        </TouchableOpacity>
      )}
    />
  );
}

// Styles used to design the event list screen
const styles = StyleSheet.create({

  // Main screen background
  container: {
    flex: 1,
    backgroundColor: '#0f172a'
  },

  // Spacing around the screen content
  content: {
    padding: 18,
    paddingBottom: 40
  },

  // Style of the Explore Events title
  heading: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 12
  },

  // Style of the description below the title
  subheading: {
    color: '#94a3b8',
    marginTop: 5,
    marginBottom: 18
  },

  // Design of the search bar
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#475569',
    paddingHorizontal: 12
  },

  // Style of the search input
  input: {
    color: '#fff',
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: 9
  },

  // Arrange category buttons in rows
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16
  },

  // Style of each category button
  filter: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: '#1e293b',
    marginRight: 8,
    marginBottom: 8
  },

  // Background color of the selected category
  activeFilter: {
    backgroundColor: '#2563eb'
  },

  // Style of category button text
  filterText: {
    color: '#cbd5e1',
    fontWeight: '600'
  },

  // Text color of the selected category
  activeFilterText: {
    color: '#fff'
  },

  // Style of section titles
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12
  },

  // Design of each event card
  card: {
    borderRadius: 13,
    overflow: 'hidden',
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16
  },

  // Size of the event image
  image: {
    width: '100%',
    height: 145
  },

  // Spacing inside the event card
  cardBody: {
    padding: 15
  },

  // Style of the event category
  category: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5
  },

  // Style of the event name
  eventName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 9
  },

  // Style of event date and venue
  detail: {
    color: '#cbd5e1',
    marginBottom: 5
  },

  // Arrange price and details text horizontally
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center'
  },

  // Style of the ticket price
  price: {
    color: '#4ade80',
    fontWeight: 'bold',
    fontSize: 17
  },

  // Style of the View Details text
  link: {
    color: '#93c5fd',
    fontWeight: 'bold'
  },

  // Message displayed when no events match
  empty: {
    color: '#cbd5e1',
    textAlign: 'center',
    padding: 22
  },

  // Design of the online API demonstration box
  apiBox: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginTop: 12
  },

  // Style of the API explanation
  note: {
    color: '#94a3b8',
    lineHeight: 20,
    marginBottom: 12
  },

  // Style of API error messages
  error: {
    color: '#fca5a5'
  },

  // Design of the Try Again button
  retry: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start'
  },

  // Style of the Try Again button text
  retryText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  // Style of the titles received from the API
  post: {
    color: '#cbd5e1',
    paddingVertical: 6,
    textTransform: 'capitalize'
  }

});
