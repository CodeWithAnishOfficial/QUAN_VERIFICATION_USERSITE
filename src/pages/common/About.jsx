import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  Globe, 
  Award, 
  Target, 
  Eye, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white font-sans selection:bg-quanverification-light-brand">
      {/* Mission & Vision Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-quanverification-light-brand text-quanverification-brand rounded-full text-sm font-bold uppercase tracking-widest">
                <Target size={16} /> Our Mission
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Empowering decisions through verified truth.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to eliminate credential fraud and streamline the hiring process for millions. By bridging the gap between institutions and employers, we ensure that every career milestone is backed by authenticated data.
              </p>
              <ul className="space-y-4">
                {[
                  "Eliminate fraudulent academic and professional claims",
                  "Reduce verification turnaround time from weeks to seconds",
                  "Protect individual data privacy with secure encryption",
                  "Provide a unified platform for all validation needs"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="text-quanverification-brand shrink-0 mt-1" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[40px] overflow-hidden shadow-2xl">
                <img 
                  src="/assets/images/hero-women.png" 
                  alt="Our Vision" 
                  className="w-full h-[600px] object-cover bg-gray-50"
                />
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 hidden lg:block">
                <p className="text-quanverification-brand text-5xl font-black mb-1">99.9%</p>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Accuracy Rate</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">The principles that guide our pursuit of excellence and integrity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<ShieldCheck className="text-quanverification-brand" size={40} />}
              title="Integrity First"
              description="We maintain the highest standards of data accuracy and ethical conduct in everything we do."
            />
            <ValueCard 
              icon={<Users className="text-quanverification-brand" size={40} />}
              title="User Centric"
              description="Designing solutions that simplify complex processes for individuals, schools, and companies alike."
            />
            <ValueCard 
              icon={<Award className="text-quanverification-brand" size={40} />}
              title="Innovation"
              description="Leveraging cutting-edge technology to stay ahead of evolving fraud techniques and security needs."
            />
          </div>
        </div>
      </section>

      {/* Stats Section (Blue theme) */}
      <section className="bg-quanverification-brand text-white py-24 px-6 sm:px-12 lg:px-20 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center relative z-10">
          <div>
            <h3 className="text-5xl font-black mb-2 tracking-tighter">500+</h3>
            <p className="text-white/80 font-bold uppercase tracking-widest text-xs">Partner Schools</p>
          </div>
          <div>
            <h3 className="text-5xl font-black mb-2 tracking-tighter">1.2M+</h3>
            <p className="text-white/80 font-bold uppercase tracking-widest text-xs">Verified Profiles</p>
          </div>
          <div>
            <h3 className="text-5xl font-black mb-2 tracking-tighter">150+</h3>
            <p className="text-white/80 font-bold uppercase tracking-widest text-xs">Hiring Partners</p>
          </div>
          <div>
            <h3 className="text-5xl font-black mb-2 tracking-tighter">24/7</h3>
            <p className="text-white/80 font-bold uppercase tracking-widest text-xs">Support Access</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-tight">
            Ready to join the ecosystem of trust?
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/register" 
              className="px-10 py-5 bg-quanverification-brand text-white font-black rounded-2xl hover:bg-quanverification-dark-brand transition-all shadow-xl hover:shadow-quanverification-brand/20 active:scale-95"
            >
              Get Started Now
            </Link>
            <Link 
              to="/contact" 
              className="px-10 py-5 bg-white text-quanverification-brand border-2 border-quanverification-brand font-black rounded-2xl hover:bg-quanverification-light-brand transition-all active:scale-95"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-12 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500"
  >
    <div className="mb-8">{icon}</div>
    <h3 className="text-2xl font-black text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
  </motion.div>
);

export default About;
