'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus, FaMinus, FaTrash, FaArrowLeft, FaCreditCard, FaMoneyBill } from 'react-icons/fa';

// Mock cart data
const initialCartItems = [
  {
    id: '101',
    name: 'Margherita Pizza',
    price: 12.99,
    quantity: 1,
    image: '/pizza-1.jpg',
    restaurant: {
      id: '1',
      name: 'Pizza Palace',
    },
    specialInstructions: '',
  },
  {
    id: '301',
    name: 'Spaghetti Bolognese',
    price: 13.99,
    quantity: 2,
    image: '/pasta-1.jpg',
    restaurant: {
      id: '1',
      name: 'Pizza Palace',
    },
    specialInstructions: 'Extra cheese please',
  },
];

// Mock address data
const addresses = [
  {
    id: '1',
    label: 'Home',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Work',
    addressLine1: '456 Office Ave',
    addressLine2: 'Floor 12',
    city: 'New York',
    state: 'NY',
    postalCode: '10002',
    isDefault: false,
  },
];

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedAddress, setSelectedAddress] = useState(addresses.find(addr => addr.isDefault)?.id || '');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [step, setStep] = useState(1); // 1: Cart, 2: Delivery, 3: Payment
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Delivery fee
  const deliveryFee = 2.99;
  
  // Tax (assuming 8%)
  const tax = subtotal * 0.08;
  
  // Total
  const total = subtotal + deliveryFee + tax;
  
  // Function to update item quantity
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Function to remove item from cart
  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  // Function to update special instructions
  const updateSpecialInstructions = (itemId: string, instructions: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, specialInstructions: instructions } : item
      )
    );
  };
  
  // Function to handle checkout
  const handleCheckout = () => {
    // This would be replaced with actual checkout logic
    console.log('Checkout data:', {
      items: cartItems,
      address: addresses.find(addr => addr.id === selectedAddress),
      paymentMethod,
      specialInstructions,
      subtotal,
      deliveryFee,
      tax,
      total,
    });
    
    // Simulate successful checkout
    router.push('/order-confirmation');
  };
  
  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <div className="mb-6">
            <Image
              src="/empty-cart.svg"
              alt="Empty Cart"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/restaurants" className="btn-primary">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <button
            className="text-primary flex items-center"
            onClick={() => step > 1 ? setStep(step - 1) : router.push('/restaurants')}
          >
            <FaArrowLeft className="mr-2" />
            {step > 1 ? 'Back' : 'Continue Shopping'}
          </button>
          
          <div className="hidden md:flex items-center">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="text-sm">Cart</span>
            </div>
            
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="text-sm">Delivery</span>
            </div>
            
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="text-sm">Payment</span>
            </div>
          </div>
          
          <div className="md:hidden">
            <span className="font-medium">Step {step} of 3</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items and Delivery/Payment Forms */}
        <div className="lg:col-span-2">
          {/* Step 1: Cart Items */}
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
              
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="/restaurant-logo.png"
                    alt={cartItems[0].restaurant.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-2"
                  />
                  <h2 className="font-semibold">{cartItems[0].restaurant.name}</h2>
                </div>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex border-b pb-4">
                      <div className="relative w-20 h-20 mr-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                        <p className="text-gray-500 text-sm">${item.price.toFixed(2)} each</p>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <button
                              className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="mx-2 font-medium">{item.quantity}</span>
                            <button
                              className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>
                          
                          <button
                            className="text-red-500 flex items-center"
                            onClick={() => removeItem(item.id)}
                          >
                            <FaTrash className="mr-1" />
                            Remove
                          </button>
                        </div>
                        
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Special instructions"
                            className="input-field text-sm py-1"
                            value={item.specialInstructions}
                            onChange={(e) => updateSpecialInstructions(item.id, e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <textarea
                    placeholder="Add special instructions for the restaurant"
                    className="input-field w-full"
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  className="btn-primary"
                  onClick={() => setStep(2)}
                >
                  Continue to Delivery
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Delivery Address */}
          {step === 2 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Delivery Address</h1>
              
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <h2 className="font-semibold mb-4">Select a delivery address</h2>
                
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 cursor-pointer ${
                        selectedAddress === address.id
                          ? 'border-primary bg-primary bg-opacity-5'
                          : 'hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedAddress(address.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="font-medium mr-2">{address.label}</span>
                            {address.isDefault && (
                              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700">
                            {address.addressLine1}
                            {address.addressLine2 && `, ${address.addressLine2}`}
                          </p>
                          <p className="text-gray-700">
                            {address.city}, {address.state} {address.postalCode}
                          </p>
                        </div>
                        
                        <div className="flex items-center h-5">
                          <input
                            type="radio"
                            checked={selectedAddress === address.id}
                            onChange={() => setSelectedAddress(address.id)}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Link href="/profile/addresses/new" className="text-primary font-medium">
                    + Add a new address
                  </Link>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  className="btn-primary"
                  onClick={() => setStep(3)}
                  disabled={!selectedAddress}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Payment Method */}
          {step === 3 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
              
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <h2 className="font-semibold mb-4">Select a payment method</h2>
                
                <div className="space-y-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary bg-opacity-5'
                        : 'hover:border-gray-400'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FaCreditCard className="text-gray-700 mr-3 text-xl" />
                        <div>
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-gray-500 text-sm">Pay securely with your card</p>
                        </div>
                      </div>
                      
                      <input
                        type="radio"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      paymentMethod === 'cash'
                        ? 'border-primary bg-primary bg-opacity-5'
                        : 'hover:border-gray-400'
                    }`}
                    onClick={() => setPaymentMethod('cash')}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FaMoneyBill className="text-gray-700 mr-3 text-xl" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-gray-500 text-sm">Pay when your order arrives</p>
                        </div>
                      </div>
                      
                      <input
                        type="radio"
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                    </div>
                  </div>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-medium mb-4">Card Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="input-field"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            placeholder="MM/YY"
                            className="input-field"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            placeholder="123"
                            className="input-field"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="nameOnCard"
                          placeholder="John Doe"
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <button
                  className="btn-primary"
                  onClick={handleCheckout}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-4">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Order Details</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Restaurant</span>
                  <span>{cartItems[0].restaurant.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span>{cartItems.length}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Address</span>
                  <span>
                    {selectedAddress
                      ? addresses.find(addr => addr.id === selectedAddress)?.label
                      : 'Not selected'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span>
                    {paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}