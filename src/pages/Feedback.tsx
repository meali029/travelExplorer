import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star,  Calendar, ThumbsUp, Send, CheckCircle, AlertCircle,MapPin } from 'lucide-react';

// Types
type FeedbackFormData = {
  name: string;
  email: string;
  destination: string;
  travelDate: string;
  rating: number;
  review: string;
  recommend: boolean;
  avatar: string;
};

type FeedbackFormErrors = {
  name?: string;
  email?: string;
  destination?: string;
  travelDate?: string;
  rating?: string;
  review?: string;
  avatar?: string;
};

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    destination: 'Santorini, Greece',
    date: '2024-04-15',
    rating: 5,
    review: 'It would be helpful to have a direct link to view the travel packages from the homepage, instead of having to go through the navigation menu. As a first-time user, I expected to see some kind of shortcut or button right away that would take me to what you’re offering.',
    recommend: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
  },
  {
    id: 2,
    name: 'Michael Chen',
    destination: 'Kyoto, Japan',
    date: '2024-03-22',
    rating: 5,
    review: 'The gallery images are nice, but it would be better if we could click on them to see a larger version. Right now, they’re a bit small and I’d like to view them in more detail.',
    recommend: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
  },
  // {
  //   id: 3,
  //   name: 'Emma Rodriguez',
  //   destination: 'Machu Picchu, Peru',
  //   date: '2024-02-10',
  //   rating: 4,
  //   review: 'The footer looks really clean and professional. I appreciated the quick links and contact info, but I think adding social media icons would make it even better. It’s the last part users see, and having those links handy would encourage more engagement.',
  //   recommend: true,
  //   avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  // },
  {
    id: 4,
    name: 'David Wilson',
    destination: 'Safari in Tanzania',
    date: '2024-01-18',
    rating: 5,
    review: 'I browsed the site on my phone and was pleasantly surprised by how responsive it is. The navbar turns into a slick hamburger menu, and all the content scales beautifully. Nothing felt squished or awkward. Clearly built with mobile users in mind!',
    recommend: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
  },
  // {
  //   id: 5,
  //   name: 'Aisha Patel',
  //   destination: 'Bali, Indonesia',
  //   date: '2023-12-05',
  //   rating: 4,
  //   review: 'The scrolling experience is smooth, and the site is visually appealing. One small suggestion: adding a "Back to Top" button would make it easier to return to the navbar after scrolling through long pages. Not a dealbreaker, but a helpful UX boost.',
  //   recommend: true,
  //   avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
  // }
];

// Popular destinations for the dropdown
const popularDestinations = [
  'Santorini, Greece',
  'Kyoto, Japan',
  'Machu Picchu, Peru',
  'Bali, Indonesia',
  'Paris, France',
  'Serengeti National Park, Tanzania',
  'New York City, USA',
  'Maldives',
  'Barcelona, Spain',
  'Tokyo, Japan',
  'Rome, Italy',
  'Cairo, Egypt',
  'Sydney, Australia',
  'Other'
];

