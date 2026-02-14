import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronUp, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [activeTab, setActiveTab] = useState('app'); // 'app' or 'password'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Mock Authentication based on requirements
    if (email === 'user@gmail.com' && password === 'User@123') {
      localStorage.setItem('user', JSON.stringify({ email, role: 'user', name: 'John Doe' }));
      navigate('/dashboard/user', { replace: true });
    } else if (email === 'school@gmail.com' && password === 'School@123') {
      localStorage.setItem('user', JSON.stringify({ email, role: 'verifier', name: 'Global University' }));
      navigate('/dashboard/verifier', { replace: true });
    } else if (email === 'company@gmail.com' && password === 'Company@123') {
      localStorage.setItem('user', JSON.stringify({ email, role: 'company', name: 'Tech Corp' }));
      navigate('/dashboard/company', { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Alert Banner */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-8">
        <div className="bg-quanverification-light-brand border-l-4 border-quanverification-brand p-6 relative">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h2 className="text-[24px] font-bold text-gray-800 flex items-center">
                Beware of fake QuanVerification emails <ChevronUp className="ml-2 text-quanverification-brand" size={24} />
              </h2>
              <p className="text-[15px] text-gray-700 mt-2 max-w-[900px]">
                Received an email about failed login attempts? It may be a scam. Do not click on any links without checking. Hover your cursor over hyperlinks to verify the destination URL. Official QuanVerification emails are sent from addresses ending with the &quot;.gov.sg&quot; domain. Report suspicious emails to QuanVerification.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Illustration & Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-quanverification-brand rounded-full flex items-center justify-center text-white">
              <div className="relative">
                <div className="w-8 h-8 border-2 border-white rounded-t-full"></div>
                <div className="w-8 h-4 bg-white mt-1 rounded-sm"></div>
              </div>
            </div>
            <div>
              <h1 className="text-[32px] font-bold text-gray-900">Log in with QuanVerification</h1>
              <p className="text-[18px] text-gray-600">Your trusted digital identity</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Box */}
        <div className="flex flex-col space-y-4">
          <div className="bg-white rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden w-full max-w-[440px] ml-auto">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab('app')}
                className={`flex-1 py-4 text-[14px] font-bold transition-all relative ${activeTab === 'app' ? 'text-quanverification-brand' : 'text-gray-400'}`}
              >
                QuanVerification app
                {activeTab === 'app' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-quanverification-brand"></div>}
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`flex-1 py-4 text-[14px] font-bold transition-all relative ${activeTab === 'password' ? 'text-quanverification-brand' : 'text-gray-400'}`}
              >
                Password login
                {activeTab === 'password' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-quanverification-brand"></div>}
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'app' ? (
                <div className="flex flex-col items-center space-y-6">
                  <h3 className="text-[16px] font-bold text-gray-800 text-center">Scan with QuanVerification app to log in</h3>
                  <div className="p-4 border-2 border-quanverification-brand rounded-xl relative">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=quanverification-login-mock"
                      alt="QR Code"
                      className="w-[180px] h-[180px]"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg shadow-md border border-gray-100">
                      <div className="w-8 h-8 bg-quanverification-brand rounded flex items-center justify-center text-white font-black text-xs">i</div>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-[20px] font-black text-quanverification-brand tracking-tighter">QuanVerification</div>
                    <div className="space-y-3">
                      <Link to="/register" className="block text-[14px] font-medium text-quanverification-brand hover:underline">Register for QuanVerification</Link>
                      <button className="block w-full text-[14px] font-medium text-quanverification-brand hover:underline">Download QuanVerification app</button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-6">
                  {error && (
                    <div className="bg-quanverification-light-brand text-quanverification-brand p-3 rounded text-sm font-medium border border-quanverification-brand/20">
                      {error}
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[14px] font-bold text-gray-800">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. user@gmail.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-quanverification-brand text-[15px]"
                        required
                      />
                    </div>
                    <div className="space-y-2 relative">
                      <label className="text-[14px] font-bold text-gray-800">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-quanverification-brand text-[15px] pr-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-quanverification-brand text-white font-bold py-3 rounded hover:bg-quanverification-dark-brand transition-colors"
                  >
                    Log in
                  </button>

                  <div className="flex justify-between items-center pt-2">
                    <button type="button" className="text-[14px] font-medium text-quanverification-brand hover:underline">Retrieve ID</button>
                    <button type="button" className="text-[14px] font-medium text-quanverification-brand hover:underline">Reset password</button>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <Link
                      to="/register"
                      className="block w-full text-center py-3 border-2 border-gray-800 font-bold rounded hover:bg-gray-50 transition-colors"
                    >
                      Register for QuanVerification
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;