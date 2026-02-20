"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  type: string;
  url?: string;
  fileUrl?: string;
  category?: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  views: number;
  createdAt: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch("/api/resources/public");
      if (response.ok) {
        const data = await response.json();
        setResources(data);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
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

  const filteredResources = resources.filter(resource => {
    const typeMatch = selectedType === "all" || resource.type === selectedType;
    const categoryMatch = selectedCategory === "all" || resource.category === selectedCategory;
    return typeMatch && categoryMatch;
  });

  const categories = Array.from(new Set(resources.map(r => r.category).filter(Boolean)));
  const types = Array.from(new Set(resources.map(r => r.type)));

  // Amaha Style Featured Resource Card
  const FeaturedResourceCard = ({ resource }: { resource: Resource }) => (
    <Link href={`/resources/${resource.slug}`} className="group block bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <div className="relative w-full h-[280px] md:h-[340px] overflow-hidden bg-[#f0ede6] shrink-0 p-4">
        <div className="relative w-full h-full rounded-[16px] overflow-hidden">
          {resource.thumbnail ? (
            <img
              src={resource.thumbnail}
              alt={resource.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-[#e8e4db] flex items-center justify-center">
              <span className="text-gray-400 text-5xl">{getTypeIcon(resource.type)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{resource.type}</span>
          {resource.category && (
            <>
              <span className="text-gray-300">•</span>
              <span className={`px-3 py-1 text-[11px] font-semibold rounded-md tracking-wide ${getTypeColor(resource.type)}`}>
                {resource.category}
              </span>
            </>
          )}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors leading-[1.25]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {resource.title}
        </h3>
        <p className="text-gray-500 text-base line-clamp-2 leading-relaxed">
          {resource.description}
        </p>
      </div>
    </Link>
  );

  // Amaha Style Compact Resource Card
  const CompactResourceCard = ({ resource }: { resource: Resource }) => (
    <Link href={`/resources/${resource.slug}`} className="group flex bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow duration-300 p-4 items-center gap-5 h-full">
      <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-[16px] overflow-hidden bg-[#e8e4db] shrink-0">
        {resource.thumbnail ? (
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400 text-3xl">{getTypeIcon(resource.type)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 py-1">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{resource.type}</span>
          {resource.category && (
            <>
              <span className="text-gray-300">•</span>
              <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md tracking-wide ${getTypeColor(resource.type)}`}>
                {resource.category}
              </span>
            </>
          )}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors leading-snug line-clamp-3 pb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {resource.title}
        </h3>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-[#FFF4EF] flex flex-col font-sans">
      <Navigation currentPath="/resources" />

      <main className="flex-grow pt-8 pb-24">

        {/* Amaha Style Header Area & Filters */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto mt-12 mb-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <h1 className="text-3xl md:text-[34px] font-bold text-gray-800 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Your Go-To Mental Well-being Resources
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="py-3.5 px-4 rounded-xl border-none shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 text-gray-700 bg-white"
              >
                <option value="all">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="py-3.5 px-4 rounded-xl border-none shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 text-gray-700 bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : filteredResources.length === 0 ? (
          <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto">
            <div className="text-center py-20 bg-white rounded-[24px] shadow-sm">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later for new content.</p>
            </div>
          </section>
        ) : (
          <section className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto">

            {/* Section 1: Main Feature Grid (Top 3 Items) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
              {/* Left Featured Item */}
              {filteredResources.length > 0 && (
                <div className="lg:col-span-7">
                  <FeaturedResourceCard resource={filteredResources[0]} />
                </div>
              )}

              {/* Right Stacked Items */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {filteredResources.length > 1 && (
                  <div className="flex-1">
                    <CompactResourceCard resource={filteredResources[1]} />
                  </div>
                )}
                {filteredResources.length > 2 && (
                  <div className="flex-1">
                    <CompactResourceCard resource={filteredResources[2]} />
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: "Find more resources" */}
            {filteredResources.length > 3 && (
              <div className="mb-20">
                <div className="mb-8">
                  <h2 className="text-[28px] font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Find more resources
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Explore curated materials, videos, and documents to support your journey
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Reuse the same 1-large 2-small pattern if we have enough resources, otherwise use compact cards */}
                  {filteredResources.length > 3 && (
                    <div className="lg:col-span-4 flex flex-col gap-6">
                      <CompactResourceCard resource={filteredResources[3]} />
                      {filteredResources.length > 4 && <CompactResourceCard resource={filteredResources[4]} />}
                    </div>
                  )}

                  {filteredResources.length > 5 && (
                    <div className="lg:col-span-8 flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CompactResourceCard resource={filteredResources[5]} />
                        {filteredResources.length > 6 && <CompactResourceCard resource={filteredResources[6]} />}
                      </div>
                    </div>
                  )}
                </div>

                {filteredResources.length > 7 && (
                  <div className="flex justify-center mt-10">
                    <button className="px-8 py-3 bg-[#e86c4c] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-orange-600 transition-colors shadow-sm">
                      View All Resources
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
