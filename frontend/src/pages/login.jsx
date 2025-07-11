import React from 'react';
import { useNavigate, Link } from 'react-router';
import useLogin from '../hooks/useLogin';
import { Mail, Lock, KeyRound } from 'lucide-react';

function Login() {
  const { form, handleChange, handleLogin, loading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e);
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary p-10 text-primary-content">
        <KeyRound size={80} className="mb-4" />
        <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-lg opacity-80">
          Log in to manage your tickets and get support.
        </p>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12 bg-base-200 h-screen">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-base-content/70 mt-2">
              Enter your credentials to access your account.
            </p>
          </div>

        
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <Mail className="w-4 h-4 opacity-70" />
              <input
                type="email"
                name="email"
                className="grow w-full"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 w-full">
              <Lock className="w-4 h-4 opacity-70" />
              <input
                type="password"
                name="password"
                className="grow w-full"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <div className="flex justify-end text-xs">
              <Link to="/forgot-password" className="link link-hover">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full !mt-6"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-base-content/70">
              Don't have an account?{' '}
              <Link to="/signup" className="link link-primary font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;