import { ArrowRight, Building2, UserCheck, MessageCircleQuestion, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const Home = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const howItWorksRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: howItWorksRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-white font-sans selection:bg-quanverification-light-brand">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row md:h-[calc(100vh-80px)] overflow-hidden">

        {/* Left Content (Navy) */}
        <div className="w-full md:w-1/2 bg-quanverification-brand flex items-center justify-center px-6 sm:px-12 lg:px-20 py-20 md:py-0">
          <div className="w-full max-w-xl text-white z-10 text-left">
            <h1 className="text-5xl sm:text-6xl md:text-[80px] lg:text-[100px] font-bold leading-[1] mb-10 tracking-tight">
              Verified<br />credentials<br />made simple
            </h1>
            <p className="text-lg md:text-[22px] leading-relaxed mb-12 opacity-95 max-w-lg font-medium">
              QuanVerification is India's leading background verification portal. Trusted by individuals, schools, and companies for secure data validation.
            </p>

            <div className="flex flex-wrap gap-4">
              <AppStoreButton
                platform="App Store"
                badge="DOWNLOAD ON THE"
                icon={<AppleIcon />}
              />
              <AppStoreButton
                platform="Google Play"
                badge="GET IT ON"
                icon={<PlayStoreIcon />}
              />
              <AppStoreButton
                platform="AppGallery"
                badge="EXPLORE IT ON"
                icon={<HuaweiIcon />}
              />
            </div>
          </div>
        </div>

        {/* Right Content (Grid) */}
        <div className="w-full md:w-1/2 grid grid-cols-2 grid-rows-2 h-[600px] md:h-full">
          {/* Top Left - Woman */}
          <div className="relative bg-[#15173D] overflow-hidden flex items-end justify-center">
            <div className="absolute inset-0 z-0 opacity-20">
              <PatternCirclesLarge />
            </div>
            <img
              src="/assets/images/herogirl.png"
              alt="Individual"
              className="relative h-[90%] w-auto object-contain z-10"
            />
          </div>

          {/* Top Right - Man */}
          <div className="relative bg-[#1A1A1A] overflow-hidden flex items-end justify-center">
            <div className="absolute inset-0 z-0 opacity-15">
              <PatternCirclesLarge />
            </div>
            <img
              src="/assets/images/hero-man.png"
              alt="Business"
              className="relative h-[90%] w-auto object-contain z-10"
            />
          </div>

          {/* Bottom Left - Grandpa */}
          <div className="relative bg-[#1A1A1A] overflow-hidden flex items-end justify-center">
            <div className="absolute inset-0 z-0 opacity-15">
              <PatternCirclesLarge />
            </div>
            <img
              src="/assets/images/hero-grandpa.png"
              alt="Senior"
              className="relative h-[90%] w-auto object-contain z-10"
            />
          </div>

          {/* Bottom Right - Woman */}
          <div className="relative bg-[#15173D] overflow-hidden flex items-end justify-center">
            <div className="absolute inset-0 z-0 opacity-20">
              <PatternCirclesLarge />
            </div>
            <img
              src="/assets/images/hero-women.png"
              alt="Professional"
              className="relative h-[90%] w-auto object-contain z-10"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-black text-white py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-2">4,200,000+</h2>
            <p className="text-lg opacity-90 font-medium">users on QuanVerification app</p>
          </div>
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-2">2,700+</h2>
            <p className="text-lg opacity-90 font-medium">services integrated with QuanVerification</p>
          </div>
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-2">41,000,000+</h2>
            <p className="text-lg opacity-90 font-medium">transactions made per month</p>
          </div>
        </div>
      </section>

      {/* Notification Section */}
      <section className="bg-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 text-gray-900 leading-tight">Receive timely<br />notifications</h2>
            <Link to="/services" className="text-[#D32F2F] font-bold text-xl hover:underline flex items-center">
              Find out more <ArrowRight className="ml-2" size={24} />
            </Link>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="rounded-l-[300px] overflow-hidden shadow-2xl">
              <img 
                src="/assets/images/herogirl.png" 
                alt="Notification Illustration" 
                className="w-full h-[500px] object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Role Selector Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose your role to get started</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Select how you want to use the platform today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RoleCard
              icon={<UserCheck size={48} className="text-quanverification-brand" />}
              title="Individuals"
              description="Build your verified profile. Enter schooling and work details for quick verification."
              link={user?.role === 'user' ? '/dashboard/user' : '/login'}
            />
            <RoleCard
              icon={<ShieldCheck size={48} className="text-quanverification-brand" />}
              title="Organizations"
              description="Verify credentials. Validate students and former employees who claim to be part of your institution."
              link={user?.role === 'verifier' ? '/dashboard/verifier' : '/login'}
            />
            <RoleCard
              icon={<Building2 size={48} className="text-quanverification-brand" />}
              title="Companies"
              description="Find talent. Search for and discover verified individuals who meet your exact requirements."
              link={user?.role === 'company' ? '/dashboard/company' : '/login'}
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section ref={howItWorksRef} className="py-24 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How QuanVerification Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A seamless 3-step process for secure background validation.</p>
          </div>

          <div className="relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[16.6%] right-[16.6%] h-0.5 bg-gray-100">
              <motion.div 
                className="h-full bg-quanverification-brand origin-left"
                style={{ scaleX: pathLength }}
              />
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-12">
              <StepItem 
                number="1" 
                title="Submit Details" 
                description="Users enter their educational and professional history on the portal."
                progress={scrollYProgress}
                range={[0, 0.33]}
              />
              <StepItem 
                number="2" 
                title="Validate Data" 
                description="Schools and past employers verify the authenticity of the submitted data."
                progress={scrollYProgress}
                range={[0.33, 0.66]}
              />
              <StepItem 
                number="3" 
                title="Trusted Search" 
                description="Companies search for and find talent with pre-verified credentials."
                progress={scrollYProgress}
                range={[0.66, 1]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fight Scams Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-20 text-gray-900">Together, we can fight scams</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <div className="flex flex-col items-center group">
              <div className="h-56 mb-8 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                 <img src="/assets/images/hero-man.png" alt="Scam Protection 1" className="max-h-full object-contain" />
              </div>
              <p className="text-xl font-medium leading-relaxed text-gray-800 max-w-xs">
                Never share your QuanVerification ID, password and 2FA details with others
              </p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="h-56 mb-8 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                <img src="/assets/images/hero-grandpa.png" alt="Scam Protection 2" className="max-h-full object-contain" />
              </div>
              <p className="text-xl font-medium leading-relaxed text-gray-800 max-w-xs">
                Check that the web domain of the QuanVerification website is quanverification.gov.in
              </p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="h-56 mb-8 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                <img src="/assets/images/hero-women.png" alt="Scam Protection 3" className="max-h-full object-contain" />
              </div>
              <p className="text-xl font-medium leading-relaxed text-gray-800 max-w-xs">
                QuanVerification never sends web links or QR codes via SMS or WhatsApp
              </p>
            </div>
          </div>
          
          <button className="border-2 border-[#D32F2F] text-[#D32F2F] px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-all shadow-sm active:scale-95">
            Read more on QuanVerification security
          </button>
        </div>
      </section>

      {/* Inclusivity Section */}
      <section className="py-24 bg-white overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-20 text-gray-900 tracking-tight leading-tight">We believe in inclusivity and<br className="hidden md:block" /> empowerment</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto shadow-2xl rounded-[40px] overflow-hidden">
            {/* Image 1: Grandpa */}
            <div className="relative bg-[#F8F9FA] flex items-center justify-center overflow-hidden h-[450px]">
              <img src="/assets/images/hero-grandpa.png" alt="Dennis Teo" className="w-full h-full object-cover object-center" />
            </div>
            
            {/* Testimonial 1: Dennis Teo (Black) */}
            <div className="bg-black text-white p-12 flex flex-col justify-center text-left relative h-[450px]">
              {/* Triangle arrow pointing left */}
              <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-r-[15px] border-r-black"></div>
              {/* Triangle arrow pointing up (mobile) */}
              <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-black"></div>
              
              <p className="text-xl md:text-[22px] leading-relaxed mb-8 opacity-90 font-medium italic">
                "We also want to be independent and be able to do things by ourselves. Fortunately, the QuanVerification app considered many of those accessibility features that the visually-impaired community has mentioned."
              </p>
              <div>
                <p className="text-[#D32F2F] font-black text-3xl mb-1">- Dennis Teo</p>
                <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-black">User Testimonial</p>
              </div>
            </div>

            {/* Image 2: Young Woman */}
            <div className="relative bg-[#F8F9FA] flex items-center justify-center overflow-hidden h-[450px]">
              <img src="/assets/images/herogirl.png" alt="Sarah Chen" className="w-full h-full object-cover object-center" />
            </div>

            {/* Testimonial 2: Sarah Chen (Red) */}
            <div className="bg-[#D32F2F] text-white p-12 flex flex-col justify-center text-left relative h-[450px]">
               {/* Triangle arrow pointing up */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-[#D32F2F]"></div>
               
              <p className="text-xl md:text-[22px] leading-relaxed mb-8 opacity-95 font-medium italic">
                "Digital inclusion means ensuring everyone can access services easily. QuanVerification's simple interface makes verification accessible for all age groups."
              </p>
              <div>
                <p className="text-white font-black text-3xl mb-1">- Sarah Chen</p>
                <p className="text-red-100/60 text-xs uppercase tracking-[0.2em] font-black">Community Leader</p>
              </div>
            </div>

            {/* Image 3: Saree Woman */}
            <div className="relative bg-[#F8F9FA] flex items-center justify-center overflow-hidden h-[450px]">
              <img src="/assets/images/hero-women.png" alt="Mr. Raghavan" className="w-full h-full object-cover object-center" />
            </div>

             {/* Testimonial 3: Mr. Raghavan (Navy) */}
             <div className="bg-[#15173D] text-white p-12 flex flex-col justify-center text-left relative h-[450px]">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-[#15173D]"></div>
              <p className="text-xl md:text-[22px] leading-relaxed mb-8 opacity-90 font-medium italic">
                "As an elderly user, I find the 2FA process very intuitive. It gives me peace of mind knowing my credentials are secure and verified."
              </p>
              <div>
                <p className="text-[#D32F2F] font-black text-3xl mb-1">- Mr. Raghavan</p>
                <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-black">Senior Citizen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Need Help */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link to="/support">
          <motion.button 
            initial={{ width: "80px" }}
            whileHover={{ width: "320px" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex items-center bg-white/30 backdrop-blur-xl text-gray-900 h-20 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/40 group overflow-hidden hover:bg-white/40 transition-colors"
          >
            <div className="flex-shrink-0 w-20 flex items-center justify-center">
              <div className="relative w-12 h-10">
                {/* Overlapping Speech Bubbles Icon */}
                <div className="absolute top-0 left-0 w-9 h-9 bg-quanverification-brand rounded-full rounded-br-none -rotate-12 shadow-lg"></div>
                <div className="absolute bottom-0 right-0 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full rounded-bl-none flex items-center justify-center shadow-lg border border-white/50">
                  <span className="text-quanverification-brand text-xl font-black">?</span>
                </div>
              </div>
            </div>
            <span className="text-[20px] font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2 pr-8 tracking-tight">
              Need any help?
            </span>
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

const AppStoreButton = ({ platform, badge, icon }) => (
  <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2.5 hover:bg-gray-900 transition-colors border border-gray-800">
    <div className="flex-shrink-0">
      {icon}
    </div>
    <div className="text-left leading-tight">
      <div className="text-[9px] uppercase font-bold tracking-tight opacity-80">{badge}</div>
      <div className="text-[16px] font-bold">{platform}</div>
    </div>
  </button>
);

const AppleIcon = () => (
  <svg className="w-7 h-7 fill-current" viewBox="0 0 384 512">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-19.1-76.9-19.1-36.5 0-69.8 20.1-88.5 52.8-38.5 67.2-9.9 166.4 27.5 220.3 18.3 26.4 40.4 56 68.8 55 27.1-1 37.1-17.4 69.8-17.4 32.7 0 42 17.4 70.3 16.9 29.1-.5 48.6-26.9 66.8-53.4 20.9-30.7 29.5-60.5 29.8-62.1-.7-.3-57-21.7-57.2-84.3zM229.1 82.2c15.1-18.8 25.1-44.5 22.3-70.2-22 .9-48.6 14.6-64.3 33-14.3 16.6-26.7 43.1-23.3 67.8 24.3 1.9 49.3-12.4 65.3-30.6z" />
  </svg>
);

const PlayStoreIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 512 512">
    <path fill="#3bccff" d="M104.6 13L47 70.1v371.8l57.6 57.1 220.7-221.3z" />
    <path fill="#00e1a0" d="M405 310.3l-79.7-44.3-60.1 60.1z" />
    <path fill="#ffd400" d="M405 201.7l54.3 31.2c16.1 9.2 16.1 24.4 0 33.7L405 310.3l-57.7-54.3z" />
    <path fill="#ff3a44" d="M405 201.7L104.6 13l220.7 221.3z" />
  </svg>
);

const HuaweiIcon = () => (
  <div className="w-7 h-7 bg-quanverification-brand rounded-md flex items-center justify-center text-[11px] font-black">H</div>
);

const PatternCirclesLarge = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="circlePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <circle cx="50" cy="50" r="35" fill="white" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#circlePattern)" />
  </svg>
);

const StepItem = ({ number, title, description, progress, range }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center space-y-4 relative z-10"
    >
      <motion.div 
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto transition-colors duration-500 shadow-lg"
        style={{
          backgroundColor: useTransform(progress, [range[0], range[0] + 0.05], ["#F0F1F6", "#15173D"]),
          color: useTransform(progress, [range[0], range[0] + 0.05], ["#15173D", "#FFFFFF"]),
          scale: useTransform(progress, [range[0], range[0] + 0.05, range[0] + 0.1], [1, 1.1, 1])
        }}
      >
        {number}
      </motion.div>
      <motion.h3 
        className="text-xl font-bold transition-colors duration-500"
        style={{ color: useTransform(progress, [range[0], range[0] + 0.05], ["#111827", "#15173D"]) }}
      >
        {title}
      </motion.h3>
      <p className="text-gray-600 max-w-[250px] mx-auto leading-relaxed">{description}</p>
    </motion.div>
  );
};

const RoleCard = ({ icon, title, description, link }) => (
  <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
    <div className="mb-8">{icon}</div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
    <Link
      to={link}
      className="inline-flex items-center text-quanverification-brand font-bold text-lg hover:underline group"
    >
      Enter Portal <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
    </Link>
  </div>
);

export default Home;