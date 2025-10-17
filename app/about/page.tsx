import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                href="/blogs" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Attrangi</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering neurodivergent individuals through accessible mental health support, 
              education, and community building.
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From a vision to reality - the story of how Attrangi came to be
            </p>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {/* Item 1 */}
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right">
                  <div className="bg-blue-50 rounded-lg p-6 inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">The Vision</h3>
                    <p className="text-sm text-blue-600 mb-4">2023 - Beginning</p>
                    <p className="text-gray-700">
                      Recognizing the gap in accessible mental health support for neurodivergent individuals, 
                      our founders envisioned a platform that would bridge this crucial divide. The idea was 
                      simple yet powerful: create a safe, inclusive space where everyone feels understood.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white hidden md:block"></div>
              </div>

              {/* Item 2 */}
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="hidden md:block"></div>
                <div className="md:text-left">
                  <div className="bg-purple-50 rounded-lg p-6 inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Building the Team</h3>
                    <p className="text-sm text-purple-600 mb-4">2023 - Mid Year</p>
                    <p className="text-gray-700">
                      We assembled a diverse team of licensed therapists, neurodivergent advocates, 
                      psychologists, and technology specialists. Each member brought unique perspectives 
                      and expertise, united by a shared commitment to making a difference.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-600 rounded-full border-4 border-white hidden md:block"></div>
              </div>

              {/* Item 3 */}
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right">
                  <div className="bg-green-50 rounded-lg p-6 inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Research & Development</h3>
                    <p className="text-sm text-green-600 mb-4">2024 - Early</p>
                    <p className="text-gray-700">
                      Through extensive research and consultation with the neurodivergent community, 
                      we developed evidence-based resources, therapy protocols, and user-friendly 
                      interfaces designed specifically for accessibility and inclusivity.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-600 rounded-full border-4 border-white hidden md:block"></div>
              </div>

              {/* Item 4 */}
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="hidden md:block"></div>
                <div className="md:text-left">
                  <div className="bg-yellow-50 rounded-lg p-6 inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Beta Launch</h3>
                    <p className="text-sm text-yellow-600 mb-4">2024 - Mid Year</p>
                    <p className="text-gray-700">
                      We launched our beta program with a small group of early adopters. Their feedback 
                      was invaluable, helping us refine our platform, improve user experience, and 
                      ensure our services truly met the needs of the community.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-600 rounded-full border-4 border-white hidden md:block"></div>
              </div>

              {/* Item 5 */}
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right">
                  <div className="bg-indigo-50 rounded-lg p-6 inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Growing Together</h3>
                    <p className="text-sm text-indigo-600 mb-4">2024 - Present</p>
                    <p className="text-gray-700">
                      Today, Attrangi continues to grow and evolve. We're expanding our network of 
                      therapists, adding new resources, and building a vibrant community. Our journey 
                      is far from over - in fact, it's just beginning.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Inclusivity</h3>
              <p className="text-gray-600 text-center">
                We believe in creating a welcoming environment where every neurodivergent individual 
                feels valued, understood, and supported without judgment.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Evidence-Based</h3>
              <p className="text-gray-600 text-center">
                All our resources and therapy approaches are grounded in scientific research and 
                best practices in psychology and neurodivergent support.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Empowerment</h3>
              <p className="text-gray-600 text-center">
                We empower individuals with knowledge, tools, and support to take control of their 
                mental health journey and thrive in their unique way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Passionate professionals dedicated to supporting the neurodivergent community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white">👨‍⚕️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Clinical Team</h3>
              <p className="text-sm text-gray-600">Licensed therapists and psychologists</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white">💡</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Research Team</h3>
              <p className="text-sm text-gray-600">Neuroscientists and researchers</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white">🤝</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Advocacy Team</h3>
              <p className="text-sm text-gray-600">Neurodivergent advocates and educators</p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white">💻</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Tech Team</h3>
              <p className="text-sm text-gray-600">Developers and UX specialists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborators & Partners */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners & Collaborators</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Working together to create positive change
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Healthcare Institutions</h3>
              <p className="text-sm text-gray-600">
                Partnering with leading hospitals and mental health clinics
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Academic Partners</h3>
              <p className="text-sm text-gray-600">
                Collaborating with universities for research and training
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Advocacy Groups</h3>
              <p className="text-sm text-gray-600">
                Working with neurodivergent advocacy organizations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Us on This Journey</h2>
          <p className="text-lg text-gray-600 mb-8">
            Whether you're seeking support, want to contribute, or just want to learn more, 
            we'd love to have you as part of our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/blogs" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Read Our Blog
            </Link>
            <Link 
              href="/#services" 
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hey Attrangi</h3>
              <p className="text-gray-400 text-sm">
                Supporting neurodivergent individuals with comprehensive psychological resources.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blogs" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/#services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Self-Help Library</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find a Therapist</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support Groups</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 Hey Attrangi. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

