import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface VoiceAssistantProps {
  isActive: boolean;
  isSpeaking: boolean;
  speak: (text: string) => void;
  stop: () => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ 
  isActive, 
  isSpeaking, 
  speak, 
  stop 
}) => {
  return (
    <AnimatePresence>
      {isSpeaking && (
        <motion.div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex items-center space-x-4">
            <motion.div
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <Volume2 size={24} className="text-white" />
            </motion.div>
            
            <div className="text-white">
              <p className="font-semibold">Voice Assistant Speaking...</p>
              <p className="text-sm text-gray-400">Click to stop</p>
            </div>
            
            <button
              onClick={stop}
              className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors"
            >
              <VolumeX size={20} className="text-red-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAssistant;