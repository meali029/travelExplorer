import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar,  Users, DollarSign, Star, ChevronDown, ChevronUp } from 'lucide-react';

const packages = [
  {
    id: 1,
    name: 'Greek Islands Explorer',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    description: 'Explore the stunning Greek islands of Santorini, Mykonos, and Crete on this 10-day adventure.',
    duration: '10 days',
    groupSize: '12 people max',
    price: 2499,
    rating: 4.9,
    highlights: [
      'Watch the sunset in Santorini',
      'Explore ancient ruins in Crete',
      'Enjoy the vibrant nightlife in Mykonos',
      'Visit traditional Greek villages',
      'Swim in crystal-clear waters'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Athens', description: 'Welcome meeting and dinner in Athens.' },
      { day: 2, title: 'Athens to Mykonos', description: 'Morning ferry to Mykonos. Afternoon exploration of Mykonos Town.' },
      { day: 3, title: 'Mykonos', description: 'Full day to enjoy the beaches and atmosphere of Mykonos.' },
      { day: 4, title: 'Mykonos to Santorini', description: 'Ferry to Santorini. Evening in Fira.' },
      { day: 5, title: 'Santorini', description: 'Full day tour of Santorini including Oia and volcanic beaches.' },
      { day: 6, title: 'Santorini', description: 'Free day to explore Santorini at your own pace.' },
      { day: 7, title: 'Santorini to Crete', description: 'Ferry to Crete. Arrival in Heraklion.' },
      { day: 8, title: 'Crete', description: 'Visit to Knossos Palace and Heraklion Archaeological Museum.' },
      { day: 9, title: 'Crete', description: 'Day trip to Chania and Rethymno.' },
      { day: 10, title: 'Departure', description: 'Transfer to Heraklion airport for departure.' }
    ]
  },
  {
    id: 2,
    name: 'Japan Cultural Journey',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Immerse yourself in Japanese culture with visits to Tokyo, Kyoto, and Osaka on this 12-day tour.',
    duration: '12 days',
    groupSize: '10 people max',
    price: 3299,
    rating: 4.8,
    highlights: [
      'Experience Tokyo\'s blend of modern and traditional',
      'Visit ancient temples in Kyoto',
      'Enjoy a traditional tea ceremony',
      'Stay in a traditional ryokan',
      'Sample authentic Japanese cuisine'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Tokyo', description: 'Welcome meeting and dinner in Tokyo.' },
      { day: 2, title: 'Tokyo Exploration', description: 'Visit Tsukiji Outer Market, Meiji Shrine, and Shibuya Crossing.' },
      { day: 3, title: 'Tokyo', description: 'Day trip to Nikko to see Toshogu Shrine and natural scenery.' },
      { day: 4, title: 'Tokyo to Hakone', description: 'Travel to Hakone. Enjoy hot springs and views of Mt. Fuji.' },
      { day: 5, title: 'Hakone to Kyoto', description: 'Bullet train to Kyoto. Evening walk in Gion district.' },
      { day: 6, title: 'Kyoto', description: 'Visit Kinkaku-ji, Ryoan-ji, and Arashiyama Bamboo Grove.' },
      { day: 7, title: 'Kyoto', description: 'Visit Fushimi Inari Shrine and participate in a tea ceremony.' },
      { day: 8, title: 'Kyoto to Nara', description: 'Day trip to Nara to see Todai-ji Temple and deer park.' },
      { day: 9, title: 'Kyoto to Osaka', description: 'Travel to Osaka. Visit Osaka Castle and Dotonbori district.' },
      { day: 10, title: 'Osaka', description: 'Free day to explore Osaka at your own pace.' },
      { day: 11, title: 'Osaka to Hiroshima', description: 'Day trip to Hiroshima and Miyajima Island.' },
      { day: 12, title: 'Departure', description: 'Transfer to Osaka airport for departure.' }
    ]
  },
  {
    id: 3,
    name: 'Peruvian Highlights',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Discover the wonders of Peru including Machu Picchu, the Sacred Valley, and Lima on this 8-day adventure.',
    duration: '8 days',
    groupSize: '14 people max',
    price: 1999,
    rating: 4.9,
    highlights: [
      'Explore the ancient ruins of Machu Picchu',
      'Visit the Sacred Valley of the Incas',
      'Experience Cusco\'s colonial architecture',
      'Learn about Peruvian cuisine',
      'Meet local communities'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Lima', description: 'Welcome meeting and dinner in Lima.' },
      { day: 2, title: 'Lima to Cusco', description: 'Flight to Cusco. Afternoon acclimatization and city tour.' },
      { day: 3, title: 'Sacred Valley', description: 'Full day exploring the Sacred Valley, including Pisac and Ollantaytambo.' },
      { day: 4, title: 'Machu Picchu', description: 'Early train to Aguas Calientes and guided tour of Machu Picchu.' },
      { day: 5, title: 'Machu Picchu to Cusco', description: 'Optional second visit to Machu Picchu. Afternoon train back to Cusco.' },
      { day: 6, title: 'Cusco', description: 'Free day to explore Cusco at your own pace.' },
      { day: 7, title: 'Cusco to Lima', description: 'Flight back to Lima. Afternoon city tour of Lima.' },
      { day: 8, title: 'Departure', description: 'Transfer to Lima airport for departure.' }
    ]
  },
  {
    id: 4,
    name: 'African Safari Adventure',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80',
    description: 'Experience the wildlife and natural beauty of Tanzania on this 7-day safari adventure.',
    duration: '7 days',
    groupSize: '8 people max',
    price: 3799,
    rating: 4.9,
    highlights: [
      'Witness the Great Migration in Serengeti',
      'Spot the Big Five on game drives',
      'Visit Ngorongoro Crater',
      'Meet Maasai communities',
      'Stay in luxury safari lodges'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Arusha', description: 'Welcome meeting and dinner in Arusha.' },
      { day: 2, title: 'Arusha to Tarangire', description: 'Drive to Tarangire National Park. Afternoon game drive.' },
      { day: 3, title: 'Tarangire to Serengeti', description: 'Travel to Serengeti National Park. Evening game drive.' },
      { day: 4, title: 'Serengeti', description: 'Full day of game drives in Serengeti National Park.' },
      { day: 5, title: 'Serengeti to Ngorongoro', description: 'Morning game drive in Serengeti. Afternoon travel to Ngorongoro.' },
      { day: 6, title: 'Ngorongoro Crater', description: 'Full day exploring Ngorongoro Crater.' },
      { day: 7, title: 'Departure', description: 'Return to Arusha for departure.' }
    ]
  }
];

