import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/auth.service";
import { useNavigate, Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo/Logo";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (res) => {
      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "organizer") {
        navigate("/dashboard");
      } else {
        navigate("/events");
      }
    },

    onError: (err: any) => {
      alert(err?.response?.data?.message || "Invalid email or password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white/70 backdrop-blur">
        <div className="font-semibold text-lg flex items-center gap-2">
         <Logo/>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border bg-white/80 backdrop-blur">
            <CardContent className="p-8 space-y-6">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex justify-center"
              >
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Lock className="text-indigo-600" size={22} />
                </div>
              </motion.div>

              <div className="text-center">
                <h1 className="text-2xl font-bold">Welcome Back</h1>

                <p className="text-sm text-muted-foreground mt-1">
                  Sign in to discover what's happening in your local community
                  today.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Email Address</Label>

                  <div className="relative mt-1">
                    <Mail
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />

                    <Input
                      className="pl-10 h-11"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <Label>Password</Label>

                    <Link
                      to="/forgot-password"
                      className="text-indigo-600 hover:underline text-sm"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />

                    <Input
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10 h-11"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 text-base bg-indigo-600 hover:bg-indigo-700"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Signing in..." : "Sign In →"}
                </Button>
              </form>

              <div className="text-center text-sm">
                New to EventFinder?{" "}
                <Link to="/register" className="text-indigo-600 font-medium">
                  Create an account
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-muted-foreground mt-6 space-x-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Support</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
