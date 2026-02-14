import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* Top Logo */}
        <div className="mb-16">
          <div className="text-[28px] font-black tracking-tighter">QuanVerification</div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          {/* About */}
          <div className="space-y-6">
            <h3 className="text-[22px] font-bold">About</h3>
            <ul className="space-y-4 text-[15px]">
              <li><Link to="/about" className="hover:underline text-white/90">QuanVerification</Link></li>
              <li><Link to="/careers" className="hover:underline text-white/90">Careers</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="space-y-6 lg:col-span-2">
            <h3 className="text-[22px] font-bold">Help & Support</h3>
            <ul className="space-y-4 text-[15px]">
              <li><Link to="/contact" className="hover:underline text-white/90 text-left">Contact us</Link></li>
              <li>
                <Link to="/support" className="hover:underline text-white/90 flex items-center gap-2 text-left">
                  Help Centre & FAQs <ExternalLink size={14} className="opacity-70" />
                </Link>
              </li>
              <li><button className="hover:underline text-white/90 text-left">Security</button></li>
              <li>
                <button className="hover:underline text-white/90 flex items-center gap-2 text-left leading-tight">
                  How to register for QuanVerification (PDF) <ExternalLink size={14} className="opacity-70" />
                </button>
              </li>
            </ul>
          </div>

          {/* Media */}
          <div className="space-y-6">
            <h3 className="text-[22px] font-bold">Media</h3>
            <ul className="space-y-4 text-[15px]">
              <li>
                <button className="hover:underline text-white/90 flex items-center gap-2 text-left">
                  Blog <ExternalLink size={14} className="opacity-70" />
                </button>
              </li>
              <li><button className="hover:underline text-white/90 text-left">Newsroom</button></li>
            </ul>
          </div>

          {/* App Store Buttons */}
          <div className="lg:col-span-1 flex flex-col sm:flex-row md:flex-col lg:flex-row xl:flex-col gap-4 items-start">
            <FooterAppButton
              icon={<AppleIcon />}
              platform="App Store"
              badge="Download on the"
            />
            <FooterAppButton
              icon={<PlayStoreIcon />}
              platform="Google Play"
              badge="GET IT ON"
            />
            <FooterAppButton
              icon={<HuaweiIcon />}
              platform="AppGallery"
              badge="EXPLORE IT ON"
            />
          </div>
        </div>

        {/* Secondary Links Row */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12 py-8 border-t border-white/10 text-[15px] font-medium">
          <button className="hover:underline flex items-center gap-1.5">
            Developers Portal <ExternalLink size={14} className="opacity-60" />
          </button>
          <button className="hover:underline">Terms of use</button>
          <button className="hover:underline">Privacy statement</button>
          <button className="hover:underline flex items-center gap-1.5">
            Report vulnerability <ExternalLink size={14} className="opacity-60" />
          </button>
        </div>

        {/* Bottom Section: Logos & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
            {/* Powered By */}
            <div className="flex items-center gap-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 leading-tight">
                POWERED BY
              </div>
              <div className="flex items-center gap-2">
                <GovTechLogo />
                <div className="text-[13px] font-black leading-[1.1]">GOVTECH<br /><span className="text-[10px] font-medium tracking-[0.2em]">INDIA</span></div>
              </div>
            </div>

            {/* In Support Of */}
            <div className="flex items-center gap-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 leading-tight">
                IN SUPPORT OF
              </div>
              <div className="flex items-center gap-2">
                <SmartNationLogo />
                <div className="text-[13px] font-black leading-[1.1]">SMART<br />NATION<br /><span className="text-[10px] font-medium tracking-[0.2em]">INDIA</span></div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-right text-[14px] text-white/70">
            © Government of India • Last updated at 25 Nov 2025
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterAppButton = ({ icon, platform, badge }) => (
  <button className="w-full sm:w-[170px] border border-white/30 hover:border-white rounded-lg p-2 flex items-center gap-2 transition-colors">
    <div className="flex-shrink-0">{icon}</div>
    <div className="text-left">
      <div className="text-[9px] uppercase leading-tight opacity-80">{badge}</div>
      <div className="text-[15px] font-bold leading-tight">{platform}</div>
    </div>
  </button>
);

const AppleIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 384 512">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-19.1-76.9-19.1-36.5 0-69.8 20.1-88.5 52.8-38.5 67.2-9.9 166.4 27.5 220.3 18.3 26.4 40.4 56 68.8 55 27.1-1 37.1-17.4 69.8-17.4 32.7 0 42 17.4 70.3 16.9 29.1-.5 48.6-26.9 66.8-53.4 20.9-30.7 29.5-60.5 29.8-62.1-.7-.3-57-21.7-57.2-84.3zM229.1 82.2c15.1-18.8 25.1-44.5 22.3-70.2-22 .9-48.6 14.6-64.3 33-14.3 16.6-26.7 43.1-23.3 67.8 24.3 1.9 49.3-12.4 65.3-30.6z" />
  </svg>
);

const PlayStoreIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 512 512">
    <path fill="#3bccff" d="M104.6 13L47 70.1v371.8l57.6 57.1 220.7-221.3z" />
    <path fill="#00e1a0" d="M405 310.3l-79.7-44.3-60.1 60.1z" />
    <path fill="#ffd400" d="M405 201.7l54.3 31.2c16.1 9.2 16.1 24.4 0 33.7L405 310.3l-57.7-54.3z" />
    <path fill="#ff3a44" d="M405 201.7L104.6 13l220.7 221.3z" />
  </svg>
);

const HuaweiIcon = () => (
  <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center text-[10px] font-black">H</div>
);

const GovTechLogo = () => (
  <div className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current">
      <path d="M50 0 L100 50 L50 100 L0 50 Z" className="opacity-40" />
      <path d="M50 10 L90 50 L50 90 L100 50 Z" />
      <path d="M50 10 L10 50 L50 90 L0 50 Z" />
    </svg>
  </div>
);

const SmartNationLogo = () => (
  <div className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current">
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="2" />
    </svg>
  </div>
);

export default Footer;
