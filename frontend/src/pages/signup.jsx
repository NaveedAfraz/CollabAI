import React from 'react';
import { useNavigate, Link } from 'react-router';
import useSignUp from '../hooks/useSignUp';
import { User, Mail, Lock, PartyPopper } from 'lucide-react';

function Signup() {
  const { form, handleChange, handleSignup, loading } = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    handleSignup(e);
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary p-10 text-primary-content">
        <PartyPopper size={80} className="mb-4" />
        <h1 className="text-4xl font-bold mb-2">Join Our Community</h1>
        <p className="text-lg opacity-80">
          Create an account to start managing your tickets.
        </p>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12 bg-base-200">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-base-content/70 mt-2">
              Let's get you started with a new account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <label className="input input-bordered flex items-center gap-2 w-full">
              <User className="w-4 h-4 opacity-70 " />
              <input
                type="text"
                name="fullName"
                className="grow"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </label> */}

            <label className="input input-bordered flex items-center gap-2 w-full">
              <Mail className="w-4 h-4 opacity-70" />
              <input
                type="email"
                name="email"
                className="grow"
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
                className="grow"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 w-full">
              <Lock className="w-4 h-4 opacity-70" />
              <input
                type="password"
                name="confirmPassword"
                className="grow"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>

            <button
              type="submit"
              className="btn btn-primary w-full !mt-6"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-base-content/70">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;