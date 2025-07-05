import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Search, Volume2, Gift, Cake, Rocket, Users, MapPin, Award, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { getAstronomicalEvent } from '../data/astronomicalEvents';
import { VoiceAssistantHook } from '../hooks/useVoiceAssistant';

interface BirthdayInSpaceProps {
  voiceAssistant: VoiceAssistantHook;
}

const BirthdayInSpace: React.FC<BirthdayInSpaceProps> = ({ voiceAssistant }) => {
  const [birthDate, setBirthDate] = useState('');
  const [spaceEvent, setSpaceEvent] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleDateSearch = () => {
    if (!birthDate) return;
    
    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const date = new Date(birthDate);
      const event = getAstronomicalEvent(date);
      setSpaceEvent(event);
      setShowResult(true);
      setIsSearching(false);
      
      if (event) {
        voiceAssistant.speak(
          `On your birthday, ${format(date, 'MMMM do')}, in ${event.year}, ${event.title} occurred. ${event.description}`
        );
      } else {
        voiceAssistant.speak(
          `While we don't have a specific space event recorded for your exact birthday, every day in space history is special!`
        );
      }
    }, 1500);
  };

  const resetSearch = () => {
    setBirthDate('');
    setSpaceEvent(null);
    setShowResult(false);
  };

  const getAgeOnPlanets = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const earthYears = (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    
    return {
      mercury: Math.floor(earthYears / 0.24),
      venus: Math.floor(earthYears / 0.62),
      mars: Math.floor(earthYears / 1.88),
      jupiter: Math.floor(earthYears / 11.86),
      saturn: Math.floor(earthYears / 29.46),
      uranus: Math.floor(earthYears / 84.01),
      neptune: Math.floor(earthYears / 164.8)
    };
  };

  const planetAges = birthDate ? getAgeOnPlanets(birthDate) : null;

  return (
    <motion.div
      className="container mx-auto p-4 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Birthday in Space
        </h2>
        <p className="text-gray-400">Discover what amazing space event happened on your birthday!</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {!showResult ? (
          // Birthday Input
          <motion.div
            className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="mb-8">
              <div className="text-6xl mb-4">🎂</div>
              <h3 className="text-2xl font-bold text-white mb-2">Enter Your Birthday</h3>
              <p className="text-gray-400">Let's find out what cosmic event shares your special day!</p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="relative">
                <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <motion.button
                onClick={handleDateSearch}
                disabled={!birthDate || isSearching}
                className={`w-full flex items-center justify-center space-x-2 py-4 rounded-xl transition-all font-semibold ${
                  !birthDate || isSearching
                    ? 'bg-gray-600/20 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300'
                }`}
                whileHover={!birthDate || isSearching ? {} : { scale: 1.02 }}
                whileTap={!birthDate || isSearching ? {} : { scale: 0.98 }}
              >
                {isSearching ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Searching the cosmos...</span>
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    <span>Discover My Space Birthday</span>
                  </>
                )}
              </motion.button>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <p>We'll search through decades of space history to find events that happened on your birthday!</p>
            </div>
          </motion.div>
        ) : (
          // Results
          <div className="space-y-8">
            {/* Main Event */}
            <motion.div
              className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Gift size={32} className="text-purple-400" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">Your Space Birthday Event</h3>
                    <p className="text-gray-400">{format(new Date(birthDate), 'MMMM do, yyyy')}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => spaceEvent && voiceAssistant.speak(`${spaceEvent.title}. ${spaceEvent.description}`)}
                    className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
                  >
                    <Volume2 size={20} />
                  </button>
                  <button
                    onClick={resetSearch}
                    className="px-4 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 rounded-lg transition-colors"
                  >
                    Try Another Date
                  </button>
                </div>
              </div>

              {spaceEvent ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">{spaceEvent.title}</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">{spaceEvent.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                        {spaceEvent.year}
                      </span>
                      <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {spaceEvent.category}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users size={16} className="text-green-400" />
                        <h5 className="font-semibold text-green-300">Key People</h5>
                      </div>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {spaceEvent.peopleInvolved?.slice(0, 3).map((person: string, index: number) => (
                          <li key={index}>• {person}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin size={16} className="text-orange-400" />
                        <h5 className="font-semibold text-orange-300">Location</h5>
                      </div>
                      <p className="text-gray-300 text-sm">{spaceEvent.location}</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock size={16} className="text-blue-400" />
                        <h5 className="font-semibold text-blue-300">Duration</h5>
                      </div>
                      <p className="text-gray-300 text-sm">{spaceEvent.duration || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Award size={20} className="text-yellow-400" />
                      <h5 className="font-semibold text-yellow-300">Key Achievements</h5>
                    </div>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {spaceEvent.achievements?.slice(0, 4).map((achievement: string, index: number) => (
                        <li key={index}>• {achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h5 className="font-semibold text-purple-300 mb-2">Historical Significance</h5>
                    <p className="text-gray-300 text-sm">{spaceEvent.historicalSignificance}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🌟</div>
                  <h4 className="text-xl font-semibold text-white mb-2">Every Day is Special in Space!</h4>
                  <p className="text-gray-300">
                    While we don't have a specific recorded event for your birthday, remember that every day 
                    brings new discoveries and achievements in space exploration. Your birthday is part of 
                    humanity's ongoing cosmic journey!
                  </p>
                </div>
              )}
            </motion.div>

            {/* Age on Other Planets */}
            {planetAges && (
              <motion.div
                className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-white/10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Rocket size={24} className="text-orange-400" />
                  <h3 className="text-xl font-bold text-white">Your Age Across the Solar System</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {[
                    { name: 'Mercury', age: planetAges.mercury, emoji: '☿️', color: 'from-gray-400 to-yellow-600' },
                    { name: 'Venus', age: planetAges.venus, emoji: '♀️', color: 'from-yellow-400 to-orange-500' },
                    { name: 'Mars', age: planetAges.mars, emoji: '♂️', color: 'from-red-600 to-orange-600' },
                    { name: 'Jupiter', age: planetAges.jupiter, emoji: '♃', color: 'from-orange-400 to-yellow-600' },
                    { name: 'Saturn', age: planetAges.saturn, emoji: '♄', color: 'from-yellow-300 to-orange-400' },
                    { name: 'Uranus', age: planetAges.uranus, emoji: '♅', color: 'from-cyan-400 to-blue-500' },
                    { name: 'Neptune', age: planetAges.neptune, emoji: '♆', color: 'from-blue-600 to-indigo-700' }
                  ].map((planet) => (
                    <motion.div
                      key={planet.name}
                      className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl mb-2">{planet.emoji}</div>
                      <div className="text-lg font-bold text-white">{planet.age}</div>
                      <div className="text-sm text-gray-400">{planet.name}</div>
                      <div className="text-xs text-gray-500 mt-1">years old</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center text-gray-400 text-sm">
                  <p>Your age is calculated based on each planet's orbital period around the Sun!</p>
                </div>
              </motion.div>
            )}

            {/* Fun Birthday Facts */}
            <motion.div
              className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-white/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Cake size={24} className="text-pink-400" />
                <h3 className="text-xl font-bold text-white">Space Birthday Fun Facts</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl mb-2">🚀</div>
                  <h4 className="font-semibold text-white mb-2">Space Birthdays</h4>
                  <p className="text-gray-400 text-sm">
                    Astronauts on the ISS celebrate birthdays in zero gravity with floating cake crumbs!
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl mb-2">🌍</div>
                  <h4 className="font-semibold text-white mb-2">Earth Rotations</h4>
                  <p className="text-gray-400 text-sm">
                    Since your birth, Earth has completed {planetAges ? Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24)) : 0} rotations!
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl mb-2">⭐</div>
                  <h4 className="font-semibold text-white mb-2">Stellar Journey</h4>
                  <p className="text-gray-400 text-sm">
                    Our solar system has traveled millions of miles through the galaxy since your birthday!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BirthdayInSpace;