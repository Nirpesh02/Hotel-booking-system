import React, { useState } from "react";
import {
  Mail,
  Lock,
  Loader,
  Facebook,
  Chrome,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../utils/helpers";

export const Login = ({ onNavigate }) => {
  const { login, loginWithSocial } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("⚠️ Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("⚠️ Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        onNavigate("home");
      } else {
        setError("❌ Invalid email or password");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Social Login
  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError("");

    try {
      const success = await loginWithSocial(provider);
      if (success) onNavigate("home");
    } catch {
      setError("Social login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
      {/* Card */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
        
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            HotelNepal 🏨
          </h1>
          <p className="text-white/80 mt-2">
            Login & book your dream stay ✨
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm shadow">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-white/70" />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-pink-300 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-white/70" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-purple-300 outline-none"
              />

              {/* Toggle Eye */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/70 hover:text-white"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm text-white/80">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="rounded"
              />
              <span>Remember me</span>
            </label>

            <button className="hover:text-white font-semibold">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 shadow-lg transition flex justify-center items-center"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              "Login 🚀"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/30" />
          <span className="px-3 text-white/70 text-sm">
            Or continue with
          </span>
          <div className="flex-grow border-t border-white/30" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSocialLogin("Google")}
            disabled={loading}
            className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-white text-gray-700 font-semibold hover:scale-105 transition shadow-md"
          >
            <Chrome className="h-5 w-5 text-red-500" />
            <span>Google</span>
          </button>

          <button
            onClick={() => handleSocialLogin("Facebook")}
            disabled={loading}
            className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:scale-105 transition shadow-md"
          >
            <Facebook className="h-5 w-5" />
            <span>Facebook</span>
          </button>
        </div>

        {/* Signup */}
        <div className="mt-8 text-center text-white/80">
          Don’t have an account?{" "}
          <button
            onClick={() => onNavigate("register")}
            className="font-bold text-white hover:underline"
          >
            Sign up ✨
          </button>
        </div>
      </div>
    </div>
  );
};
