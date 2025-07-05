import React from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, Clock, Mouse as Museum, Map, Gamepad2, Video, User, Camera, Calculator, Users, Zap, Gift } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: 'events' | 'solar-system' | 'timeline' | 'museum' | 'starmap' | 'games' | 'videos' | 'avatar' | 'gallery' | 'whatif' | 'birthday' | 'calculator' | 'women') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'solar-system', label: 'Solar System', icon: Home, color: 'from-blue-500 to-cyan-500' },
    { id: 'timeline', label: 'Timeline', icon: Clock, color: 'from-green-500 to-emerald-500' },
    { id: 'museum', label: 'Museum', icon: Museum, color: 'from-purple-500 to-violet-500' },
    { id: 'starmap', label: 'Star Map', icon: Map, color: 'from-yellow-500 to-orange-500' },
    { id: 'games', label: 'Games', icon: Gamepad2, color: 'from-red-500 to-pink-500' },
    { id: 'videos', label: 'Videos', icon: Video, color: 'from-teal-500 to-cyan-500' },
    { id: 'avatar', label: 'Avatar Guide', icon: User, color: 'from-orange-500 to-red-500' },
    { id: 'gallery', label: 'Gallery', icon: Camera, color: 'from-pink-500 to-rose-500' },
    { id: 'whatif', label: 'What If', icon: Zap, color: 'from-violet-500 to-purple-500' },
    { id: 'birthday', label: 'Birthday', icon: Gift, color: 'from-emerald-500 to-green-500' },
    { id: 'calculator', label: 'Calculator', icon: Calculator, color: 'from-cyan-500 to-blue-500' },
    { id: 'women', label: 'Women in Space', icon: Users, color: 'from-rose-500 to-pink-500' },
    { id: 'events', label: 'Daily Events', icon: Calendar, color: 'from-amber-500 to-yellow-500' },
  ];

  return (
    <header className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Title in center */}
          <div className="flex-1"></div>
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Cosmic Chronicles
          </motion.h1>
          <div className="flex-1"></div>
        </div>
        
        {/* Navigation Grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-6xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.id as any)}
                className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all border ${
                  currentView === item.id
                    ? 'bg-white/20 border-white/30 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} shadow-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-xs text-center text-gray-300 font-medium leading-tight">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;