const Packages = () => {
  const [expandedPackage, setExpandedPackage] = useState<number | null>(null);

  const togglePackage = (id: number) => {
    if (expandedPackage === id) {
      setExpandedPackage(null);
    } else {
      setExpandedPackage(id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600 dark:bg-blue-800 transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600 opacity-90"></div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay'
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Travel Packages & Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
          >
            Discover our carefully curated travel packages designed to provide unforgettable experiences at competitive prices.
          </motion.p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Featured Packages
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              All-inclusive packages with expert guides, comfortable accommodations, and unforgettable experiences.
            </p>
          </div>

          <div className="space-y-8">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-colors duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 h-64 md:h-auto">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {pkg.name}
                        </h3>
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 text-blue-500 mr-1" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            Featured Destination
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {pkg.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {pkg.description}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Users className="h-5 w-5 text-blue-500 mr-2" />
                        <span>{pkg.groupSize}</span>
                      </div>
                      <div className="flex items-center text-gray-900 dark:text-white font-bold">
                        <DollarSign className="h-5 w-5 text-green-500 mr-1" />
                        <span>${pkg.price}</span>
                        <span className="text-gray-500 dark:text-gray-400 font-normal ml-1">/ person</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
                        Book Now
                      </button>
                      <button
                        onClick={() => togglePackage(pkg.id)}
                        className="flex items-center bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                      >
                        <span>View Details</span>
                        {expandedPackage === pkg.id ? (
                          <ChevronUp className="h-5 w-5 ml-2" />
                        ) : (
                          <ChevronDown className="h-5 w-5 ml-2" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {expandedPackage === pkg.id && (
                  <div className="p-6 border-t border-gray-200 dark:border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Highlights
                        </h4>
                        <ul className="space-y-2">
                          {pkg.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Itinerary
                        </h4>
                        <div className="space-y-4">
                          {pkg.itinerary.map((day) => (
                            <div key={day.day} className="flex">
                              <div className="mr-4">
                                <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold rounded-full w-8 h-8 flex items-center justify-center">
                                  {day.day}
                                </div>
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-900 dark:text-white">
                                  {day.title}
                                </h5>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                  {day.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Information */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Booking Information
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about booking your next adventure with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                What's Included
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">Accommodations as specified</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">Meals as per itinerary</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">Professional English-speaking guides</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">Transportation during the tour</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">Entrance fees to attractions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">24/7 customer support</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                What's Not Included
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span className="text-gray-600 dark:text-gray-300">International flights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span className="text-gray-600 dark:text-gray-300">Travel insurance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span className="text-gray-600 dark:text-gray-300">Visa fees</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span className="text-gray-600 dark:text-gray-300">Personal expenses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span className="text-gray-600 dark:text-gray-300">Optional activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span className="text-gray-600 dark:text-gray-300">Tips for guides and drivers</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Payment & Cancellation
              </h3>
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Deposit</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    20% deposit required at time of booking to secure your spot.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Final Payment</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Full payment due 60 days before departure date.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Cancellation Policy</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    - 60+ days: Full refund minus deposit<br />
                    - 30-59 days: 50% refund<br />
                    - 0-29 days: No refund
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help Planning Your Trip?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Our travel experts are ready to help you create the perfect itinerary tailored to your preferences.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Packages;