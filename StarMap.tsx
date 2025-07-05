import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, Moon, Sun } from 'lucide-react';
import { format } from 'date-fns';

const StarMap: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState({ lat: 40.7128, lng: -74.0060, name: 'New York' });
  const [timeOfDay, setTimeOfDay] = useState(20); // 8 PM default

  // Location-specific constellation data
  const getConstellationsForLocation = (location: string) => {
    const constellationData = {
      'New York': [
        { name: 'Ursa Major', stars: 7, visible: true, brightness: 85, season: 'Spring' },
        { name: 'Orion', stars: 8, visible: timeOfDay >= 18 || timeOfDay <= 6, brightness: 92, season: 'Winter' },
        { name: 'Cassiopeia', stars: 5, visible: true, brightness: 78, season: 'Fall' },
        { name: 'Leo', stars: 6, visible: timeOfDay >= 20 || timeOfDay <= 4, brightness: 65, season: 'Spring' },
        { name: 'Cygnus', stars: 9, visible: timeOfDay >= 19 || timeOfDay <= 5, brightness: 72, season: 'Summer' },
        { name: 'Boötes', stars: 8, visible: timeOfDay >= 21 || timeOfDay <= 3, brightness: 68, season: 'Spring' },
      ],
      'London': [
        { name: 'Ursa Major', stars: 7, visible: true, brightness: 80, season: 'Spring' },
        { name: 'Orion', stars: 8, visible: timeOfDay >= 17 || timeOfDay <= 7, brightness: 88, season: 'Winter' },
        { name: 'Cassiopeia', stars: 5, visible: true, brightness: 82, season: 'Fall' },
        { name: 'Draco', stars: 9, visible: true, brightness: 70, season: 'Summer' },
        { name: 'Perseus', stars: 7, visible: timeOfDay >= 18 || timeOfDay <= 6, brightness: 75, season: 'Fall' },
        { name: 'Andromeda', stars: 6, visible: timeOfDay >= 19 || timeOfDay <= 5, brightness: 65, season: 'Fall' },
      ],
      'Tokyo': [
        { name: 'Orion', stars: 8, visible: timeOfDay >= 18 || timeOfDay <= 6, brightness: 85, season: 'Winter' },
        { name: 'Scorpius', stars: 12, visible: timeOfDay >= 20 || timeOfDay <= 4, brightness: 90, season: 'Summer' },
        { name: 'Sagittarius', stars: 10, visible: timeOfDay >= 21 || timeOfDay <= 3, brightness: 88, season: 'Summer' },
        { name: 'Cassiopeia', stars: 5, visible: true, brightness: 75, season: 'Fall' },
        { name: 'Vega (Lyra)', stars: 5, visible: timeOfDay >= 19 || timeOfDay <= 5, brightness: 92, season: 'Summer' },
        { name: 'Altair (Aquila)', stars: 6, visible: timeOfDay >= 20 || timeOfDay <= 4, brightness: 80, season: 'Summer' },
      ],
      'Sydney': [
        { name: 'Southern Cross', stars: 5, visible: true, brightness: 95, season: 'All Year' },
        { name: 'Centaurus', stars: 11, visible: true, brightness: 88, season: 'Autumn/Winter' },
        { name: 'Scorpius', stars: 12, visible: timeOfDay >= 18 || timeOfDay <= 6, brightness: 92, season: 'Winter' },
        { name: 'Sagittarius', stars: 10, visible: timeOfDay >= 19 || timeOfDay <= 5, brightness: 85, season: 'Winter' },
        { name: 'Orion', stars: 8, visible: timeOfDay >= 20 || timeOfDay <= 4, brightness: 80, season: 'Summer' },
        { name: 'Carina', stars: 9, visible: true, brightness: 78, season: 'Summer' },
      ]
    };
    return constellationData[location as keyof typeof constellationData] || constellationData['New York'];
  };

  const constellations = getConstellationsForLocation(selectedLocation.name);

  const generateStars = () => {
    const stars = [];
    const starCount = selectedLocation.name === 'Sydney' ? 250 : 200; // More stars for Southern Hemisphere
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleDelay: Math.random() * 2,
        color: Math.random() > 0.8 ? 'bg-blue-200' : Math.random() > 0.6 ? 'bg-yellow-200' : 'bg-white',
      });
    }
    return stars;
  };

  const [stars, setStars] = useState(generateStars());

  // Regenerate stars when location changes
  useEffect(() => {
    setStars(generateStars());
  }, [selectedLocation]);

  const getLocationDescription = (location: string) => {
    const descriptions = {
      'New York': 'Northern Hemisphere view with classic constellations like Orion and the Big Dipper.',
      'London': 'European sky featuring circumpolar constellations and seasonal variations.',
      'Tokyo': 'East Asian perspective with unique visibility of summer triangle constellations.',
      'Sydney': 'Southern Hemisphere sky showcasing the Southern Cross and Magellanic Clouds.'
    };
    return descriptions[location as keyof typeof descriptions] || descriptions['New York'];
  };

  return (
    <motion.div
      className="container mx-auto p-4 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Dynamic Star Map
        </h2>
        <p className="text-gray-400">Explore how the night sky changes across different locations and times</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            <Calendar className="inline mr-2" size={16} />
            Date
          </label>
          <input
            type="date"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="w-full bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            <MapPin className="inline mr-2" size={16} />
            Location
          </label>
          <select
            value={selectedLocation.name}
            onChange={(e) => {
              const locations = {
                'New York': { lat: 40.7128, lng: -74.0060, name: 'New York' },
                'London': { lat: 51.5074, lng: -0.1278, name: 'London' },
                'Tokyo': { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
                'Sydney': { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
              };
              setSelectedLocation(locations[e.target.value as keyof typeof locations]);
            }}
            className="w-full bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="New York">New York, USA</option>
            <option value="London">London, UK</option>
            <option value="Tokyo">Tokyo, Japan</option>
            <option value="Sydney">Sydney, Australia</option>
          </select>
          <p className="text-xs text-gray-400 mt-1">{getLocationDescription(selectedLocation.name)}</p>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Time: {timeOfDay}:00
          </label>
          <input
            type="range"
            min="0"
            max="23"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>00:00</span>
            <span>12:00</span>
            <span>23:00</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Star Map */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-white/10 relative overflow-hidden h-96">
            <div className="absolute inset-0">
              {stars.map((star) => (
                <motion.div
                  key={star.id}
                  className={`absolute ${star.color} rounded-full`}
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    opacity: star.opacity,
                  }}
                  animate={{
                    opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: star.twinkleDelay,
                  }}
                />
              ))}
            </div>

            {/* Special markers for Southern Cross (Sydney only) */}
            {selectedLocation.name === 'Sydney' && (
              <div className="absolute bottom-1/3 right-1/3">
                <div className="relative">
                  <div className="absolute w-2 h-2 bg-blue-300 rounded-full"></div>
                  <div className="absolute w-2 h-2 bg-blue-300 rounded-full top-4 left-2"></div>
                  <div className="absolute w-2 h-2 bg-blue-300 rounded-full top-8 left-1"></div>
                  <div className="absolute w-2 h-2 bg-blue-300 rounded-full top-2 left-4"></div>
                  <div className="absolute w-1 h-1 bg-yellow-300 rounded-full top-6 left-3"></div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-blue-300 whitespace-nowrap">
                    Southern Cross
                  </div>
                </div>
              </div>
            )}

            {/* Horizon Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            {/* Cardinal Directions */}
            <div className="absolute bottom-4 left-4 text-white/60 text-sm">
              {selectedLocation.name === 'Sydney' ? 'S' : 'N'}
            </div>
            <div className="absolute bottom-4 right-4 text-white/60 text-sm">
              {selectedLocation.name === 'Sydney' ? 'N' : 'S'}
            </div>
            <div className="absolute top-1/2 left-4 text-white/60 text-sm">E</div>
            <div className="absolute top-1/2 right-4 text-white/60 text-sm">W</div>

            {/* Time Indicator */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 text-white/80">
              {timeOfDay >= 6 && timeOfDay <= 18 ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-blue-300" />
              )}
              <span className="text-sm">{timeOfDay}:00</span>
            </div>

            {/* Location Indicator */}
            <div className="absolute top-4 left-4 text-white/80">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-green-400" />
                <span className="text-sm">{selectedLocation.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Constellation Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">
            Visible Constellations
            <span className="block text-sm text-gray-400 font-normal">
              {selectedLocation.name} • {format(selectedDate, 'MMM dd')}
            </span>
          </h3>
          
          {constellations.map((constellation) => (
            <motion.div
              key={constellation.name}
              className={`p-4 rounded-xl border transition-all ${
                constellation.visible
                  ? 'bg-green-900/20 border-green-500/30 hover:bg-green-900/30'
                  : 'bg-gray-900/20 border-gray-500/30'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">{constellation.name}</h4>
                <div className="flex items-center space-x-1">
                  <Star size={16} className={constellation.visible ? 'text-yellow-400' : 'text-gray-500'} />
                  <span className="text-sm text-gray-400">{constellation.stars}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${constellation.visible ? 'text-green-400' : 'text-gray-500'}`}>
                  {constellation.visible ? 'Visible' : 'Below Horizon'}
                </span>
                <div className="text-sm text-gray-400">
                  {constellation.brightness}% brightness
                </div>
              </div>
              <div className="text-xs text-purple-300">
                Best Season: {constellation.season}
              </div>
            </motion.div>
          ))}

          {/* Moon Phase */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <h4 className="font-semibold text-white mb-2">Moon Phase</h4>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-600 rounded-full"></div>
              <div>
                <div className="text-sm text-white">Waxing Crescent</div>
                <div className="text-xs text-gray-400">Illumination: 34%</div>
              </div>
            </div>
          </div>

          {/* Viewing Conditions */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <h4 className="font-semibold text-white mb-2">Viewing Conditions</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Light Pollution:</span>
                <span className={selectedLocation.name === 'Sydney' ? 'text-green-400' : 'text-yellow-400'}>
                  {selectedLocation.name === 'Sydney' ? 'Low' : 'Moderate'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cloud Cover:</span>
                <span className="text-green-400">Clear</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Visibility:</span>
                <span className="text-blue-400">
                  {timeOfDay >= 18 || timeOfDay <= 6 ? 'Excellent' : 'Daylight'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StarMap;