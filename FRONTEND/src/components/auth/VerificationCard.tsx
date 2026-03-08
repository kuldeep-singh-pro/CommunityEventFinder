import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { verifyOTP } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function VerificationCard({ email }: any) {
  const navigate = useNavigate();

  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const mutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Invalid OTP");
    },
  });

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    mutation.mutate({
      email,
      code: otp.join(""),
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6 text-center space-y-4">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center"
          >
            <ShieldCheck size={36} className="text-indigo-600" />
          </motion.div>

          <h3 className="text-lg font-semibold">Verification Required</h3>

          <p className="text-sm text-gray-500">
            We've sent a 6-digit code to your email.
          </p>

          <div className="flex justify-center gap-2">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                maxLength={1}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-11 h-11 text-center text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            ))}
          </div>

          <Button
            onClick={handleVerify}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700"
          >
            Verify Code
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
