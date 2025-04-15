import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    title: 'Top 10 Beaches to Visit in 2025',
    date: 'April 15, 2025',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    excerpt: 'Explore the world’s most stunning coastlines, crystal-clear waters, and golden sands for the perfect beach vacation.',
  },
  {
    id: 2,
    title: 'Why Solo Travel is Trending Now',
    date: 'March 28, 2025',
    image: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef',
    excerpt: 'Learn the benefits of traveling alone, building confidence, and experiencing freedom like never before.',
  },
  {
    id: 3,
    title: 'A Foodie’s Guide to Italy',
    date: 'March 10, 2025',
    image: 'https://www.foodies.pk/wp-content/uploads/2020/04/italian-cuisine-italian-food-scaled.jpeg',
    excerpt: 'Taste your way through Italy’s best regional cuisines, from Rome’s carbonara to Sicily’s cannoli.',
  },
  {
    id: 4,
    title: 'Backpacking Through Southeast Asia',
    date: 'February 22, 2025',
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    excerpt: 'Budget-friendly tips and hidden gems across Thailand, Vietnam, Cambodia, and Laos.',
  },
  {
    id: 5,
    title: 'Ultimate Travel Essentials Checklist',
    date: 'February 05, 2025',
    image: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6',
    excerpt: 'Never forget a thing with this comprehensive list of travel essentials for any trip type or destination.',
  },
  {
    id: 6,
    title: 'The Most Instagrammable Spots in Europe',
    date: 'January 25, 2025',
    image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92',
    excerpt: 'Capture stunning photos and create unforgettable memories in Europe’s most picturesque locations.',
  },
];

const Blog = () => {
  return (
    <>
      {/* Travel Blog Section */}
      <section className="relative py-20 bg-blue-600 dark:bg-blue-800 transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600 opacity-90"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://shellycalcagno.com/wp-content/uploads/2018/07/writing.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'overlay',
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Travel Blog
          </motion.h2>
          <p className="text-white/90 mb-12 max-w-2xl mx-auto">
            Get inspired with travel stories, tips, and destination guides from around the globe.
          </p>
        </div>
      </section>

      {/* Blog Cards Section */}
      <div className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-colors duration-300"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{blog.date}</p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{blog.excerpt}</p>
                  <Link
                    to={`/blogdetail/${blog.id}`}
                    className="inline-block text-center py-3 px-6 bg-blue-600 dark:bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-300"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
