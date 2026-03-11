import { motion } from "framer-motion";
import { useState } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import VerificationCard from "@/components/auth/VerificationCard";
import AnimatedCommunityCard from "@/components/auth/AnimatedCommunityCard";
import Logo from "@/components/logo/Logo";

export default function Register() {
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white/70 backdrop-blur">
        <div className="font-semibold text-lg flex items-center gap-2">
          <Logo />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          <RegisterForm setEmail={setEmail} setShowOTP={setShowOTP} />

          <div className="space-y-6">
            {showOTP ? (
              <VerificationCard email={email} />
            ) : (
              <AnimatedCommunityCard />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
