"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs/public");
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

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Navigation Component */}
      <Navigation currentPath="/blogs" />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
              Mental Health Insights
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert articles, research-backed tips, and practical guidance for your mental health journey.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{blogs.length}+</div>
              <div className="text-xs text-gray-600">Articles</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">Expert</div>
              <div className="text-xs text-gray-600">Written</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">Free</div>
              <div className="text-xs text-gray-600">Access</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
              <div className="text-xs text-gray-600">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : blogs.length === 0 ? (
            <div className="text-center py-20">
          <p className="text-gray-500 text-xl">No insights available yet. Check back soon!</p>
            </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
                  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 h-full">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {blog.title}
                    </h2>
                {blog.excerpt && (
                      <p className="text-gray-600 mb-4 leading-relaxed">{blog.excerpt}</p>
                )}
                <div className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </div>
                </Link>
            ))}
          </div>
        )}
      </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}