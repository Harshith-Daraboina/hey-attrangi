"use client";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function AidsPage() {
  const aids = [
    {
      id: 1,
      title: "Crisis Support",
      description: "24/7 emergency mental health support and crisis intervention",
      icon: "🚨",
      resources: [
        "National Suicide Prevention Lifeline: 988",
        "Crisis Text Line: Text HOME to 741741",
        "Emergency Room Locator",
        "Crisis Chat Support"
      ]
    },
    {
      id: 2,
      title: "Therapy Resources",
      description: "Professional therapy services and mental health counseling",
      icon: "🧠",
      resources: [
        "Find Local Therapists",
        "Online Therapy Platforms",
        "Group Therapy Sessions",
        "Specialized ADHD/Autism Therapists"
      ]
    },
    {
      id: 3,
      title: "Medication Support",
      description: "Medication management and psychiatric care resources",
      icon: "💊",
      resources: [
        "Psychiatrist Directory",
        "Medication Information",
        "Side Effect Tracking",
        "Prescription Assistance Programs"
      ]
    },
    {
      id: 4,
      title: "Support Groups",
      description: "Community support groups for various mental health conditions",
      icon: "🤝",
      resources: [
        "ADHD Support Groups",
        "Autism Community Groups",
        "Anxiety & Depression Groups",
        "Family Support Networks"
      ]
    },
    {
      id: 5,
      title: "Educational Resources",
      description: "Learning materials and self-help resources",
      icon: "📚",
      resources: [
        "Mental Health Webinars",
        "Self-Help Books",
        "Educational Videos",
        "Research Articles"
      ]
    },
    {
      id: 6,
      title: "Technology Aids",
      description: "Apps and digital tools for mental health management",
      icon: "📱",
      resources: [
        "Meditation Apps",
        "Mood Tracking Tools",
        "Focus & Productivity Apps",
        "Sleep Management Tools"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
              </Link>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About Us
              </Link>
              <Link 
                href="#services" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Services
              </Link>
              <Link 
                href="/blogs" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Insights
              </Link>
              
              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  Resources
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'resources' && (
                  <div 
                    className="absolute top-full left-0 pt-1 w-52 z-50"
                  >
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 py-2">
                      <Link href="/resources" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                        All Resources
                        <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link href="/resources#self-help" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                        Self-Help Guides
                        <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link href="/resources#tools" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                        Mental Health Tools
                        <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link href="/resources#worksheets" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                        Worksheets & Activities
                        <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20 fade-in">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Mental Health <span className="text-blue-600">Aids</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive resources and tools to support your mental health journey. 
            Find the help you need, when you need it.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 mb-16 text-white fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <span className="text-3xl">🚨</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">In Crisis?</h2>
              <p className="text-lg opacity-90">Help is available 24/7</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xl mb-4">Call <strong>988</strong> for the Suicide & Crisis Lifeline</p>
            <p className="text-lg">Text <strong>HOME</strong> to <strong>741741</strong> for Crisis Text Line</p>
          </div>
        </div>

        {/* Aids Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {aids.map((aid, index) => (
            <div 
              key={aid.id} 
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-3xl">{aid.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{aid.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {aid.description}
              </p>
              
              <div className="space-y-3">
                {aid.resources.map((resource, resourceIndex) => (
                  <div key={resourceIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>{resource}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold btn-primary transition-all duration-300">
                Explore Resources
              </button>
            </div>
          ))}
        </div>

        {/* Additional Resources Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-16 fade-in">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
            Additional Support Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hotlines & Helplines</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">National Suicide Prevention Lifeline</p>
                    <p className="text-sm text-gray-600">24/7 crisis support</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">988</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">Crisis Text Line</p>
                    <p className="text-sm text-gray-600">Text-based crisis support</p>
                  </div>
                  <span className="text-lg font-bold text-blue-600">Text HOME to 741741</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">SAMHSA National Helpline</p>
                    <p className="text-sm text-gray-600">Substance abuse & mental health</p>
                  </div>
                  <span className="text-lg font-bold text-blue-600">1-800-662-4357</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link href="/blogs" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <p className="font-semibold text-blue-900">Mental Health Insights</p>
                  <p className="text-sm text-blue-700">Read our latest articles and research</p>
                </Link>
                
                <Link href="/about" className="block p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                  <p className="font-semibold text-purple-900">About Our Mission</p>
                  <p className="text-sm text-purple-700">Learn how we support neurodivergent individuals</p>
                </Link>
                
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="font-semibold text-green-900">Emergency Resources</p>
                  <p className="text-sm text-green-700">Always available when you need immediate help</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white fade-in">
          <h2 className="text-4xl font-bold mb-6">Need Personalized Support?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our team of mental health professionals is here to help you find the right resources for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors btn-primary">
              Get Professional Help
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all btn-primary">
              Find Local Resources
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
