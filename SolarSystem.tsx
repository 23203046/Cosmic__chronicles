import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Camera } from 'lucide-react';
import { planets } from '../data/planets';
import { VoiceAssistantHook } from '../hooks/useVoiceAssistant';
import { getPictureOfTheDay } from '../data/pictureOfTheDay';

interface SolarSystemProps {
  onPlanetClick: (planetId: string | null) => void;
  selectedPlanet: string | null;
  voiceAssistant: VoiceAssistantHook;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ 
  onPlanetClick, 
  selectedPlanet, 
  voiceAssistant 
}) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [shootingStars, setShootingStars] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  // Generate shooting stars
  useEffect(() => {
    const generateShootingStars = () => {
      const stars = [];
      for (let i = 0; i < 3; i++) {
        stars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 50,
          delay: Math.random() * 10
        });
      }
      setShootingStars(stars);
    };

    generateShootingStars();
    const interval = setInterval(generateShootingStars, 15000);
    return () => clearInterval(interval);
  }, []);

  const handlePlanetClick = (planetId: string) => {
    onPlanetClick(planetId);
    const planet = planets.find(p => p.id === planetId);
    if (planet) {
      voiceAssistant.speak(`${planet.name}: ${planet.description}`);
    }
  };

  const handlePlanetHover = (planetId: string | null) => {
    setHoveredPlanet(planetId);
    if (planetId) {
      const planet = planets.find(p => p.id === planetId);
      if (planet) {
        voiceAssistant.speak(`${planet.name}: ${planet.type}`);
      }
    }
  };

  const selectedPlanetData = selectedPlanet ? planets.find(p => p.id === selectedPlanet) : null;
  const hoveredPlanetData = hoveredPlanet ? planets.find(p => p.id === hoveredPlanet) : null;
  const todaysPicture = getPictureOfTheDay(new Date());

  return (
    <div className="min-h-screen">
      <motion.div 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Shooting Stars */}
        {shootingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            initial={{ opacity: 0, x: -100, y: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              x: [0, 300, 600],
              y: [0, 150, 300]
            }}
            transition={{
              duration: 3,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 12
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-20 h-0.5 -translate-x-10" />
          </motion.div>
        ))}

        {/* Sun */}
        <motion.div
          className="absolute w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl shadow-yellow-500/50 z-10"
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 40px rgba(251, 191, 36, 0.5)',
              '0 0 60px rgba(251, 191, 36, 0.8)',
              '0 0 40px rgba(251, 191, 36, 0.5)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Planetary Orbits */}
        {planets.map((planet, index) => (
          <div key={planet.id}>
            {/* Orbit Ring */}
            <motion.div
              className="absolute border border-white/10 rounded-full"
              style={{
                width: `${planet.orbitRadius * 2}px`,
                height: `${planet.orbitRadius * 2}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            
            {/* Planet Container */}
            <motion.div
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: planet.speed,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Planet */}
              <motion.div
                className={`w-${planet.size} h-${planet.size} rounded-full shadow-lg cursor-pointer ${planet.color} relative group`}
                style={{
                  width: `${planet.size}px`,
                  height: `${planet.size}px`,
                  transform: `translateX(${planet.orbitRadius}px)`,
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePlanetClick(planet.id)}
                onMouseEnter={() => handlePlanetHover(planet.id)}
                onMouseLeave={() => handlePlanetHover(null)}
              >
                {/* Planet Name Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  {planet.name}
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}

        {/* Hover Info Panel */}
        <AnimatePresence>
          {hoveredPlanetData && !selectedPlanet && (
            <motion.div
              className="absolute top-4 left-4 bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/20 max-w-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-8 h-8 rounded-full ${hoveredPlanetData.color}`} />
                <div>
                  <h3 className="text-lg font-bold text-white">{hoveredPlanetData.name}</h3>
                  <p className="text-sm text-gray-400">{hoveredPlanetData.type}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{hoveredPlanetData.description.substring(0, 100)}...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Planet Details Modal */}
        <AnimatePresence>
          {selectedPlanetData && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onPlanetClick(null)}
            >
              <motion.div
                className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full ${selectedPlanetData.color}`} />
                    <div>
                      <h2 className="text-3xl font-bold text-white">{selectedPlanetData.name}</h2>
                      <p className="text-gray-400">{selectedPlanetData.type}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => voiceAssistant.speak(`${selectedPlanetData.name}: ${selectedPlanetData.description}`)}
                      className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
                    >
                      <Volume2 size={20} />
                    </button>
                    <button
                      onClick={() => onPlanetClick(null)}
                      className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">Overview</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedPlanetData.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPlanetData.facts.map((fact, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-300 mb-1">{fact.label}</h4>
                        <p className="text-white">{fact.value}</p>
                      </div>
                    ))}
                  </div>

                  {selectedPlanetData.funFacts && (
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-green-300">Fun Facts</h3>
                      <ul className="space-y-2">
                        {selectedPlanetData.funFacts.map((fact, index) => (
                          <li key={index} className="text-gray-300 flex items-start">
                            <span className="text-green-400 mr-2">•</span>
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Picture of the Day Section */}
      <motion.div
        className="container mx-auto p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Camera size={32} className="text-blue-400" />
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Astronomy Picture of the Day
                </h2>
                <p className="text-gray-400">{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
            <button
              onClick={() => voiceAssistant.speak(`Today's astronomy picture: ${todaysPicture.title}. ${todaysPicture.description}`)}
              className="p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-xl transition-colors"
            >
              <Volume2 size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative group">
              <img
                src={todaysPicture.image}
                alt={todaysPicture.title}
                className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">{todaysPicture.title}</h3>
              <p className="text-gray-300 leading-relaxed">{todaysPicture.description}</p>
              
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {todaysPicture.category}
                </span>
                <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                  {todaysPicture.type}
                </span>
              </div>

              {todaysPicture.facts && (
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="font-semibold text-green-300 mb-2">Did You Know?</h4>
                  <ul className="space-y-1">
                    {todaysPicture.facts.map((fact, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SolarSystem;