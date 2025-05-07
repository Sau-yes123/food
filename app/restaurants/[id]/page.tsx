'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaStar, FaRegClock, FaMotorcycle, FaRegHeart, FaHeart, FaMapMarkerAlt, FaPhone, FaGlobe, FaUtensils, FaPlus, FaMinus } from 'react-icons/fa';

// Mock restaurant data
const restaurant = {
  id: '1',
  name: 'Pizza Palace',
  description: 'Authentic Italian pizzas made with fresh ingredients and traditional recipes. Our wood-fired oven gives our pizzas that perfect crispy crust.',
  images: ['/restaurant-1.jpg', '/restaurant-2.jpg', '/restaurant-3.jpg'],
  cuisines: ['Italian', 'Pizza', 'Pasta'],
  rating: 4.5,
  totalReviews: 328,
  deliveryTime: '30-40 min',
  deliveryFee: '$2.99',
  minOrder: '$10',
  address: '123 Main St, New York, NY 10001',
  phone: '+1 (555) 123-4567',
  website: 'www.pizzapalace.com',
  openingHours: '10:00 AM - 10:00 PM',
  isVeg: false,
  priceRange: 2,
};

// Mock menu categories and items
const menuCategories = [
  {
    id: '1',
    name: 'Popular Items',
    items: [
      {
        id: '101',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        price: 12.99,
        image: '/pizza-1.jpg',
        isVeg: true,
        isPopular: true,
        isSpicy: false,
      },
      {
        id: '102',
        name: 'Pepperoni Pizza',
        description: 'Pizza topped with pepperoni, mozzarella, and tomato sauce',
        price: 14.99,
        image: '/pizza-2.jpg',
        isVeg: false,
        isPopular: true,
        isSpicy: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Pizzas',
    items: [
      {
        id: '201',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        price: 12.99,
        image: '/pizza-1.jpg',
        isVeg: true,
        isPopular: true,
        isSpicy: false,
      },
      {
        id: '202',
        name: 'Pepperoni Pizza',
        description: 'Pizza topped with pepperoni, mozzarella, and tomato sauce',
        price: 14.99,
        image: '/pizza-2.jpg',
        isVeg: false,
        isPopular: true,
        isSpicy: false,
      },
      {
        id: '203',
        name: 'Vegetarian Pizza',
        description: 'Pizza topped with bell peppers, onions, mushrooms, olives, and mozzarella',
        price: 13.99,
        image: '/pizza-3.jpg',
        isVeg: true,
        isPopular: false,
        isSpicy: false,
      },
      {
        id: '204',
        name: 'BBQ Chicken Pizza',
        description: 'Pizza topped with BBQ sauce, chicken, red onions, and mozzarella',
        price: 15.99,
        image: '/pizza-4.jpg',
        isVeg: false,
        isPopular: false,
        isSpicy: false,
      },
    ],
  },
  {
    id: '3',
    name: 'Pasta',
    items: [
      {
        id: '301',
        name: 'Spaghetti Bolognese',
        description: 'Spaghetti with meat sauce, topped with parmesan cheese',
        price: 13.99,
        image: '/pasta-1.jpg',
        isVeg: false,
        isPopular: false,
        isSpicy: false,
      },
      {
        id: '302',
        name: 'Fettuccine Alfredo',
        description: 'Fettuccine pasta in a creamy parmesan sauce',
        price: 12.99,
        image: '/pasta-2.jpg',
        isVeg: true,
        isPopular: false,
        isSpicy: false,
      },
    ],
  },
  {
    id: '4',
    name: 'Sides',
    items: [
      {
        id: '401',
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter and herbs',
        price: 4.99,
        image: '/side-1.jpg',
        isVeg: true,
        isPopular: false,
        isSpicy: false,
      },
      {
        id: '402',
        name: 'Caesar Salad',
        description: 'Romaine lettuce, croutons, parmesan cheese, and Caesar dressing',
        price: 6.99,
        image: '/side-2.jpg',
        isVeg: true,
        isPopular: false,
        isSpicy: false,
      },
    ],
  },
  {
    id: '5',
    name: 'Beverages',
    items: [
      {
        id: '501',
        name: 'Soft Drink',
        description: 'Coke, Diet Coke, Sprite, or Fanta',
        price: 2.49,
        image: '/drink-1.jpg',
        isVeg: true,
        isPopular: false,
        isSpicy: false,
      },
      {
        id: '502',
        name: 'Bottled Water',
        description: 'Still or sparkling water',
        price: 1.99,
        image: '/drink-2.jpg',
        isVeg: true,
        isPopular: false,
        isSpicy: false,
      },
    ],
  },
];

export default function RestaurantDetailPage() {
  const params = useParams();
  const restaurantId = params.id;
  
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'reviews'
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({});
  
  // Function to add item to cart
  const addToCart = (itemId: string) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };
  
  // Function to remove item from cart
  const removeFromCart = (itemId: string) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };
  
  // Calculate cart total
  const cartTotal = Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
    const item = menuCategories.flatMap(cat => cat.items).find(item => item.id === itemId);
    return total + (item ? item.price * quantity : 0);
  }, 0);
  
  // Function to render price range ($ to $$$$)
  const renderPriceRange = (range: number) => {
    return '$'.repeat(range);
  };
  
  // Function to scroll to category
  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Restaurant Header */}
      <div className="mb-8">
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-4">
          <Image
            src={restaurant.images[0]}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
          <button
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-500 text-xl" />
            )}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {restaurant.cuisines.map((cuisine) => (
                <span
                  key={cuisine}
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                >
                  {cuisine}
                </span>
              ))}
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                {renderPriceRange(restaurant.priceRange)}
              </span>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm mr-2">
                <FaStar className="mr-1" /> {restaurant.rating}
              </div>
              <span className="text-gray-500 text-sm">
                {restaurant.totalReviews} reviews
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">{restaurant.description}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FaRegClock className="text-gray-500 mr-2" />
              <span>{restaurant.openingHours}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaMotorcycle className="text-gray-500 mr-2" />
              <span>{restaurant.deliveryTime} • {restaurant.deliveryFee}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaUtensils className="text-gray-500 mr-2" />
              <span>Min. order: {restaurant.minOrder}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaPhone className="text-gray-500 mr-2" />
              <span>{restaurant.phone}</span>
            </div>
            <div className="flex items-center">
              <FaGlobe className="text-gray-500 mr-2" />
              <a href={`https://${restaurant.website}`} target="_blank" rel="noopener noreferrer" className="text-primary">
                {restaurant.website}
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'menu'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('menu')}
          >
            Menu
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'reviews'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
      </div>
      
      {/* Menu Tab Content */}
      {activeTab === 'menu' && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category Navigation */}
          <div className="md:w-1/4">
            <div className="sticky top-4 bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-4">Menu Categories</h3>
              <ul className="space-y-2">
                {menuCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      className={`w-full text-left px-2 py-1 rounded ${
                        activeCategory === category.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => scrollToCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="md:w-3/4">
            {menuCategories.map((category) => (
              <div 
                key={category.id} 
                id={`category-${category.id}`}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex flex-col md:flex-row border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="md:w-1/4 relative h-40 md:h-auto">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        {item.isVeg && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                            Veg
                          </div>
                        )}
                        {item.isSpicy && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            Spicy
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-700 text-sm">{item.description}</p>
                            <p className="text-primary font-medium mt-2">${item.price.toFixed(2)}</p>
                          </div>
                          
                          <div>
                            {cartItems[item.id] ? (
                              <div className="flex items-center">
                                <button
                                  className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <FaMinus className="text-xs" />
                                </button>
                                <span className="mx-2 font-medium">{cartItems[item.id]}</span>
                                <button
                                  className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center"
                                  onClick={() => addToCart(item.id)}
                                >
                                  <FaPlus className="text-xs" />
                                </button>
                              </div>
                            ) : (
                              <button
                                className="btn-primary py-1"
                                onClick={() => addToCart(item.id)}
                              >
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Reviews Tab Content */}
      {activeTab === 'reviews' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
          <p className="text-gray-500">Reviews will be displayed here.</p>
        </div>
      )}
      
      {/* Cart Summary (Fixed at bottom) */}
      {Object.keys(cartItems).length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <p className="font-medium">
                {Object.values(cartItems).reduce((a, b) => a + b, 0)} items
              </p>
              <p className="text-lg font-semibold">${cartTotal.toFixed(2)}</p>
            </div>
            <button className="btn-primary">
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}