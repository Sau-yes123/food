'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaSearch, FaFilter, FaMapMarkerAlt, FaClock, FaMotorcycle } from 'react-icons/fa';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// Mock data for restaurants
const mockRestaurants = [
  {
    id: '1',
    name: 'Pizza Palace',
    image: '/restaurant-1.jpg',
    cuisines: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.5,
    deliveryTime: '30-40 min',
    deliveryFee: '$2.99',
    minOrder: '$10',
    address: '123 Main St, New York',
    isVeg: false,
    priceRange: 2,
  },
  {
    id: '2',
    name: 'Burger Barn',
    image: '/restaurant-2.jpg',
    cuisines: ['American', 'Burgers', 'Fast Food'],
    rating: 4.2,
    deliveryTime: '25-35 min',
    deliveryFee: '$3.99',
    minOrder: '$15',
    address: '456 Oak Ave, New York',
    isVeg: false,
    priceRange: 2,
  },
  {
    id: '3',
    name: 'Sushi Spot',
    image: '/restaurant-3.jpg',
    cuisines: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.7,
    deliveryTime: '40-50 min',
    deliveryFee: '$4.99',
    minOrder: '$20',
    address: '789 Pine St, New York',
    isVeg: false,
    priceRange: 3,
  },
  {
    id: '4',
    name: 'Taco Town',
    image: '/restaurant-4.jpg',
    cuisines: ['Mexican', 'Tacos', 'Burritos'],
    rating: 4.0,
    deliveryTime: '35-45 min',
    deliveryFee: '$3.49',
    minOrder: '$12',
    address: '101 Elm St, New York',
    isVeg: false,
    priceRange: 1,
  },
  {
    id: '5',
    name: 'Green Garden',
    image: '/restaurant-5.jpg',
    cuisines: ['Vegetarian', 'Healthy', 'Salads'],
    rating: 4.6,
    deliveryTime: '25-35 min',
    deliveryFee: '$2.49',
    minOrder: '$15',
    address: '202 Maple Ave, New York',
    isVeg: true,
    priceRange: 2,
  },
  {
    id: '6',
    name: 'Curry House',
    image: '/restaurant-6.jpg',
    cuisines: ['Indian', 'Curry', 'Spicy'],
    rating: 4.4,
    deliveryTime: '40-50 min',
    deliveryFee: '$3.99',
    minOrder: '$18',
    address: '303 Cedar St, New York',
    isVeg: false,
    priceRange: 2,
  },
];

// Mock data for cuisines
const cuisines = [
  'All', 'Italian', 'American', 'Japanese', 'Mexican', 'Indian', 
  'Chinese', 'Thai', 'Mediterranean', 'Vegetarian', 'Vegan'
];

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([1, 4]);
  const [vegOnly, setVegOnly] = useState(false);

  // Filter restaurants based on search query, cuisine, and other filters
  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    // Search filter
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisines.some(cuisine => 
        cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    // Cuisine filter
    const matchesCuisine = 
      selectedCuisine === 'All' || 
      restaurant.cuisines.includes(selectedCuisine);
    
    // Price range filter
    const matchesPriceRange = 
      restaurant.priceRange >= priceRange[0] && 
      restaurant.priceRange <= priceRange[1];
    
    // Veg only filter
    const matchesVegFilter = !vegOnly || restaurant.isVeg;
    
    return matchesSearch && matchesCuisine && matchesPriceRange && matchesVegFilter;
  });

  // Sort restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'deliveryTime') {
      // Extract the first number from the delivery time string
      const aTime = parseInt(a.deliveryTime.split('-')[0]);
      const bTime = parseInt(b.deliveryTime.split('-')[0]);
      return aTime - bTime;
    } else if (sortBy === 'priceRange') {
      return a.priceRange - b.priceRange;
    }
    return 0;
  });

  // Function to render price range ($ to $$$$)
  const renderPriceRange = (range: number) => {
    return '$'.repeat(range);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
      
      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for restaurants or cuisines"
              className="input-field pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="input-field"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Sort by: Rating</option>
              <option value="deliveryTime">Sort by: Delivery Time</option>
              <option value="priceRange">Sort by: Price</option>
            </select>
            
            <button
              className="btn-outline flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              Filters
            </button>
          </div>
        </div>
        
        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-2">Cuisine Type</h3>
                <div className="flex flex-wrap gap-2">
                  {cuisines.map((cuisine) => (
                    <button
                      key={cuisine}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCuisine === cuisine
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                      onClick={() => setSelectedCuisine(cuisine)}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex items-center gap-4">
                  <select
                    className="input-field"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  >
                    <option value={1}>$</option>
                    <option value={2}>$$</option>
                    <option value={3}>$$$</option>
                    <option value={4}>$$$$</option>
                  </select>
                  <span>to</span>
                  <select
                    className="input-field"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  >
                    <option value={1}>$</option>
                    <option value={2}>$$</option>
                    <option value={3}>$$$</option>
                    <option value={4}>$$$$</option>
                  </select>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Dietary Preferences</h3>
                <div className="flex items-center">
                  <input
                    id="vegOnly"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    checked={vegOnly}
                    onChange={() => setVegOnly(!vegOnly)}
                  />
                  <label htmlFor="vegOnly" className="ml-2 block text-sm text-gray-700">
                    Vegetarian Only
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                className="btn-outline mr-2"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCuisine('All');
                  setSortBy('rating');
                  setPriceRange([1, 4]);
                  setVegOnly(false);
                }}
              >
                Reset Filters
              </button>
              <button
                className="btn-primary"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Cuisine Quick Filters */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCuisine === cuisine
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCuisine(cuisine)}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {sortedRestaurants.length} restaurants found
          {selectedCuisine !== 'All' && ` for ${selectedCuisine}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>
      
      {/* Restaurant Grid */}
      {sortedRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((restaurant) => (
            <Link 
              href={`/restaurants/${restaurant.id}`} 
              key={restaurant.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
                {restaurant.isVeg && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Pure Veg
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                  <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    <FaStar className="mr-1" /> {restaurant.rating}
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm mb-2">
                  {restaurant.cuisines.join(', ')}
                </p>
                
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <FaMapMarkerAlt className="mr-1" />
                  {restaurant.address}
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <FaClock className="mr-1 text-gray-400" />
                    {restaurant.deliveryTime}
                  </div>
                  
                  <div className="flex items-center">
                    <FaMotorcycle className="mr-1 text-gray-400" />
                    {restaurant.deliveryFee}
                  </div>
                  
                  <div className="text-gray-500">
                    {renderPriceRange(restaurant.priceRange)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No restaurants found</h3>
          <p className="text-gray-500">
            Try adjusting your filters or search for something else
          </p>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
}