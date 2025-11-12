"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo, memo } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image: string | null;
  author: string | null;
  likes: number;
  views: number;
  createdAt: string;
  tumblineQuestion?: string | null;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      // Prefetch the API route
      const response = await fetch("/api/blogs/public", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Calculate reading time (average 200 words per minute)
  const calculateReadingTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Format date consistently
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Get categories (you can enhance this with actual category field later)
  const getCategories = (blog: Blog) => {
    // Use tumblineQuestion or default categories
    if (blog.tumblineQuestion) {
      return ["Mental Health", "Wellness"];
    }
    return ["Mental Health", "Wellness"];
  };

  // Memoize calculated values for performance
  const allBlogs = useMemo(() => blogs, [blogs]);

  // Memoized Blog Card Component for better performance
  const BlogCard = memo(({ blog, calculateReadingTime, formatDate, getCategories }: {
    blog: Blog;
    calculateReadingTime: (content: string) => string;
    formatDate: (dateString: string) => string;
    getCategories: (blog: Blog) => string[];
  }) => (
    <Link href={`/blogs/${blog.id}`} prefetch={true} className="h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300 h-full flex flex-col hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden">
          {blog.image ? (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-4xl">📝</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {getCategories(blog).slice(0, 2).map((cat, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded uppercase tracking-wide"
                style={{fontFamily: 'Poppins, sans-serif'}}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Tumbline Question */}
          {blog.tumblineQuestion && (
            <div className="mb-3 p-3 bg-orange-50 rounded border-l-4 border-orange-500">
              <p className="text-xs font-semibold text-orange-900 italic line-clamp-2 leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                "{blog.tumblineQuestion}"
              </p>
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-snug" style={{fontFamily: 'Poppins, sans-serif'}}>
            {blog.title}
          </h3>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="mt-auto pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">
                      {blog.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 leading-tight" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {blog.author}
                    </p>
                    <p className="text-xs text-gray-600 leading-tight">{formatDate(blog.createdAt)}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{calculateReadingTime(blog.content)}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{blog.views || 0} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ));
  
  BlogCard.displayName = 'BlogCard';

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Component */}
      <Navigation currentPath="/blogs" />
      
      {/* All Articles Section */}
      {loading ? (
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        </section>
      ) : allBlogs.length > 0 ? (
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>
                You may be interested
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
                LATEST ARTICLES
              </h2>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  calculateReadingTime={calculateReadingTime}
                  formatDate={formatDate}
                  getCategories={getCategories}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500 text-xl">No articles available yet. Check back soon!</p>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
