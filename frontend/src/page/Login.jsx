import {
    ArrowRight,
    CheckSquare,
    Eye,
    EyeOff,
    Globe,
    Loader,
    Lock,
    Mail,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { setCurrentUser } from '../auth/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const fakeSocialLogin = (provider) => {
    alert(`🔄 Đang chuyển hướng đến ${provider}... (Demo)`);
  };

  const forgotPassword = () => {
    const email = formData.email;
    if (email) {
      alert(`📧 Link khôi phục mật khẩu đã được gửi đến ${email}`);
    } else {
      alert('Vui lòng nhập email trước khi khôi phục mật khẩu');
    }
  };

  const goToRegister = (e) => {
    e?.preventDefault?.();
    navigate('/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      alert('Vui lòng nhập đầy đủ email và mật khẩu!');
      return;
    }

    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const res = await fetch(`${baseUrl}/api/users/login`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Đăng nhập thất bại');
      }

      const user = await res.json();
      setCurrentUser(user);

      alert('✅ Đăng nhập thành công!');
      if (!remember) {
        setFormData({ email: '', password: '' });
      }

      navigate('/');
    } catch (err) {
      alert(`❌ ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tail-container bg-[#fff0f5] min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/70 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md border border-white/60">
              <CheckSquare className="w-7 h-7 text-pink-400" />
            </div>
            <div>
              <h1
                className="text-4xl font-semibold text-gray-800 tracking-tight"
                style={{ fontFamily: 'Playfair Display, sans-serif' }}
              >
                ToDoList
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Quản lý công việc thông minh</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">Chào mừng trở lại</h2>
            <p className="text-gray-500 text-center text-sm mb-8">Đăng nhập để tiếp tục quản lý công việc</p>

            <form id="loginForm" onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-focus w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none text-gray-800 placeholder-gray-400"
                    placeholder="ban@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Mật khẩu
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      forgotPassword();
                    }}
                    className="text-xs text-pink-500 hover:underline font-medium"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-focus w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none text-gray-800 placeholder-gray-400"
                    placeholder="••••••••"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 accent-pink-400 rounded border-gray-300"
                  />
                  <label htmlFor="remember" className="text-gray-600 cursor-pointer">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-gradient w-full py-4 rounded-2xl text-white font-semibold text-lg shadow-lg flex items-center justify-center gap-2 hover:brightness-105 transition-all disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    Đang đăng nhập...
                  </span>
                ) : (
                  <>
                    <span>Đăng nhập</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Register link */}
          <div className="px-8 py-6 bg-white/60 border-t border-white/70 text-center">
            <p className="text-gray-600 text-sm">
              Chưa có tài khoản?{' '}
              <a
                href="#"
                onClick={goToRegister}
                className="text-pink-500 font-semibold hover:underline"
              >
                Đăng ký ngay
              </a>
            </p>
          </div>

          {/* Social login */}
          <div className="px-8 py-6">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#fff0f5] px-4 text-gray-400">hoặc đăng nhập với</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fakeSocialLogin('Google')}
                className="flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 hover:border-gray-300 rounded-2xl transition-all text-sm font-medium"
              >
                <Globe className="w-5 h-5 text-red-500" />
                Google
              </button>
              <button
                type="button"
                onClick={() => fakeSocialLogin('Facebook')}
                className="flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 hover:border-gray-300 rounded-2xl transition-all text-sm font-medium"
              >
                <Globe className="w-5 h-5 text-blue-600" />
                Facebook
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-xs text-gray-400">© 2026 ToDoList • Đăng nhập an toàn</div>
      </div>

      {/* Local styles to match the original HTML */}
      <style>{`
        .tail-container { font-family: 'Inter', system-ui, sans-serif; }
        .glass { background: rgba(255, 255, 255, 0.88); backdrop-filter: blur(16px); }
        .input-focus { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .input-focus:focus { box-shadow: 0 0 0 4px rgba(251, 146, 154, 0.2); border-color: #fb929a; }
        .btn-gradient { background: linear-gradient(90deg, #fb929a, #60a5fa); transition: all 0.3s ease; }
        .btn-gradient:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(251, 146, 154, 0.3); }
      `}</style>
    </div>
  );
};

export default Login;

