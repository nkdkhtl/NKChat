import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signUp(formData);
    }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-wd space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>

              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 flex justify-center items-center flex-col"
          >
            <div className="form-control w-1/2">
              <label className="floating-label relative">
                <span>Full Name</span>
                <div className="absolute right-2 z-10 inset-y-0 pl-3 flex items-center justify-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  placeholder="Nam Khuc"
                  className="input w-full input-md input-bordered"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="form-control w-1/2">
              <label className="floating-label relative ">
                <span>Email</span>
                <div className="absolute right-2 z-10 inset-y-0 pl-3 flex items-center justify-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  placeholder="namkhuc@gmail.com"
                  className="input w-full input-md input-bordered"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="form-control w-1/2">
              <label className="floating-label relative ">
                <span>Password</span>
                <div className="absolute right-2 z-10 inset-y-0 pl-3 flex items-center justify-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={"password"}
                  placeholder="Enter your password"
                  className="input w-full input-md input-bordered pr-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-1/2"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className=" size-5 animate-spin" />
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account ?{" "}
              <Link to="/login" className="link link-primary">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share momments, and stay in touch with your loved ones"
      />
    </div>
  );
}
