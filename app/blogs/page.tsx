"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo, memo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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

  // Amaha Style Featured Card
  const FeaturedArticleCard = memo(({ blog }: { blog: Blog }) => (
    <Link href={`/blogs/${blog.id}`} className="group block bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <div className="relative w-full h-[280px] md:h-[340px] overflow-hidden bg-[#f0ede6] shrink-0 p-4">
        {/* Soft inner rounded image like the reference */}
        <div className="relative w-full h-full rounded-[16px] overflow-hidden">
          {blog.image ? (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[#e8e4db] flex items-center justify-center">
              <span className="text-gray-400 text-5xl">📝</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Article</span>
          <span className="text-gray-300">•</span>
          <span className="px-3 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 rounded-md tracking-wide">{getCategories(blog)[0]}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors leading-[1.25]">
          {blog.title}
        </h3>
        <p className="text-gray-500 text-base line-clamp-2 leading-relaxed">
          {blog.excerpt || "Explore insights and practical strategies to understand and manage mental health concerns effectively..."}
        </p>
      </div>
    </Link>
  ));

  FeaturedArticleCard.displayName = 'FeaturedArticleCard';

  // Amaha Style Compact Horizontal Card
  const CompactHorizontalCard = memo(({ blog, showReadingTime = false }: { blog: Blog, showReadingTime?: boolean }) => (
    <Link href={`/blogs/${blog.id}`} className="group flex bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow duration-300 p-4 items-center gap-5 h-full">
      <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-[16px] overflow-hidden bg-[#e8e4db] shrink-0">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="150px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400 text-3xl">📝</span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 py-1">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Article</span>
          <span className="text-gray-300">•</span>
          {showReadingTime ? (
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">ARTICLE | {calculateReadingTime(blog.content).toUpperCase()}</span>
          ) : (
            <span className="px-2 py-0.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 rounded-md tracking-wide">{getCategories(blog)[0]}</span>
          )}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors leading-snug line-clamp-3 pb-1">
          {blog.title}
        </h3>
      </div>
    </Link>
  ));

  CompactHorizontalCard.displayName = 'CompactHorizontalCard';

  return (
    <div className="min-h-screen bg-[#FFF4EF] flex flex-col font-sans">
      <Navigation currentPath="/blogs" />

      <main className="flex-grow pt-8 pb-24">

        {/* Amaha Style Header Area */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto mt-12 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <h1 className="text-3xl md:text-[34px] font-bold text-gray-800 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Your Go-To Mental Well-being Library
          </h1>

          <div className="relative w-full md:w-[320px]">
            <input
              type="text"
              placeholder="Search resources"
              className="w-full py-3.5 px-6 rounded-xl border-none shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 text-gray-700 bg-white placeholder-gray-400"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : allBlogs.length > 0 ? (
          <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto">

            {/* Section 1: Main Feature Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
              {/* Left Featured Item */}
              {allBlogs.length > 0 && (
                <div className="lg:col-span-7">
                  <FeaturedArticleCard blog={allBlogs[0]} />
                </div>
              )}

              {/* Right Stacked Items */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {allBlogs.length > 1 && (
                  <div className="flex-1">
                    <CompactHorizontalCard blog={allBlogs[1]} />
                  </div>
                )}
                {allBlogs.length > 2 && (
                  <div className="flex-1">
                    <CompactHorizontalCard blog={allBlogs[2]} />
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: "Find out what others are reading" */}
            {allBlogs.length > 3 && (
              <div className="mb-20">
                <div className="mb-8">
                  <h2 className="text-[28px] font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Find out what others are reading
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Explore the most-read articles for evidence based insight into the mental health challenges you're facing
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Reuse the same 1-large 2-small pattern if we have enough blogs, otherwise use compact cards */}
                  {allBlogs.length > 3 && (
                    <div className="lg:col-span-4 flex flex-col gap-6">
                      <CompactHorizontalCard blog={allBlogs[3]} showReadingTime={true} />
                      {allBlogs.length > 4 && <CompactHorizontalCard blog={allBlogs[4]} showReadingTime={true} />}
                    </div>
                  )}

                  {allBlogs.length > 5 && (
                    <div className="lg:col-span-8 flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CompactHorizontalCard blog={allBlogs[5]} showReadingTime={true} />
                        {allBlogs.length > 6 && <CompactHorizontalCard blog={allBlogs[6]} showReadingTime={true} />}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-10">
                  <button className="px-8 py-3 bg-[#e86c4c] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-orange-600 transition-colors shadow-sm">
                    View All Articles
                  </button>
                </div>
              </div>
            )}
          </section>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl font-medium">No articles available yet. Check back soon!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
