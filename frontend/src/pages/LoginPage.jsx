import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Loader2, MessageSquare, Lock } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
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

              <h1 className="text-2xl font-bold mt-2">Login to your account</h1>
              <p className="text-base-content/60">Welcome back</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 flex justify-center items-center flex-col"
          >
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input w-full input-md input-bordered pr-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  autoComplete="new-password"
                  style={{ WebkitTextSecurity: showPassword ? "none" : "disc" }}
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-1/2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className=" size-5 animate-spin" />
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account ?{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right */}
      <AuthImagePattern
        title="Welcome back !"
        subtitle="Connect with friends, share momments, and stay in touch with your loved ones"
      />
    </div>
  );
}
