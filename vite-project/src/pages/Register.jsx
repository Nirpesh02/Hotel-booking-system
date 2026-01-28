import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  Loader,
  Facebook,
  Chrome,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { isValidEmail, isValidPhone } from "../utils/helpers";

export const Register = ({ onNavigate }) => {
  const { register, loginWithSocial } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("⚠️ Please fill in all required fields");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("⚠️ Please enter a valid email address");
      return;
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      setError("⚠️ Please enter a valid phone number");
      return;
    }

    if (formData.password.length < 6) {
      setError("⚠️ Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const success = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone
      );

      if (success) {
        onNavigate("home");
      } else {
        setError("Registration failed. Please try again.");
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
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Card */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
        
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            HotelNepal 🏨
          </h1>
          <p className="text-white/80 mt-2">
            Create account & start booking ✨
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
          
          {/* Name */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-white/70" />
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-pink-300 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-white/70" />
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-purple-300 outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-white/70" />
              <input
                type="tel"
                placeholder="+977 9800000000"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-white/70" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-pink-300 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/70 hover:text-white"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-white/70" />

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                disabled={loading}
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-purple-300 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-white/70 hover:text-white"
              >
                {showConfirm ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-indigo-600 hover:opacity-90 shadow-lg transition flex justify-center items-center"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin mr-2" />
                Creating account...
              </>
            ) : (
              "Create Account 🚀"
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

        {/* Social Buttons */}
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

        {/* Login Link */}
        <div className="mt-8 text-center text-white/80">
          Already have an account?{" "}
          <button
            onClick={() => onNavigate("login")}
            className="font-bold text-white hover:underline"
          >
            Login ✨
          </button>
        </div>
      </div>
    </div>
  );
};
