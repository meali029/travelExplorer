import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Filter, Search, Star } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    description: 'Experience the stunning white buildings and blue domes overlooking the Aegean Sea.',
    country: 'Greece',
    continent: 'Europe',
    price: 'High',
    category: 'Beach',
    rating: 4.9
  },
  {
    id: 2,
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Discover ancient temples, traditional gardens, and the beautiful cherry blossoms.',
    country: 'Japan',
    continent: 'Asia',
    price: 'Medium',
    category: 'Cultural',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Machu Picchu, Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Explore the ancient Incan citadel set high in the Andes Mountains.',
    country: 'Peru',
    continent: 'South America',
    price: 'Medium',
    category: 'Adventure',
    rating: 4.9
  },
  {
    id: 4,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80',
    description: 'Relax on beautiful beaches, explore rice terraces, and experience the unique culture.',
    country: 'Indonesia',
    continent: 'Asia',
    price: 'Low',
    category: 'Beach',
    rating: 4.7
  },
  {
    id: 5,
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
    description: 'Visit the iconic Eiffel Tower, Louvre Museum, and enjoy the romantic atmosphere.',
    country: 'France',
    continent: 'Europe',
    price: 'High',
    category: 'City',
    rating: 4.6
  },
  {
    id: 6,
    name: 'Serengeti National Park, Tanzania',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80',
    description: 'Witness the incredible wildlife and the Great Migration across the savanna.',
    country: 'Tanzania',
    continent: 'Africa',
    price: 'High',
    category: 'Safari',
    rating: 4.9
  },
  {
    id: 7,
    name: 'New York City, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Experience the vibrant city life, iconic landmarks, and diverse culture.',
    country: 'USA',
    continent: 'North America',
    price: 'High',
    category: 'City',
    rating: 4.7
  },
  {
    id: 8,
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80',
    description: 'Relax in overwater bungalows and enjoy the crystal-clear turquoise waters.',
    country: 'Maldives',
    continent: 'Asia',
    price: 'High',
    category: 'Beach',
    rating: 4.9
  },
  {
    id: 9,
    name: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Admire Gaudí\'s architecture, enjoy the beaches, and experience the vibrant culture.',
    country: 'Spain',
    continent: 'Europe',
    price: 'Medium',
    category: 'City',
    rating: 4.7
  }
];

const Destinations = () => {
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [filters, setFilters] = useState({
    continent: '',
    country: '',
    price: '',
    category: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filter options
  const continents = [...new Set(destinations.map(dest => dest.continent))];
  const countries = [...new Set(destinations.map(dest => dest.country))];
  const prices = [...new Set(destinations.map(dest => dest.price))];
  const categories = [...new Set(destinations.map(dest => dest.category))];

  useEffect(() => {
    let result = destinations;

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        dest => 
          dest.name.toLowerCase().includes(searchTerm) || 
          dest.description.toLowerCase().includes(searchTerm) ||
          dest.country.toLowerCase().includes(searchTerm)
      );
    }

    // Apply dropdown filters
    if (filters.continent) {
      result = result.filter(dest => dest.continent === filters.continent);
    }
    if (filters.country) {
      result = result.filter(dest => dest.country === filters.country);
    }
    if (filters.price) {
      result = result.filter(dest => dest.price === filters.price);
    }
    if (filters.category) {
      result = result.filter(dest => dest.category === filters.category);
    }

    setFilteredDestinations(result);
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const resetFilters = () => {
    setFilters({
      continent: '',
      country: '',
      price: '',
      category: '',
      search: ''
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600 dark:bg-blue-800 transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600 opacity-90"></div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80')",
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
            Explore Our Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
          >
            Discover breathtaking locations around the world, from pristine beaches to historic cities and natural wonders.
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              Find Your Perfect Destination
            </h2>
            <div className="flex items-center">
              <div className="relative flex-grow mr-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={filters.search}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <Filter className="h-5 w-5 mr-2" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Expandable filters */}
          <div className={`bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 mb-8 transition-all duration-300 ${showFilters ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Continent
                </label>
                <select
                  name="continent"
                  value={filters.continent}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  <option value="">All Continents</option>
                  {continents.map(continent => (
                    <option key={continent} value={continent}>{continent}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Budget
                </label>
                <select
                  name="price"
                  value={filters.price}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  <option value="">All Budgets</option>
                  {prices.map(price => (
                    <option key={price} value={price}>{price}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={resetFilters}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-300"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              Showing {filteredDestinations.length} of {destinations.length} destinations
            </p>
          </div>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <motion.div
                  key={destination.id}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-colors duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center shadow-md">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        {destination.rating}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {destination.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {destination.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {destination.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="text-sm">{destination.price} Budget</span>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No destinations found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your filters or search criteria
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Browse our curated travel packages and find the perfect journey for your next adventure.
          </p>
          <a
            href="/packages"
            className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
          >
            View Travel Packages
          </a>
        </div>
      </section>
    </div>
  );
};

export default Destinations;