const Feedback = () => {
  // State for form data
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    destination: '',
    travelDate: '',
    rating: 0,
    review: '',
    recommend: true,
    avatar: '' 
  });
  
  const [errors, setErrors] = useState<FeedbackFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [displayedTestimonials, setDisplayedTestimonials] = useState(testimonials);

  // Filter testimonials based on rating
  useEffect(() => {
    if (filter === 'all') {
      setDisplayedTestimonials(testimonials);
    } else {
      const rating = parseInt(filter);
      setDisplayedTestimonials(testimonials.filter(t => t.rating === rating));
    }
  }, [filter]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FeedbackFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle rating selection
  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: undefined }));
    }
  };

  // Handle recommend toggle
  const handleRecommendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, recommend: e.target.checked }));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FeedbackFormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Destination validation
    if (!formData.destination) {
      newErrors.destination = 'Please select a destination';
    }
    
    // Travel date validation
    if (!formData.travelDate) {
      newErrors.travelDate = 'Travel date is required';
    }
    
    // Rating validation
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    // Review validation
    if (!formData.review.trim()) {
      newErrors.review = 'Review is required';
    } else if (formData.review.trim().length < 20) {
      newErrors.review = 'Review should be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  useEffect(() => {
    const savedTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    setDisplayedTestimonials([...testimonials, ...savedTestimonials]); // Merge existing and saved testimonials
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
  
      // Create new review object
      const newReview = {
        id: Date.now(), // Use a unique timestamp ID
        name: formData.name,
        destination: formData.destination,
        date: new Date().toISOString().split('T')[0],
        rating: formData.rating,
        review: formData.review,
        recommend: formData.recommend,
        avatar: formData.avatar ||  'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' // New avatar URL
      };
  
      // Retrieve existing testimonials from localStorage
      const savedTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
  
      // Update testimonials list
      const updatedTestimonials = [newReview, ...savedTestimonials];
      setDisplayedTestimonials([...testimonials, ...updatedTestimonials]); // Ensure past testimonials remain
      localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
  
      setSubmitStatus('success');
      setStatusMessage('Thank you for your feedback! Your review has been submitted successfully.');
      setFormData({
        name: '',
        email: '',
        destination: '',
        travelDate: '',
        rating: 0,
        review: '',
        recommend: true,
        avatar: '' // New avatar URL
      });
  
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
      setStatusMessage('There was an error submitting your feedback. Please try again later.');
  
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600 dark:bg-blue-800 transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600 opacity-90"></div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
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
            Share Your Travel Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
          >
            Your feedback helps us improve and inspires other travelers to create their own adventures
          </motion.p>
        </div>
      </section>

      {/* Feedback Form and Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Feedback Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Submit Your Feedback
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                We value your opinion and would love to hear about your travel experience with us. Your feedback helps us improve our services and create even better travel experiences.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.name 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.email 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Destination Visited *
                    </label>
                    <select
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.destination 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
                    >
                      <option value="">Select a destination</option>
                      {popularDestinations.map(destination => (
                        <option key={destination} value={destination}>{destination}</option>
                      ))}
                    </select>
                    {errors.destination && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.destination}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      id="travelDate"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.travelDate 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
                    />
                    {errors.travelDate && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.travelDate}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rate Your Experience *
                  </label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= formData.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : ''}
                    </span>
                  </div>
                  {errors.rating && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.rating}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.review 
                        ? 'border-red-500 dark:border-red-400' 
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
                    placeholder="Please share your experience, what you enjoyed, and any suggestions for improvement..."
                  ></textarea>
                  {errors.review && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.review}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="recommend"
                    checked={formData.recommend}
                    onChange={handleRecommendChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="recommend" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    I would recommend TravelExplorer to friends and family
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
                      isSubmitting 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </button>
                </div>

                {/* Form submission status */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      submitStatus === 'success' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                    }`}
                  >
                    <div className="flex items-start">
                      {submitStatus === 'success' ? (
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      )}
                      <p>{statusMessage}</p>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="sticky top-24">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Traveler Reviews
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Read what other travelers have to say about their experiences with TravelExplorer.
                </p>

                {/* Filter */}
                <div className="mb-6">
                  <label htmlFor="ratingFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Filter by Rating
                  </label>
                  <select
                    id="ratingFilter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>

                {/* Testimonials list */}
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {displayedTestimonials.length > 0 ? (
                    displayedTestimonials.map((testimonial) => (
                      <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-md transition-colors duration-300"
                      >
                        <div className="flex items-center mb-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {testimonial.name}
                            </h4>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{testimonial.destination}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {new Date(testimonial.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                          "{testimonial.review}"
                        </p>
                        
                        {testimonial.recommend && (
                          <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>Recommends TravelExplorer</span>
                          </div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="text-gray-500 dark:text-gray-400">
                        No reviews found with this rating.
                      </p>
                      <button
                        onClick={() => setFilter('all')}
                        className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View all reviews
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Traveler Satisfaction
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're proud of the experiences we create for our travelers. Here's what our satisfaction numbers say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center transition-colors duration-300"
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">98%</div>
              <p className="text-gray-600 dark:text-gray-300">Customer Satisfaction</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center transition-colors duration-300"
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.8</div>
              <p className="text-gray-600 dark:text-gray-300">Average Rating</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center transition-colors duration-300"
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%</div>
              <p className="text-gray-600 dark:text-gray-300">Would Recommend</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center transition-colors duration-300"
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">87%</div>
              <p className="text-gray-600 dark:text-gray-300">Repeat Customers</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create Your Own Travel Story?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Browse our destinations and packages to start planning your next unforgettable journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/destinations"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Explore Destinations
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

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        @media (prefers-color-scheme: dark) {
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #2d3748;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4a5568;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #718096;
          }
        }
      `}</style>
    </div>
  );
};

export default Feedback;