import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="#about" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link 
                href="#services" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Services
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Hey <span className="text-blue-600">Attrangi</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Supporting neurodivergent individuals with comprehensive resources, 
            therapy connections, and community support. Your journey to better 
            mental health starts here.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Creating an inclusive platform that provides accessible psychological 
                support and resources specifically designed for neurodivergent individuals.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us</h3>
              <p className="text-gray-600 leading-relaxed">
                Evidence-based approaches, neurodivergent-friendly design, and 
                professional support from qualified therapists and specialists.
              </p>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 shadow-sm border border-gray-200">
            <div className="aspect-square bg-white rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl">🧠</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Neurodivergent Support</h3>
                <p className="text-gray-600">Comprehensive resources and tools</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">Join our community and access professional support today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#services" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Get Started
            </Link>
            <Link 
              href="#about" 
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section id="about" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Hey Attrangi</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about our mission, team, and commitment to supporting neurodivergent individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Agenda</h3>
              <p className="text-gray-600 leading-relaxed">
                Promoting awareness, accessibility, and inclusion for neurodivergent individuals 
                through evidence-based psychological support and community building.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Founder's Note</h3>
              <p className="text-gray-600 leading-relaxed">
                Created by individuals who understand the unique challenges faced by 
                neurodivergent people, with a vision to make psychological support accessible to all.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Info</h3>
              <p className="text-gray-600 leading-relaxed">
                Our diverse team includes licensed therapists, neurodivergent advocates, 
                and technology specialists committed to creating inclusive solutions.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaborators</h3>
              <p className="text-gray-600 leading-relaxed">
                Partnering with leading psychological institutions, advocacy groups, 
                and technology companies to deliver comprehensive support services.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Links</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-700">Twitter</a>
                <a href="#" className="text-blue-600 hover:text-blue-700">LinkedIn</a>
                <a href="#" className="text-blue-600 hover:text-blue-700">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support services designed specifically for neurodivergent individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Self-Help Library</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Access curated resources, articles, and tools designed specifically for 
                neurodivergent individuals. Evidence-based strategies for managing daily challenges.
              </p>
              <Link 
                href="#library" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Explore Library →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Therapy Connect</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Connect with licensed therapists who specialize in working with 
                neurodivergent individuals. Professional support tailored to your needs.
              </p>
              <Link 
                href="#therapy" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Find Therapist →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Join a supportive community of neurodivergent individuals and allies. 
                Share experiences, get peer support, and build meaningful connections.
              </p>
              <Link 
                href="#community" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Join Community →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Awareness Content</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Educational content about neurodivergence, mental health awareness, 
                and inclusive practices. Stay informed and help spread understanding.
              </p>
              <Link 
                href="#awareness" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Hey Attrangi</h3>
            <p className="text-gray-400 mb-6">
              Supporting neurodivergent individuals with comprehensive psychological resources.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              © 2024 Hey Attrangi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}