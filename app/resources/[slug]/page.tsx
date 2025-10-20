"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import ReactMarkdown from 'react-markdown';

interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  type: string;
  url?: string;
  fileUrl?: string;
  category?: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  views: number;
  author?: string;
  createdAt: string;
}

export default function ResourceDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [resource, setResource] = useState<Resource | null>(null);
  const [relatedResources, setRelatedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchResource();
      fetchRelatedResources();
    }
  }, [slug]);

  const fetchResource = async () => {
    try {
      const response = await fetch(`/api/resources/slug/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setResource(data);
        // Increment view count
        await fetch(`/api/resources/slug/${slug}/view`, { method: 'POST' });
      } else {
        setError("Resource not found");
      }
    } catch (error) {
      console.error("Error fetching resource:", error);
      setError("Failed to load resource");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedResources = async () => {
    try {
      const response = await fetch('/api/resources/public');
      if (response.ok) {
        const data = await response.json();
        // Filter out current resource and limit to 6
        const related = data.filter((r: Resource) => r.slug !== slug).slice(0, 6);
        setRelatedResources(related);
      }
    } catch (error) {
      console.error("Error fetching related resources:", error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return "🎥";
      case "link": return "🔗";
      case "document": return "📄";
      case "reference": return "📚";
      case "material": return "📋";
      default: return "📄";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-red-100 text-red-800";
      case "link": return "bg-blue-100 text-blue-800";
      case "document": return "bg-green-100 text-green-800";
      case "reference": return "bg-purple-100 text-purple-800";
      case "material": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="min-h-screen bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resource Not Found</h1>
          <p className="text-gray-600 mb-8">{error || "The resource you're looking for doesn't exist."}</p>
          <Link 
            href="/resources"
            className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-orange-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-lg font-bold text-gray-900 hidden sm:block">Attrangi</span>
            </Link>
            
            <Link 
              href="/resources"
              className="flex items-center text-gray-600 hover:text-orange-600 font-semibold text-sm transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Resources
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Resource Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                </div>
                {resource.featured && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-500 text-white">
                    ⭐ Featured
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{fontFamily: 'Poppins, sans-serif'}}>
                {resource.title}
              </h1>

              <p className="text-base text-gray-600 mb-4 leading-relaxed">
                {resource.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pb-4 mb-4 border-b border-gray-200">
                {resource.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {resource.category}
                  </span>
                )}
                <span className="inline-flex items-center text-gray-500 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {resource.views} views
                </span>
                {resource.author && (
                  <span className="inline-flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {resource.author}
                  </span>
                )}
              </div>

              {resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => (
                      <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-3 pb-2 border-b border-gray-200 first:mt-0" {...props} />
                    ),
                    h2: ({node, ...props}) => (
                      <h2 className="text-xl font-bold text-orange-600 mt-5 mb-2" {...props} />
                    ),
                    h3: ({node, ...props}) => (
                      <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2" {...props} />
                    ),
                    p: ({node, ...props}) => (
                      <p className="text-sm text-gray-700 leading-relaxed mb-3" {...props} />
                    ),
                    ul: ({node, ...props}) => (
                      <ul className="list-disc list-inside space-y-1 mb-3 text-sm" {...props} />
                    ),
                    ol: ({node, ...props}) => (
                      <ol className="list-decimal list-inside space-y-1 mb-3 text-sm" {...props} />
                    ),
                    li: ({node, ...props}) => (
                      <li className="text-sm text-gray-700 leading-relaxed" {...props} />
                    ),
                    a: ({node, ...props}) => (
                      <a className="text-orange-600 hover:text-orange-700 underline" target="_blank" rel="noopener noreferrer" {...props} />
                    ),
                    blockquote: ({node, ...props}) => (
                      <blockquote className="border-l-4 border-orange-500 bg-orange-50 pl-4 py-2 my-3 italic text-sm text-gray-700" {...props} />
                    ),
                    hr: ({node, ...props}) => (
                      <hr className="my-6 border-t border-gray-200" {...props} />
                    ),
                    strong: ({node, ...props}) => (
                      <strong className="font-semibold text-gray-900" {...props} />
                    ),
                  }}
                >
                  {resource.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Resource Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Resource Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-sm font-semibold text-gray-900">{resource.category}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm font-semibold text-gray-900 capitalize">{resource.type}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Views</p>
                    <p className="text-sm font-semibold text-gray-900">{resource.views}</p>
                  </div>
                </div>

                {resource.author && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Author</p>
                      <p className="text-sm font-semibold text-gray-900">{resource.author}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Resources */}
            {relatedResources.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Resources</h3>
                
                <div className="space-y-3">
                  {relatedResources.map((related) => (
                    <Link
                      key={related.id}
                      href={`/resources/${related.slug}`}
                      className="block p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all group"
                    >
                      <div className="flex items-start space-x-2 mb-2">
                        <span className="text-lg">{getTypeIcon(related.type)}</span>
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 line-clamp-2">
                          {related.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {related.description}
                      </p>
                      {related.category && (
                        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {related.category}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                <Link 
                  href="/resources"
                  className="mt-4 block text-center text-sm font-semibold text-orange-600 hover:text-orange-700"
                >
                  View All Resources →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

