import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Settings, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    // TODO: Implement login API call
    console.log('Login data:', data);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900" 
         style={{
           backgroundImage: `linear-gradient(to bottom, rgba(30, 58, 138, 0.9), rgba(30, 64, 175, 0.8)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><path fill="%23ffffff08" d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"/><path fill="%23ffffff05" d="M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z"/></svg>')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-white">FloatChat</h1>
        </div>
        <button className="text-white/80 hover:text-white transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-blue-100">Sign in to continue your ocean exploration</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  <span className="text-sm text-blue-100">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-green-400 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-blue-100">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-400 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;