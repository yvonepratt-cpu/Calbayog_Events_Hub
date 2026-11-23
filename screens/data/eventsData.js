 // Categories used to filter events
export const categories = ['All', 'Music', 'Culture', 'Tech'];

// List of sample events displayed in the application
export const initialEventsData = [

  // First event: Calbayog Music Night
  {
    id: '1', // Unique ID of the event
    name: 'Calbayog Music Night', // Event name
    date: 'October 10, 2026', // Date displayed to users
    rawDate: new Date('2026-10-10'), // Date in JavaScript format
    venue: 'City Events Hall', // Location of the event
    price: 'PHP 250', // Ticket price displayed as text
    numericPrice: 250, // Ticket price used for calculations
    category: 'Music', // Category of the event
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', // Event image
    accentColor: '#3b82f6', // Blue theme color
  },

  // Second event: Campus Indie Gig
  {
    id: '2', // Unique ID
    name: 'Campus Indie Gig', // Event name
    date: 'October 17, 2026', // Event date
    rawDate: new Date('2026-10-17'), // JavaScript date
    venue: 'University Activity Center', // Event location
    price: 'PHP 200', // Displayed ticket price
    numericPrice: 200, // Price used for calculations
    category: 'Music', // Music category
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', // Event image
    accentColor: '#8b5cf6', // Purple theme color
  },

  // Third event: Weekend Acoustic Night
  {
    id: '3', // Unique ID
    name: 'Weekend Acoustic Night', // Event name
    date: 'October 24, 2026', // Event date
    rawDate: new Date('2026-10-24'), // JavaScript date
    venue: 'Downtown Music Hall', // Event location
    price: 'PHP 150', // Displayed ticket price
    numericPrice: 150, // Price used for calculations
    category: 'Music', // Music category
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80', // Event image
    accentColor: '#10b981', // Green theme color
  },

  // Fourth event: Sarakiki Cultural Fest
  {
    id: '4', // Unique ID
    name: 'Sarakiki Cultural Fest', // Event name
    date: 'November 05, 2026', // Event date
    rawDate: new Date('2026-11-05'), // JavaScript date
    venue: 'Calbayog City Plaza', // Event location
    price: 'PHP 300', // Displayed ticket price
    numericPrice: 300, // Price used for calculations
    category: 'Culture', // Culture category
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80', // Event image
    accentColor: '#f59e0b', // Orange theme color
  },

  // Fifth event: Samar Youth Tech Summit
  {
    id: '5', // Unique ID
    name: 'Samar Youth Tech Summit', // Event name
    date: 'November 12, 2026', // Event date
    rawDate: new Date('2026-11-12'), // JavaScript date
    venue: 'Convention Center Hall B', // Event location
    price: 'PHP 180', // Displayed ticket price
    numericPrice: 180, // Price used for calculations
    category: 'Tech', // Technology category
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', // Event image
    accentColor: '#ec4899', // Pink theme color
  },

];
