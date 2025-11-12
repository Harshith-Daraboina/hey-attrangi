"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
  updatedAt: string;
  tumblineQuestion?: string | null;
  tumblineLine?: string | null;
  mainContent?: string | null;
  disorderRelation?: string | null;
  question?: string | null;
  subquestions?: string[];
  summary?: string | null;
  sourceLink?: string | null;
}

interface Review {
  id: string;
  name: string;
  email: string;
  comment: string;
  rating: number;
  createdAt: string;
}

interface RecentBlog {
  id: string;
  title: string;
  slug: string;
  image: string | null;
  createdAt: string;
}

export default function BlogIdPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<RecentBlog[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Review form state
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    comment: "",
    rating: 5,
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  // Format date consistently to avoid hydration issues
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  useEffect(() => {
    if (id) {
      // Fetch blog and recent blogs in parallel for faster loading
      Promise.all([fetchBlog(), fetchRecentBlogs()]).finally(() => {
        setLoading(false);
      });
      
      // Increment view count asynchronously (non-blocking) - using ID
      fetch(`/api/blogs/${id}/view`, {
        method: "POST",
      }).catch(err => console.error("Error incrementing views:", err));
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
        setReviews(data.reviews || []);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      const response = await fetch("/api/blogs/recent");
      if (response.ok) {
        const data = await response.json();
        setRecentBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
    }
  };

  const handleLike = async () => {
    if (!blog || liked) return;
    
    try {
      const response = await fetch(`/api/blogs/${id}/like`, {
        method: "POST",
      });
      
      if (response.ok) {
        setBlog({ ...blog, likes: blog.likes + 1 });
        setLiked(true);
      }
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;
    
    setSubmittingReview(true);
    try {
      const response = await fetch(`/api/blogs/${id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...reviewForm,
          blogId: blog.id,
        }),
      });
      
      if (response.ok) {
        const newReview = await response.json();
        setReviews([newReview, ...reviews]);
        setReviewForm({ name: "", email: "", comment: "", rating: 5 });
        setShowReviewForm(false);
        alert("Review submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h1>
          <Link href="/blogs" className="text-orange-600 hover:text-orange-700">
            ← Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPath={`/blogs/${id}`} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Featured Image */}
              {blog.image && (
                <div className="relative h-96 w-full">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="p-8 md:p-12">
                {/* Tumbline Section */}
                {blog.tumblineQuestion && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border-l-4 border-orange-500">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {blog.tumblineQuestion}
                    </h2>
                    {blog.tumblineLine && (
                      <p className="text-lg text-gray-700 italic" style={{fontFamily: 'Poppins, sans-serif'}}>
                        {blog.tumblineLine}
                      </p>
                    )}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Poppins, sans-serif'}}>
                  {blog.title}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
                  {blog.author && <span className="font-medium text-gray-900">By {blog.author}</span>}
                  <span>•</span>
                  <span>{formatDate(blog.createdAt)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {blog.views || 0} views
                  </span>
                </div>

                {/* Main Content */}
                {blog.mainContent && (
                  <div className="mb-8">
                    <div className="prose prose-lg max-w-none">
                      <div className="text-gray-900 leading-relaxed text-lg whitespace-pre-wrap" style={{fontFamily: 'Poppins, sans-serif'}}>
                        {blog.mainContent.split('\n').map((paragraph, idx) => (
                          paragraph.trim() && (
                            <p key={idx} className="mb-4 text-gray-900">
                              {paragraph}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Images */}
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop"
                      alt="Mental health support"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop"
                      alt="Connection and wellness"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Disorder Relation */}
                {blog.disorderRelation && (
                  <div className="mb-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                      Relation to Mental Health Conditions
                    </h3>
                    <div className="text-gray-900 leading-relaxed whitespace-pre-wrap" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {blog.disorderRelation.split('\n').map((paragraph, idx) => (
                        paragraph.trim() && (
                          <p key={idx} className="mb-3 text-gray-900">
                            {paragraph}
                          </p>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Main Question */}
                {blog.question && (
                  <div className="mb-8 p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                      Reflection Question
                    </h3>
                    <p className="text-xl text-gray-900 font-semibold mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {blog.question}
                    </p>
                    
                    {/* Subquestions */}
                    {blog.subquestions && blog.subquestions.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                          Consider these questions:
                        </h4>
                        <ul className="space-y-3">
                          {blog.subquestions.map((subq, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-sm font-bold">{idx + 1}</span>
                              </div>
                              <p className="text-gray-900 text-lg flex-1" style={{fontFamily: 'Poppins, sans-serif'}}>
                                {subq}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Summary */}
                {blog.summary && (
                  <div className="mb-8 p-6 bg-green-50 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                      Summary
                    </h3>
                    <p className="text-gray-900 leading-relaxed text-lg" style={{fontFamily: 'Poppins, sans-serif'}}>
                      {blog.summary}
                    </p>
                  </div>
                )}

                {/* Source Link */}
                {blog.sourceLink && (
                  <div className="mb-8 p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Source:</p>
                    <a 
                      href={blog.sourceLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-700 font-medium underline"
                    >
                      {blog.sourceLink}
                    </a>
                  </div>
                )}

                {/* Legacy Content (if no structured content) */}
                {!blog.mainContent && blog.content && (
                  <div className="mb-8">
                    <div className="prose prose-lg max-w-none">
                      <div className="text-gray-900 leading-relaxed text-lg whitespace-pre-wrap" style={{fontFamily: 'Poppins, sans-serif'}}>
                        {blog.content}
                      </div>
                    </div>
                  </div>
                )}

                {/* Like and Share Buttons */}
                <div className="flex items-center gap-4 py-6 border-t border-gray-200">
                  <button
                    onClick={handleLike}
                    disabled={liked}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      liked
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-700 text-white"
                    }`}
                    style={{fontFamily: 'Poppins, sans-serif'}}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    {liked ? "Liked" : "Like"} ({blog.likes})
                  </button>

                  <div className="flex gap-3">
                    <button className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    <button className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Recent Posts */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                Recent Posts
              </h3>
              
              {recentBlogs.length === 0 ? (
                <p className="text-gray-500 text-sm">No recent posts available.</p>
              ) : (
                <div className="space-y-4">
                  {recentBlogs.map((recentBlog) => (
                    <Link
                      key={recentBlog.id}
                      href={`/blogs/${recentBlog.id}`}
                      className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg overflow-hidden">
                        {recentBlog.image ? (
                          <Image
                            src={recentBlog.image}
                            alt={recentBlog.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-2xl">📝</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 line-clamp-2 text-sm mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>
                          {recentBlog.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {formatDate(recentBlog.createdAt)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews Section - Moved to Sidebar */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
                  Reviews ({reviews.length})
                </h3>
                {!showReviewForm && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    + Add Review
                  </button>
                )}
              </div>

              {/* Review Form - Collapsible */}
              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Leave a Review</h4>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="space-y-3 mb-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={reviewForm.email}
                      onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating: {reviewForm.rating} / 5
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <textarea
                    placeholder="Your Review"
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-3 text-gray-900"
                  />

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400"
                  >
                    {submittingReview ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-4 text-sm">No reviews yet. Be the first to review!</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-1">{review.comment}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

