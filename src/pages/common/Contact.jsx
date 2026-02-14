import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="text-quanverification-brand" size={24} />,
      title: "Call Us",
      details: "+91 11 2430 1000",
      subDetails: "Mon-Fri, 9am - 6pm IST"
    },
    {
      icon: <Mail className="text-quanverification-brand" size={24} />,
      title: "Email Us",
      details: "support@quanverification.gov.in",
      subDetails: "24/7 online support"
    },
    {
      icon: <MapPin className="text-quanverification-brand" size={24} />,
      title: "Visit Us",
      details: "Electronics Niketan, 6, CGO Complex",
      subDetails: "Lodhi Road, New Delhi, 110003"
    },
    {
      icon: <Clock className="text-quanverification-brand" size={24} />,
      title: "Working Hours",
      details: "Monday - Friday",
      subDetails: "9:00 AM - 6:00 PM IST"
    }
  ];

  return (
    <div className="bg-white">
      {/* Main Content */}
      <section className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a message</h2>
              <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-quanverification-brand/10 focus:border-quanverification-brand outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-quanverification-brand/10 focus:border-quanverification-brand outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-quanverification-brand/10 focus:border-quanverification-brand outline-none transition-all appearance-none bg-white">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Partnership Interest</option>
                  <option>Verification Request</option>
                  <option>Report a Problem</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Message</label>
                <textarea 
                  rows="5" 
                  placeholder="How can we help you?" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-quanverification-brand/10 focus:border-quanverification-brand outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button className="bg-quanverification-brand text-white w-full py-4 rounded-xl font-bold text-lg hover:bg-quanverification-dark-brand transition-all flex items-center justify-center gap-2 group shadow-lg active:scale-95">
                Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Contact Details & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            {/* Google Map Iframe Placeholder */}
            <div className="rounded-3xl overflow-hidden shadow-xl h-[400px] bg-gray-100 border-2 border-gray-50 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.225381830635!2d77.234149876249!3d28.592994985955627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2f01f893335%3A0xe549321f00845a7c!2sElectronics%20Niketan!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
              
              {/* Overlay for better integration */}
              <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 rounded-3xl"></div>
            </div>

            {/* Live Chat CTA */}
            <div className="bg-[#A7C0C7]/20 p-8 rounded-3xl flex items-center justify-between gap-6 border border-[#A7C0C7]/30">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#8B3131] shadow-sm">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Need instant help?</h3>
                  <p className="text-sm text-gray-600">Chat with our verification experts right now.</p>
                </div>
              </div>
              <Link to="/support" className="bg-white text-quanverification-brand px-6 py-2 rounded-full font-bold text-sm shadow-sm hover:bg-quanverification-brand hover:text-white transition-all whitespace-nowrap">
                Start Chat
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Row */}
      <section className="py-20 bg-gray-50 border-t border-gray-100 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-quanverification-brand">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{info.title}</h3>
                  <p className="text-gray-700 font-semibold">{info.details}</p>
                  <p className="text-sm text-gray-500">{info.subDetails}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
