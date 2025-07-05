import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Clock, Zap, Rocket, Globe } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  timeline: TimelineEvent[];
  consequences: string[];
  probability: string;
  impact: string;
}

interface TimelineEvent {
  year: string;
  event: string;
  description: string;
}

const WhatIfSimulator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const scenarios: Scenario[] = [
    {
      id: 'mars-80s',
      title: 'What if Mars missions started in the 1980s?',
      description: 'Explore an alternate timeline where humanity reached Mars during the Cold War era.',
      icon: Rocket,
      timeline: [
        {
          year: '1981',
          event: 'Mars Mission Announcement',
          description: 'President Reagan announces the Mars Initiative as a response to Soviet space achievements.'
        },
        {
          year: '1985',
          event: 'First Mars Probe Success',
          description: 'Advanced robotic missions successfully map Mars and identify landing sites.'
        },
        {
          year: '1989',
          event: 'First Human Mars Landing',
          description: 'A joint US-Soviet crew lands on Mars, marking the beginning of human interplanetary exploration.'
        },
        {
          year: '1995',
          event: 'Permanent Mars Base',
          description: 'The first permanent research station is established on Mars with rotating crews.'
        },
        {
          year: '2000',
          event: 'Mars Terraforming Begins',
          description: 'Large-scale atmospheric modification projects begin to make Mars more Earth-like.'
        }
      ],
      consequences: [
        'Advanced propulsion technology developed 30 years earlier',
        'International space cooperation accelerated',
        'Climate change solutions discovered through terraforming research',
        'Asteroid mining industry established by 2000',
        'Human population on Mars reaches 10,000 by 2024'
      ],
      probability: 'Medium',
      impact: 'Revolutionary'
    },
    {
      id: 'no-apollo',
      title: 'What if the Apollo program never happened?',
      description: 'Imagine a world where the Moon landing was never achieved and space exploration took a different path.',
      icon: Globe,
      timeline: [
        {
          year: '1969',
          event: 'Continued Earth Orbit Focus',
          description: 'NASA focuses on building larger space stations instead of lunar missions.'
        },
        {
          year: '1975',
          event: 'International Space City',
          description: 'A massive international space station houses 100+ astronauts permanently.'
        },
        {
          year: '1985',
          event: 'Space Manufacturing',
          description: 'Zero-gravity manufacturing becomes commercially viable, revolutionizing industry.'
        },
        {
          year: '1995',
          event: 'First Moon Landing',
          description: 'Commercial companies finally achieve the first Moon landing for mining purposes.'
        },
        {
          year: '2010',
          event: 'Lunar Industrial Complex',
          description: 'The Moon becomes a major industrial hub with thousands of workers.'
        }
      ],
      consequences: [
        'Space technology develops more gradually but sustainably',
        'Commercial space industry emerges 20 years earlier',
        'International cooperation becomes the norm in space',
        'Earth-orbit infrastructure far more advanced',
        'Moon colonization driven by economics, not exploration'
      ],
      probability: 'High',
      impact: 'Significant'
    },
    {
      id: 'alien-contact',
      title: 'What if we received an alien signal in 1977?',
      description: 'Explore how first contact with extraterrestrial intelligence would have changed human civilization.',
      icon: Zap,
      timeline: [
        {
          year: '1977',
          event: 'The Signal Received',
          description: 'SETI detects an unmistakable artificial signal from Proxima Centauri.'
        },
        {
          year: '1980',
          event: 'Global Space Alliance',
          description: 'All nations unite to form a single space agency to respond to the signal.'
        },
        {
          year: '1990',
          event: 'Advanced Propulsion',
          description: 'Breakthrough in physics leads to development of near-light-speed travel.'
        },
        {
          year: '2000',
          event: 'First Interstellar Probe',
          description: 'Humanity launches its first probe toward the alien civilization.'
        },
        {
          year: '2024',
          event: 'Ongoing Communication',
          description: 'Regular communication established, sharing knowledge and culture.'
        }
      ],
      consequences: [
        'End of international conflicts as humanity unites',
        'Massive acceleration in scientific advancement',
        'New philosophical and religious movements emerge',
        'Interstellar travel technology developed',
        'Human civilization becomes part of galactic community'
      ],
      probability: 'Low',
      impact: 'Transformative'
    },
    {
      id: 'space-elevator',
      title: 'What if space elevators were built in 2000?',
      description: 'See how cheap access to space would have revolutionized human civilization.',
      icon: Clock,
      timeline: [
        {
          year: '2000',
          event: 'First Space Elevator',
          description: 'Revolutionary carbon nanotube technology enables the first space elevator.'
        },
        {
          year: '2005',
          event: 'Space Tourism Boom',
          description: 'Space travel becomes as common as international flights.'
        },
        {
          year: '2010',
          event: 'Orbital Cities',
          description: 'Massive space habitats house millions of people in Earth orbit.'
        },
        {
          year: '2015',
          event: 'Solar Power Satellites',
          description: 'Space-based solar power solves Earth\'s energy crisis completely.'
        },
        {
          year: '2020',
          event: 'Interplanetary Highway',
          description: 'Regular cargo and passenger service to Mars, Moon, and asteroid belt.'
        }
      ],
      consequences: [
        'Climate change solved through space-based solar power',
        'Earth\'s population pressure relieved by space colonies',
        'Asteroid mining makes rare materials abundant',
        'Scientific research accelerated by easy space access',
        'New space-born human cultures develop'
      ],
      probability: 'Medium',
      impact: 'Revolutionary'
    }
  ];

  const startSimulation = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setIsSimulating(true);
    setCurrentEventIndex(0);
    
    // Animate through timeline events
    const interval = setInterval(() => {
      setCurrentEventIndex(prev => {
        if (prev >= scenario.timeline.length - 1) {
          clearInterval(interval);
          setIsSimulating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetSimulation = () => {
    setSelectedScenario(null);
    setIsSimulating(false);
    setCurrentEventIndex(0);
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case 'High': return 'text-green-400 bg-green-600/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-600/20';
      case 'Low': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Transformative': return 'text-purple-400 bg-purple-600/20';
      case 'Revolutionary': return 'text-blue-400 bg-blue-600/20';
      case 'Significant': return 'text-orange-400 bg-orange-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
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
          What If Space Simulator
        </h2>
        <p className="text-gray-400">Explore alternate histories and see how different choices could have shaped space exploration</p>
      </div>

      {!selectedScenario ? (
        // Scenario Selection
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <motion.div
                key={scenario.id}
                className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 cursor-pointer hover:border-blue-500/50 transition-all"
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => startSimulation(scenario)}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-blue-600/20 rounded-xl">
                    <Icon size={24} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{scenario.title}</h3>
                    <p className="text-gray-400 text-sm">{scenario.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${getProbabilityColor(scenario.probability)}`}>
                      {scenario.probability} Probability
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getImpactColor(scenario.impact)}`}>
                      {scenario.impact} Impact
                    </span>
                  </div>
                </div>
                
                <motion.button
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={20} />
                  <span>Run Simulation</span>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        // Simulation View
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedScenario.title}</h3>
              <p className="text-gray-400">{selectedScenario.description}</p>
            </div>
            <motion.button
              onClick={resetSimulation}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600/20 hover:bg-gray-600/30 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </motion.button>
          </div>

          {/* Timeline */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-white/10 mb-8">
            <h4 className="text-xl font-semibold text-white mb-6">Alternate Timeline</h4>
            
            <div className="space-y-6">
              {selectedScenario.timeline.map((event, index) => (
                <motion.div
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-xl transition-all ${
                    index <= currentEventIndex
                      ? 'bg-blue-600/20 border border-blue-500/30'
                      : 'bg-white/5 border border-white/10'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: index <= currentEventIndex ? 1 : 0.5,
                    x: 0,
                    scale: index === currentEventIndex && isSimulating ? [1, 1.02, 1] : 1
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    scale: { duration: 0.5, repeat: index === currentEventIndex && isSimulating ? Infinity : 0 }
                  }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    index <= currentEventIndex
                      ? 'bg-blue-600/30 text-blue-300'
                      : 'bg-gray-600/30 text-gray-400'
                  }`}>
                    {event.year.slice(-2)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className={`font-semibold ${
                        index <= currentEventIndex ? 'text-white' : 'text-gray-400'
                      }`}>
                        {event.event}
                      </h5>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        index <= currentEventIndex
                          ? 'bg-blue-600/20 text-blue-300'
                          : 'bg-gray-600/20 text-gray-400'
                      }`}>
                        {event.year}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      index <= currentEventIndex ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {event.description}
                    </p>
                  </div>
                  
                  {index === currentEventIndex && isSimulating && (
                    <motion.div
                      className="w-3 h-3 bg-blue-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Consequences */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-4">Major Consequences</h4>
              <div className="space-y-3">
                {selectedScenario.consequences.map((consequence, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                    <span className="text-gray-300 text-sm">{consequence}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-4">Scenario Analysis</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Probability</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getProbabilityColor(selectedScenario.probability)}`}>
                      {selectedScenario.probability}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        selectedScenario.probability === 'High' ? 'bg-green-500 w-4/5' :
                        selectedScenario.probability === 'Medium' ? 'bg-yellow-500 w-3/5' :
                        'bg-red-500 w-2/5'
                      }`}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Impact Level</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getImpactColor(selectedScenario.impact)}`}>
                      {selectedScenario.impact}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        selectedScenario.impact === 'Transformative' ? 'bg-purple-500 w-full' :
                        selectedScenario.impact === 'Revolutionary' ? 'bg-blue-500 w-4/5' :
                        'bg-orange-500 w-3/5'
                      }`}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <h5 className="font-semibold text-white mb-2">Key Factors</h5>
                  <div className="text-sm text-gray-400 space-y-1">
                    <div>• Political will and international cooperation</div>
                    <div>• Technological breakthroughs and timing</div>
                    <div>• Economic conditions and funding</div>
                    <div>• Public support and cultural factors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WhatIfSimulator;