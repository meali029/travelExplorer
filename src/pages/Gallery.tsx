import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Search, Filter} from 'lucide-react';

// Gallery data
const galleryItems = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Amalfi Coast, Italy',
    caption: 'The stunning Amalfi Coast with its colorful buildings perched on cliffs',
    category: 'Coastal',
    featured: true
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Bali, Indonesia',
    caption: 'Lush green rice terraces in Bali during sunset',
    category: 'Nature',
    featured: true
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1986&q=80',
    location: 'Cinque Terre, Italy',
    caption: 'Colorful houses of Cinque Terre overlooking the Mediterranean Sea',
    category: 'Coastal',
    featured: false
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Santorini, Greece',
    caption: 'White-washed buildings with blue domes in Santorini',
    category: 'Architecture',
    featured: true
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Swiss Alps, Switzerland',
    caption: 'Breathtaking view of the Swiss Alps during autumn',
    category: 'Mountains',
    featured: false
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Kyoto, Japan',
    caption: 'Traditional Japanese temple surrounded by cherry blossoms',
    category: 'Cultural',
    featured: true
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Petra, Jordan',
    caption: 'The ancient city of Petra carved into rose-colored stone',
    category: 'Historical',
    featured: false
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1975&q=80',
    location: 'New York City, USA',
    caption: 'Skyline of New York City at night with illuminated skyscrapers',
    category: 'Urban',
    featured: false
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Great Barrier Reef, Australia',
    caption: 'Vibrant coral formations in the Great Barrier Reef',
    category: 'Underwater',
    featured: true
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1565551069968-7d2322e2d4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Serengeti National Park, Tanzania',
    caption: 'Lions resting on the savanna during sunset in Serengeti',
    category: 'Wildlife',
    featured: false
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80',
    location: 'Barcelona, Spain',
    caption: 'Gaudi\'s colorful mosaic work at Park Güell in Barcelona',
    category: 'Architecture',
    featured: false
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Maldives',
    caption: 'Overwater bungalows in the crystal-clear waters of the Maldives',
    category: 'Coastal',
    featured: true
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    featured: false
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = ['All', ...new Set(galleryItems.map(item => item.category))];

  useEffect(() => {
    let result = galleryItems;

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        item => 
          item.location.toLowerCase().includes(searchTerm) || 
          item.caption.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== 'All') {
      result = result.filter(item => item.category === filters.category);
    }

    // Apply featured filter
    if (filters.featured) {
      result = result.filter(item => item.featured);
    }

    setFilteredItems(result);
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, featured: e.target.checked }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      search: '',
      featured: false
    });
  };

  const openLightbox = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const selectedItem = selectedImage !== null 
    ? galleryItems.find(item => item.id === selectedImage) 
    : null;

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600 dark:bg-blue-800 transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600 opacity-90"></div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')",
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
            Travel Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
          >
            Explore our collection of stunning travel photography from around the world
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              Explore Our Travel Photos
            </h2>
            <div className="flex items-center">
              <div className="relative flex-grow mr-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search locations..."
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    category !== 'All' && <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={filters.featured}
                  onChange={handleFeaturedChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Show only featured images
                </label>
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
              Showing {filteredItems.length} of {galleryItems.length} photos
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                  onClick={() => openLightbox(item.id)}
                >
                  <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {item.featured && (
                      <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center mb-1">
                        <MapPin className="h-4 w-4 text-blue-400 mr-1" />
                        <p className="text-sm font-medium">{item.location}</p>
                      </div>
                      <p className="text-xs text-gray-200">{item.caption}</p>
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
                No photos found
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

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none z-10"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>
            
            <div 
              className="relative max-w-5xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedItem.src}
                alt={selectedItem.caption}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
                <div className="flex items-center mb-1">
                  <MapPin className="h-5 w-5 text-blue-400 mr-2" />
                  <h3 className="text-lg font-semibold">{selectedItem.location}</h3>
                </div>
                <p className="text-gray-300">{selectedItem.caption}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create Your Own Travel Memories?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Explore our travel packages and start planning your next adventure today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/packages"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              View Travel Packages
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;