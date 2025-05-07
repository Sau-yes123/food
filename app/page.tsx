import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { FaUtensils, FaMotorcycle, FaCreditCard } from 'react-icons/fa';

export default function Home() {
  // Featured cuisines
  const featuredCuisines = [
    { name: 'Italian', image: '/cuisine-italian.jpg' },
    { name: 'Indian', image: '/cuisine-indian.jpg' },
    { name: 'Chinese', image: '/cuisine-chinese.jpg' },
    { name: 'Mexican', image: '/cuisine-mexican.jpg' },
    { name: 'Japanese', image: '/cuisine-japanese.jpg' },
    { name: 'Thai', image: '/cuisine-thai.jpg' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Delicious Food Delivered To Your Door
              </h1>
              <p className="text-xl mb-8">
                Order from your favorite restaurants with just a few clicks
              </p>
              <Link 
                href="/restaurants" 
                className="bg-white text-primary font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block"
              >
                Order Now
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-80">
                {/* This would normally be an actual image */}
                <div className="absolute inset-0 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">Food Image Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUtensils className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Restaurant</h3>
              <p className="text-gray-600">
                Browse through hundreds of restaurants and cuisines
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCreditCard className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Make Your Order</h3>
              <p className="text-gray-600">
                Select your favorite dishes and pay securely online
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMotorcycle className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your food delivered to your doorstep in minutes
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Cuisines Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Cuisines</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCuisines.map((cuisine, index) => (
              <Link 
                href={`/restaurants?cuisine=${cuisine.name}`} 
                key={index}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden group-hover:shadow-md transition-shadow">
                  <div className="relative h-32">
                    {/* This would normally be an actual image */}
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">{cuisine.name}</span>
                    </div>
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-medium text-gray-800">{cuisine.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who order with Foodie App every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/restaurants" 
              className="btn-primary"
            >
              Browse Restaurants
            </Link>
            <Link 
              href="/register" 
              className="btn-outline border-white text-white hover:bg-white hover:text-dark"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}