import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Weight, Clock, Zap, Globe } from 'lucide-react';

const AstroCalculator: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<string>('age');
  const [inputs, setInputs] = useState({
    age: '',
    weight: '',
    distance: '',
    lightYears: ''
  });
  const [results, setResults] = useState<any>({});

  const calculators = [
    {
      id: 'age',
      title: 'Age on Other Planets',
      description: 'Calculate how old you would be on different planets',
      icon: Globe,
      color: 'blue'
    },
    {
      id: 'weight',
      title: 'Weight on Moon/Mars',
      description: 'Find out how much you would weigh on other celestial bodies',
      icon: Weight,
      color: 'green'
    },
    {
      id: 'light',
      title: 'Light Travel Time',
      description: 'Calculate how long light takes to travel between celestial objects',
      icon: Zap,
      color: 'yellow'
    },
    {
      id: 'distance',
      title: 'Space Distance Converter',
      description: 'Convert between different astronomical distance units',
      icon: Clock,
      color: 'purple'
    }
  ];

  const planets = [
    { name: 'Mercury', yearLength: 0.24, gravity: 0.378 },
    { name: 'Venus', yearLength: 0.62, gravity: 0.907 },
    { name: 'Earth', yearLength: 1.0, gravity: 1.0 },
    { name: 'Mars', yearLength: 1.88, gravity: 0.377 },
    { name: 'Jupiter', yearLength: 11.86, gravity: 2.36 },
    { name: 'Saturn', yearLength: 29.46, gravity: 0.916 },
    { name: 'Uranus', yearLength: 84.01, gravity: 0.889 },
    { name: 'Neptune', yearLength: 164.8, gravity: 1.13 }
  ];

  const celestialBodies = [
    { name: 'Moon', gravity: 0.166 },
    { name: 'Mars', gravity: 0.377 },
    { name: 'Jupiter', gravity: 2.36 },
    { name: 'Sun', gravity: 27.01 },
    { name: 'Pluto', gravity: 0.071 }
  ];

  const lightDistances = [
    { name: 'Earth to Moon', distance: 1.28, unit: 'light-seconds' },
    { name: 'Earth to Sun', distance: 8.32, unit: 'light-minutes' },
    { name: 'Sun to Mars', distance: 12.67, unit: 'light-minutes' },
    { name: 'Sun to Jupiter', distance: 43.27, unit: 'light-minutes' },
    { name: 'Sun to Pluto', distance: 5.5, unit: 'light-hours' },
    { name: 'Sun to Proxima Centauri', distance: 4.24, unit: 'light-years' }
  ];

  const calculateAge = (earthAge: number) => {
    return planets.map(planet => ({
      ...planet,
      age: Math.floor(earthAge / planet.yearLength)
    }));
  };

  const calculateWeight = (earthWeight: number) => {
    return celestialBodies.map(body => ({
      ...body,
      weight: Math.round(earthWeight * body.gravity * 100) / 100
    }));
  };

  const calculateLightTravel = (distance: number, unit: string) => {
    const lightSpeed = 299792458; // m/s
    let distanceInMeters = 0;

    switch (unit) {
      case 'km':
        distanceInMeters = distance * 1000;
        break;
      case 'au':
        distanceInMeters = distance * 149597870700;
        break;
      case 'ly':
        distanceInMeters = distance * 9.461e15;
        break;
      default:
        distanceInMeters = distance;
    }

    const timeInSeconds = distanceInMeters / lightSpeed;
    
    return {
      seconds: timeInSeconds,
      minutes: timeInSeconds / 60,
      hours: timeInSeconds / 3600,
      days: timeInSeconds / 86400,
      years: timeInSeconds / (365.25 * 86400)
    };
  };

  const convertDistance = (distance: number, fromUnit: string) => {
    let meters = 0;
    
    switch (fromUnit) {
      case 'km':
        meters = distance * 1000;
        break;
      case 'au':
        meters = distance * 149597870700;
        break;
      case 'ly':
        meters = distance * 9.461e15;
        break;
      case 'pc':
        meters = distance * 3.086e16;
        break;
    }

    return {
      km: meters / 1000,
      au: meters / 149597870700,
      ly: meters / 9.461e15,
      pc: meters / 3.086e16
    };
  };

  const handleCalculate = () => {
    const newResults: any = {};

    switch (activeCalculator) {
      case 'age':
        if (inputs.age) {
          newResults.ages = calculateAge(parseFloat(inputs.age));
        }
        break;
      case 'weight':
        if (inputs.weight) {
          newResults.weights = calculateWeight(parseFloat(inputs.weight));
        }
        break;
      case 'light':
        if (inputs.distance) {
          newResults.lightTravel = calculateLightTravel(parseFloat(inputs.distance), 'km');
        }
        break;
      case 'distance':
        if (inputs.lightYears) {
          newResults.distances = convertDistance(parseFloat(inputs.lightYears), 'ly');
        }
        break;
    }

    setResults(newResults);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      case 'green': return 'bg-green-600/20 text-green-300 border-green-500/30';
      case 'yellow': return 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30';
      case 'purple': return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
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
          Astronomical Calculator Tools
        </h2>
        <p className="text-gray-400">Calculate your age, weight, and distances across the cosmos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Choose Calculator</h3>
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <motion.button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`w-full p-4 rounded-xl border transition-all text-left ${
                  activeCalculator === calc.id
                    ? getColorClasses(calc.color)
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start space-x-3">
                  <Icon size={24} className={activeCalculator === calc.id ? 'text-current' : 'text-gray-400'} />
                  <div>
                    <h4 className="font-semibold mb-1">{calc.title}</h4>
                    <p className="text-sm opacity-80">{calc.description}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Calculator Interface */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="flex items-center space-x-3 mb-6">
              <Calculator size={24} className="text-blue-400" />
              <h3 className="text-xl font-bold text-white">
                {calculators.find(c => c.id === activeCalculator)?.title}
              </h3>
            </div>

            {/* Age Calculator */}
            {activeCalculator === 'age' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Your Age (in Earth years)</label>
                  <input
                    type="number"
                    value={inputs.age}
                    onChange={(e) => setInputs({...inputs, age: e.target.value})}
                    placeholder="Enter your age"
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <motion.button
                  onClick={handleCalculate}
                  className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-xl transition-colors font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Calculate Ages
                </motion.button>

                {results.ages && (
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {results.ages.map((planet: any) => (
                      <div key={planet.name} className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">{planet.age}</div>
                        <div className="text-sm text-gray-400">{planet.name}</div>
                        <div className="text-xs text-gray-500">years old</div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}

            {/* Weight Calculator */}
            {activeCalculator === 'weight' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Your Weight (in kg)</label>
                  <input
                    type="number"
                    value={inputs.weight}
                    onChange={(e) => setInputs({...inputs, weight: e.target.value})}
                    placeholder="Enter your weight"
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <motion.button
                  onClick={handleCalculate}
                  className="w-full py-3 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded-xl transition-colors font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Calculate Weights
                </motion.button>

                {results.weights && (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {results.weights.map((body: any) => (
                      <div key={body.name} className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white">{body.name}</div>
                          <div className="text-sm text-gray-400">Gravity: {body.gravity}g</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">{body.weight}</div>
                          <div className="text-sm text-gray-400">kg</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}

            {/* Light Travel Calculator */}
            {activeCalculator === 'light' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Distance (in kilometers)</label>
                  <input
                    type="number"
                    value={inputs.distance}
                    onChange={(e) => setInputs({...inputs, distance: e.target.value})}
                    placeholder="Enter distance"
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <motion.button
                  onClick={handleCalculate}
                  className="w-full py-3 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 rounded-xl transition-colors font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Calculate Light Travel Time
                </motion.button>

                {results.lightTravel && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-lg font-bold text-white">{results.lightTravel.seconds.toFixed(2)}</div>
                        <div className="text-sm text-gray-400">Seconds</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-lg font-bold text-white">{results.lightTravel.minutes.toFixed(2)}</div>
                        <div className="text-sm text-gray-400">Minutes</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-lg font-bold text-white">{results.lightTravel.hours.toFixed(2)}</div>
                        <div className="text-sm text-gray-400">Hours</div>
                      </div>
                    </div>

                    <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-300 mb-2">Common Light Travel Times</h4>
                      <div className="space-y-2">
                        {lightDistances.map((item) => (
                          <div key={item.name} className="flex justify-between text-sm">
                            <span className="text-gray-300">{item.name}</span>
                            <span className="text-blue-300">{item.distance} {item.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Distance Converter */}
            {activeCalculator === 'distance' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Distance (in light-years)</label>
                  <input
                    type="number"
                    value={inputs.lightYears}
                    onChange={(e) => setInputs({...inputs, lightYears: e.target.value})}
                    placeholder="Enter distance in light-years"
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <motion.button
                  onClick={handleCalculate}
                  className="w-full py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-xl transition-colors font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Convert Distance
                </motion.button>

                {results.distances && (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="font-semibold text-white mb-1">Kilometers</div>
                      <div className="text-lg text-purple-300">{results.distances.km.toExponential(2)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="font-semibold text-white mb-1">Astronomical Units</div>
                      <div className="text-lg text-purple-300">{results.distances.au.toFixed(2)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="font-semibold text-white mb-1">Light-years</div>
                      <div className="text-lg text-purple-300">{results.distances.ly.toFixed(2)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="font-semibold text-white mb-1">Parsecs</div>
                      <div className="text-lg text-purple-300">{results.distances.pc.toFixed(2)}</div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AstroCalculator;