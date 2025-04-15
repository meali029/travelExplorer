import { useParams, useNavigate } from 'react-router-dom';  // Add useNavigate
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from './BlogData';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate function
  const blog = blogPosts.find(post => post.id === parseInt(id));
  const [notification, setNotification] = useState('');

  const handleSubscribe = () => {
    setNotification('Thank you for subscribing!');
    
    // Hide the notification after 3 seconds
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const handleGoBack = () => {
    navigate('/blog'); // Navigate back to the blog listing page
  };

  if (!blog) {
    return (
      <div className="text-center py-20 text-red-500 text-xl font-semibold">
        Blog not found 😕
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Notification */}
      {notification && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg z-10">
          <p>{notification}</p>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-6"
      >
        &larr; Back to Blog
      </button>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 transition-all duration-300">
        {blog.title}
      </h1>

      {/* Date */}
      <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
        <p>{blog.date}</p>
      </div>

      {/* Image */}
      <div className="overflow-hidden rounded-2xl shadow-lg mb-10">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover transform hover:scale-105 transition duration-500 rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg text-gray-900 dark:text-white dark:prose-invert max-w-none mb-16 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg leading-relaxed text-justify space-x-4">
        {blog.content.map((paragraph, index) => (
          <ReactMarkdown key={index}>{paragraph}</ReactMarkdown>
        ))}
      </div>

      {/* Tags or Categories */}
      <div className="flex flex-wrap gap-2 mb-10">
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Travel</span>
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Lifestyle</span>
        <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">2025 Picks</span>
      </div>

      {/* Call to action */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 p-8 rounded-xl text-center shadow-md">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Enjoyed the read?</h2>
        <p className="text-gray-800 dark:text-gray-200 mb-6">Subscribe to get the latest travel tips and blogs delivered right to your inbox.</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
