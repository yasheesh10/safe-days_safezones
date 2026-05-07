import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-[#020617] flex items-center justify-center z-50">

      {/* Shield Icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-cyan-400"
      >
        <Shield size={80} />
      </motion.div>

      {/* Pulse Ring */}
      <motion.div
        className="absolute w-40 h-40 border border-cyan-400 rounded-full"
        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

    </div>
  );
}