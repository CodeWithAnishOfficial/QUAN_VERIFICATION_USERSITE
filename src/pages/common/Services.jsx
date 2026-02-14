import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  ShieldCheck, 
  Building2, 
  Search, 
  FileCheck2, 
  Lock, 
  Zap, 
  Globe2,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const serviceGroups = [
    {
      title: "For Individuals",
      icon: <UserCheck className="text-white" size={32} />,
      color: "bg-quanverification-brand",
      description: "Take control of your professional identity and build a trusted digital profile.",
      features: [
        "Verified Academic Credentials",
        "Work Experience Authentication",
        "Secure Digital ID Storage",
        "Shareable Profile Badges"
      ],
      link: "/register"
    },
    {
      title: "For Organizations",
      icon: <ShieldCheck className="text-white" size={32} />,
      color: "bg-[#D32F2F]",
      description: "Ensure the integrity of your institution by validating credentials for your members.",
      features: [
        "Automated Student Validation",
        "Bulk Alumni Verification",
        "Institutional Seal Integration",
        "Compliance Monitoring"
      ],
      link: "/register"
    },
    {
      title: "For Companies",
      icon: <Building2 className="text-white" size={32} />,
      color: "bg-[#15173D]",
      description: "Accelerate your hiring process with pre-verified talent discovery.",
      features: [
        "Verified Talent Search",
        "Instant Background Checks",
        "Direct Candidate Messaging",
        "Hiring Pipeline Management"
      ],
      link: "/register"
    }
  ];

  const highlights = [
    {
      icon: <Zap size={24} />,
      title: "Instant Results",
      desc: "Get verification results in seconds, not weeks."
    },
    {
      icon: <Lock size={24} />,
      title: "Secure Vault",
      desc: "Bank-grade encryption for all credential data."
    },
    {
      icon: <Globe2 size={24} />,
      title: "Universal Trust",
      desc: "Recognized by top institutions across India."
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-quanverification-light-brand">
      {/* Hero Section */}
      <section className="bg-quanverification-brand pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Comprehensive Verification <span className="text-white/60">Services</span>
            </h1>
            <p className="text-xl text-white/80 font-medium leading-relaxed">
              From individual credentials to corporate background checks, we provide the most secure and efficient validation ecosystem in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {serviceGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className={`${group.color} p-10 flex justify-center`}>
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center">
                  {group.icon}
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <h3 className="text-2xl font-black text-gray-900 mb-4">{group.title}</h3>
                <p className="text-gray-600 mb-8 font-medium leading-relaxed">
                  {group.description}
                </p>
                <div className="space-y-4 mb-10">
                  {group.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-gray-700 font-bold text-sm">
                      <CheckCircle2 size={18} className="text-quanverification-brand shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link 
                    to={group.link}
                    className="flex items-center justify-between w-full p-5 bg-gray-50 rounded-2xl group hover:bg-quanverification-brand transition-all"
                  >
                    <span className="font-black text-gray-900 group-hover:text-white transition-colors">Learn More</span>
                    <ArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {highlights.map((item, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-quanverification-brand shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="rounded-[48px] overflow-hidden shadow-2xl bg-quanverification-brand"
              >
                <img 
                  src="/assets/images/hero-man.png" 
                  alt="Service Detail" 
                  className="w-full h-[600px] object-cover opacity-90"
                />
              </motion.div>
              {/* Overlapping Card */}
              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[32px] shadow-2xl border border-gray-100 hidden md:block max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <FileCheck2 size={24} />
                  </div>
                  <span className="font-black text-gray-900">Verified</span>
                </div>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  Every service is compliant with India's latest digital validation protocols.
                </p>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Trusted by 2,700+ Integrated Services
              </h2>
              <p className="text-lg text-gray-600 font-medium leading-relaxed">
                Our verification API and platform integrate seamlessly with existing educational and corporate systems, providing a unified truth source across the nation.
              </p>
              <div className="space-y-6">
                <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-quanverification-brand transition-colors group">
                  <h5 className="text-xl font-black mb-2 text-gray-900">Enterprise API Access</h5>
                  <p className="text-gray-500 font-medium">Full integration for high-volume verification needs with dedicated support.</p>
                </div>
                <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-quanverification-brand transition-colors">
                  <h5 className="text-xl font-black mb-2 text-gray-900">Bulk Validation Tools</h5>
                  <p className="text-gray-500 font-medium">Easily verify thousands of records simultaneously with our smart import tools.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight max-w-4xl mx-auto">
            Ready to secure your digital future?
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/register" 
              className="px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-gray-100 transition-all shadow-xl active:scale-95"
            >
              Get Started
            </Link>
            <Link 
              to="/contact" 
              className="px-12 py-5 bg-transparent border-2 border-white/30 text-white font-black rounded-2xl hover:bg-white/10 transition-all active:scale-95"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
