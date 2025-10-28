"use client";

import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-orange-50 relative">
      {/* Navigation Component */}
      <Navigation currentPath="/about" />

       {/* About Us Section - 70% Height Video with Floating Card */}
       <section className="relative w-full h-[70vh] overflow-hidden">
         {/* Video with 70% Height */}
         <video
           className="absolute inset-0 w-full h-full object-cover"
           autoPlay
           muted
           loop
           playsInline
           preload="none"
         >
           <source src="/videos/doc1.mp4" type="video/mp4" />
           Your browser does not support the video tag.
         </video>
         
       </section>
       
       {/* Floating Card - Following Home Page Pattern */}
       <div className="relative -mt-16 mb-20 z-50">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-orange-200 relative overflow-hidden">
            <div className="text-center relative z-20">
               {/* Main Title */}
               <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-none text-orange-600" 
                   style={{
                     fontFamily: 'Poppins, sans-serif'
                   }}>
                 ABOUT US
            </h1>
               
               {/* Subtitle */}
               <p className="text-lg text-gray-700 mb-6 font-medium" 
                  style={{
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                 Empowering Mental Health Through Innovation
               </p>
               
               {/* Enhanced Description */}
               <div className="text-base text-gray-600 text-left leading-relaxed max-w-3xl mx-auto" 
                    style={{
                      fontFamily: 'Poppins, sans-serif'
                    }}>
                 <p className="mb-4">
                   We're dedicated to revolutionizing mental health support by creating an inclusive, 
                   accessible, and empowering platform that celebrates neurodiversity. Our mission is to 
                   provide evidence-based therapy and resources tailored specifically for neurodivergent individuals.
                 </p>
                 <p>
                   Through innovative technology and compassionate care, we're building a community where 
                   everyone can access the mental health support they need to thrive and be their authentic selves.
                 </p>
               </div>
               
               {/* Orange Line */}
               <div className="mt-6 flex justify-center">
                 <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
               </div>
             </div>
           </div>
          </div>

        </div>

       {/* Background decoration image - Outside card */}
       <div className="absolute right-20 top-[600px] w-[560px] h-[560px] md:w-[800px] md:h-[800px] opacity-80 z-0 hidden lg:block pointer-events-none">
         <Image
           src="/images/assets2.png"
           alt="Background decoration"
           fill
           className="object-contain"
           sizes="(max-width: 1024px) 0px, 800px"
         />
       </div>

       {/* Founder Message Section - Floating Design */}
       <div className="relative mt-48 mb-20 z-40">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
             {/* Left Side - Quote Content */}
             <div className="space-y-6 relative">
               {/* Founder Name and Title */}
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-3" style={{fontFamily: 'Poppins, sans-serif'}}>
                   Dr. Sandesh Palhke
                 </h2>
                 <p className="text-lg md:text-xl text-gray-700 font-medium" style={{fontFamily: 'Poppins, sans-serif'}}>
                   Assistant Professor, Clinical Psychologist & Mental Health Advocate
                   Department of Psychology, Indian Institute of Information Technology, Dharwad
                 </p>
               </div>
               
               {/* Quote */}
               <div className="relative z-10">
                 <blockquote className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                   "Every individual deserves access to mental health support that understands their unique needs. 
                   At Attrangi, we're not just providing services – we're building a community where neurodivergent 
                   individuals can thrive and be their authentic selves."
                 </blockquote>
               </div>
             </div>
             
             {/* Right Side - Floating Image */}
             <div className="relative">
               <div className="relative w-96 h-96 lg:w-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl transform -mb-32 z-50">
                 <Image
                   src="/images/founder2.png"
                   alt="Dr. Attrangi Founder - Clinical Psychologist and Mental Health Advocate"
                   fill
                   className="object-cover"
                   priority
                 />
               </div>
             </div>
           </div>
         </div>

         
       </div>

       {/* Our Story Section */}
       <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative z-30">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-6xl mx-auto">
             <div className="grid lg:grid-cols-2 gap-16 items-start">
               {/* Left Column - Our Story */}
               <div className="space-y-8">
                 <div className="text-center lg:text-left">
                   <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                     Our Story
                   </h2>
                   <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto lg:mx-0"></div>
                 </div>
                 
                 <div className="space-y-6">
                   <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                     <p className="text-lg text-gray-700 leading-relaxed mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                       Attrangi started as a small mental health support initiative, aiming to help 
                       neurodivergent individuals navigate the challenges of traditional mental health services. 
                       It soon became obvious that it would make sense to help our clients see beyond their 
                       diagnoses and limitations, and be there with them from the very beginning of their 
                       mental health journey.
                     </p>
                     
                     <p className="text-lg text-gray-700 leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                       Currently, we offer therapy services, mental health resources, and 
                       community support in order to help our clients find their path to 
                       mental wellness as seamlessly and effectively as possible. We value our clients 
                       above everything else, meaning that we won't take 'OK' as an answer when it comes to their 
                       mental health and wellbeing.
                     </p>
                   </div>
                 </div>
               </div>
               
               {/* Right Column - Why Choose Us */}
               <div className="space-y-8 mt-28">
                 <div className="text-center lg:text-left">
                   <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                     Why Choose Us
                   </h3>
                   <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto lg:mx-0"></div>
                 </div>
                 
                 <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mt-8">
                   <div className="space-y-4">
                     <div className="flex items-center text-gray-700">
                       <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                       <div>
                         <span className="font-semibold">Evidence-Based Therapy</span>
                         <p className="text-sm text-gray-600 mt-1">Scientifically proven methods tailored to neurodivergent needs</p>
                       </div>
                     </div>
                     
                     <div className="flex items-center text-gray-700">
                       <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                       <div>
                         <span className="font-semibold">Inclusive & Accessible</span>
                         <p className="text-sm text-gray-600 mt-1">Welcoming environment for all neurodivergent individuals</p>
                       </div>
                     </div>
                     
                     <div className="flex items-center text-gray-700">
                       <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                       <div>
                         <span className="font-semibold">Personalized Care</span>
                         <p className="text-sm text-gray-600 mt-1">Individualized treatment plans for unique needs</p>
                       </div>
                     </div>
                     
                     <div className="flex items-center text-gray-700">
                       <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                       <div>
                         <span className="font-semibold">Community Support</span>
                         <p className="text-sm text-gray-600 mt-1">Strong network of peers and professionals</p>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* Quote Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200 rounded-2xl p-8 md:p-12 shadow-lg relative">
            {/* Large opening quote mark */}
            <div className="absolute left-4 top-4 text-8xl md:text-9xl font-bold text-orange-600 opacity-20 leading-none" style={{fontFamily: 'Georgia, serif'}}>
              "
            </div>
            
            {/* Large closing quote mark */}
            <div className="absolute right-4 bottom-4 text-8xl md:text-9xl font-bold text-orange-600 opacity-20 leading-none" style={{fontFamily: 'Georgia, serif'}}>
              "
            </div>
            
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 leading-relaxed relative z-10" style={{fontFamily: 'Poppins, sans-serif'}}>
              "Every individual deserves access to mental health support that understands their unique needs. 
              At Attrangi, we're not just providing services – we're building a community where neurodivergent 
              individuals can thrive and be their authentic selves."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="mission" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-6 py-3 rounded-full text-sm font-semibold mb-6">
  
              Our Bold Mission
            </div> */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8" style={{fontFamily: 'Poppins, sans-serif'}}>
             Our Mission <span className="text-orange-600">| We Won't Take 'OK' as an Answer</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Image */}
            <div className="relative w-full h-[800px] lg:h-[900px]">
              <Image
                src="/images/src12.jpg"
                alt="Our Bold Mission - We Won't Take 'OK' as an Answer"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Right Side - Mission Text */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-orange-100">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                  Attrangi started as a small mental health support initiative, aiming to help neurodivergent individuals navigate the challenges of traditional mental health services. It soon became obvious that it would make sense to help our clients see beyond their diagnoses and limitations, and be there with them from the very beginning of their mental health journey.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                  Currently, we offer therapy services, mental health resources, and community support in order to help our clients find their path to mental wellness as seamlessly and effectively as possible. We value our clients above everything else, meaning that we won't take 'OK' as an answer when it comes to their mental health and wellbeing.
                </p>
                
                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                  <p className="text-xl font-bold text-gray-800 italic" style={{fontFamily: 'Poppins, sans-serif'}}>
                    "So amy bold words"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" className="py-20 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
              We've got an <span className="relative inline-block">
                
                <span className="relative text-orange-600">entire</span>
              </span> team dedicated to supporting you
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              Get help 24/7, with our award-winning support network of mental health experts.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="relative w-full">
            <div className="flex flex-wrap justify-center gap-6 px-4">
              {/* Team Member 1 - Dr. Sandesh Palhke */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-72 md:w-80 cursor-pointer overflow-hidden">
                <div className="relative w-full h-full">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image 
                      src="/images/founder2.png" 
                      alt="Dr. Sandesh Palhke" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Dr. Sandesh Palhke</h3>
                    <p className="text-sm text-orange-600 font-semibold">Child Psychologist | Proffesor UI & UX</p>
                    <p className="text-xs text-gray-500 mt-1">Founder & Lead Therapist</p>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-72 md:w-80 cursor-pointer overflow-hidden">
                <div className="relative w-full h-full">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image 
                      src="/images/team2.png" 
                      alt="Research Team" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">M.Bharat Reddy</h3>
                    <p className="text-sm text-orange-600 font-semibold">Tech Expert | Researcher</p>
                    <p className="text-xs text-gray-500 mt-1">CEO & Co-Founder</p>
                  </div>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-72 md:w-80 cursor-pointer overflow-hidden">
                <div className="relative w-full h-full">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image 
                      src="/images/team4.png" 
                      alt="Support Team" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Charan</h3>
                    <p className="text-sm text-orange-600 font-semibold">Frontend Developer & UI/UX Designer</p>
                    <p className="text-xs text-gray-500 mt-1">Creating seamless user experiences</p>
                  </div>
                </div>
              </div>
              

              {/* Team Member 4 */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-72 md:w-80 cursor-pointer overflow-hidden">
                <div className="relative w-full h-full">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image 
                      src="/images/team3.png" 
                      alt="Tech Team" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Lakshmi Prasad</h3>
                    <p className="text-sm text-orange-600 font-semibold">Developers & UX</p>
                    <p className="text-xs text-gray-500 mt-1">Creating accessible platforms</p>
                  </div>
                </div>
              </div>

              {/* Team Member 5 */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-72 md:w-80 cursor-pointer overflow-hidden">
                <div className="relative w-full h-full">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image 
                      src="/images/team1.jpeg" 
                      alt="Advocacy Team" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">D.Harshith</h3>
                    <p className="text-sm text-orange-600 font-semibold">Tech Lead</p>
                    <p className="text-xs text-gray-500 mt-1">Lived experience leadership</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Book a Call
            </button>
            <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-lg">
              Get in Touch
            </button>
          </div>
        </div>

      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16 bg-gradient-to-br from-orange-100/50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get in touch with us. We're here to help and answer any questions you may have.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">support@attrangi.com</p>
                  </div>
            </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
            </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Office</h4>
                    <p className="text-gray-600">123 Mental Health Ave<br />San Francisco, CA 94102</p>
                  </div>
            </div>
          </div>
        </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

