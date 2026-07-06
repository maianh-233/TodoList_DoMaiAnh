import {
  ArrowRight,
  CheckSquare,
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (!acceptedTerms) {
      alert('Vui lòng đồng ý điều khoản!');
      return;
    }

    setIsLoading(true);

    try {
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

      const res = await fetch(`${baseUrl}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Đăng ký thất bại');
      }

      alert('✅ Đăng ký thành công!');
      setFormData({ username: '', email: '', password: '' });
      setAcceptedTerms(false);
    } catch (err) {
      alert(`❌ ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  const goToLogin = (e) => {
    e?.preventDefault?.();
    navigate('/login');
  };

  return (
    <div className="tail-container bg-[#fff0f5] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header giống Login */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/70 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md border border-white/60">
              <CheckSquare className="w-7 h-7 text-pink-400" />
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-gray-800">
                ToDoList
              </h1>
              <p className="text-xs text-gray-500 -mt-1">
                Quản lý công việc thông minh
              </p>
            </div>
          </div>
        </div>

        {/* Card glass giống Login */}
        <div className="glass rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
          <div className="px-8 pt-8 pb-6">

            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
              Tạo tài khoản
            </h2>
            <p className="text-gray-500 text-center text-sm mb-8">
              Bắt đầu quản lý công việc ngay ✨
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Username */}
              <div>
                <label className="label">
                  <User className="icon" />
                  Tên người dùng
                </label>
                <input
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-focus w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl"
                  placeholder="Mai Anh 💕"
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <Mail className="icon" />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-focus w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl"
                  placeholder="email@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="label">
                  <Lock className="icon" />
                  Mật khẩu
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="input-focus w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl pr-12"
                    placeholder="••••••••"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="accent-pink-400"
                />
                Tôi đồng ý điều khoản & chính sách
              </div>

              {/* Button giống Login */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-gradient w-full py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Đang tạo tài khoản...
                  </>
                ) : (
                  <>
                    Đăng ký
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer giống Login */}
          <div className="px-8 py-6 bg-white/60 border-t border-white/70 text-center">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <span className="text-pink-500 font-semibold cursor-pointer hover:underline">
                              Chưa có tài khoản?{' '}
                  <a
                    onClick={goToLogin}
                  >
                    Đăng nhập
                  </a>
            
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* style dùng chung với Login */}
      <style>{`
        .tail-container { font-family: 'Inter', sans-serif; }
        .glass { background: rgba(255,255,255,0.88); backdrop-filter: blur(16px); }
        .input-focus { transition: 0.3s; }
        .input-focus:focus { box-shadow: 0 0 0 4px rgba(251,146,154,0.2); border-color:#fb929a; }
        .btn-gradient { background: linear-gradient(90deg,#fb929a,#60a5fa); }
        .btn-gradient:hover { transform: translateY(-2px); }
        .label { display:flex; gap:6px; align-items:center; font-size:14px; font-weight:500; color:#374151; margin-bottom:6px; }
        .icon { width:16px; height:16px; }
      `}</style>
    </div>
  );
};

export default Register;