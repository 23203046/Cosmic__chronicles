import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Volume2, Award, Rocket, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { VoiceAssistantHook } from '../hooks/useVoiceAssistant';

interface WomenInSpaceProps {
  voiceAssistant: VoiceAssistantHook;
}

interface SpaceWoman {
  id: string;
  name: string;
  title: string;
  achievement: string;
  biography: string;
  quote: string;
  missions: string[];
  firsts: string[];
  image: string;
  birthYear: number;
  nationality: string;
  field: string;
}

const WomenInSpace: React.FC<WomenInSpaceProps> = ({ voiceAssistant }) => {
  const [currentWoman, setCurrentWoman] = useState(0);
  const [selectedWoman, setSelectedWoman] = useState<SpaceWoman | null>(null);

  const spaceWomen: SpaceWoman[] = [
    {
      id: '1',
      name: 'Valentina Tereshkova',
      title: 'First Woman in Space',
      achievement: 'First woman to fly in space aboard Vostok 6 in 1963',
      biography: 'Valentina Vladimirovna Tereshkova is a Russian former cosmonaut and the first woman to have flown in space. She spent almost three days in space and orbited Earth 48 times in her space capsule. Before her recruitment as a cosmonaut, she was a textile factory worker and an amateur skydiver.',
      quote: "A bird cannot fly with one wing only. Human space flight cannot develop any further without the active participation of women.",
      missions: ['Vostok 6 (1963)'],
      firsts: [
        'First woman in space',
        'First civilian to fly in space',
        'Youngest woman to fly in space (26 years old)'
      ],
      image: 'https://cdn.mos.cms.futurecdn.net/UMrJ6JarwgPzBPCrL3Tcnn.jpg',
      birthYear: 1937,
      nationality: 'Soviet Union/Russia',
      field: 'Cosmonaut'
    },
    {
      id: '2',
      name: 'Sally Ride',
      title: 'First American Woman in Space',
      achievement: 'First American woman to fly in space aboard Space Shuttle Challenger in 1983',
      biography: 'Sally Kristen Ride was an American astronaut and physicist. She joined NASA in 1978 and became the first American woman in space in 1983. After her NASA career, she led two public outreach companies focused on making science and engineering fun and accessible for students, particularly girls.',
      quote: "The thing that I'll remember most about the flight is that it was fun. In fact, I'm sure it was the most fun that I'll ever have in my life.",
      missions: ['STS-7 (1983)', 'STS-41-G (1984)'],
      firsts: [
        'First American woman in space',
        'Youngest American astronaut to fly in space',
        'First woman to use the robotic arm in space'
      ],
      image: 'https://static01.nyt.com/images/2012/07/24/science/24ride1/24ride1-superJumbo.jpg',
      birthYear: 1951,
      nationality: 'United States',
      field: 'Astronaut/Physicist'
    },
    {
      id: '3',
      name: 'Mae Jemison',
      title: 'First African American Woman in Space',
      achievement: 'First African American woman to travel to space aboard Space Shuttle Endeavour in 1992',
      biography: 'Mae Carol Jemison is an American engineer, physician, and former NASA astronaut. She became the first African American woman to travel to space when she served as a mission specialist aboard the Space Shuttle Endeavour. She is also a trained dancer and holds degrees in chemical engineering and medicine.',
      quote: "Never be limited by other people's limited imaginations. If you adopt their attitudes, then the possibility won't exist because you'll have already shut it out.",
      missions: ['STS-47 (1992)'],
      firsts: [
        'First African American woman in space',
        'First astronaut who was also a professional dancer',
        'First physician-astronaut to conduct medical experiments in space'
      ],
      image: 'https://images.newscientist.com/wp-content/uploads/2021/07/16120548/mae_jemison2exd3p7.jpg',
      birthYear: 1956,
      nationality: 'United States',
      field: 'Astronaut/Physician/Engineer'
    },
    {
      id: '4',
      name: 'Eileen Collins',
      title: 'First Female Space Shuttle Pilot and Commander',
      achievement: 'First woman to pilot and command a Space Shuttle mission',
      biography: 'Eileen Marie Collins is a retired NASA astronaut and United States Air Force colonel. She was the first woman to pilot a Space Shuttle and the first to command a Space Shuttle mission. Collins logged over 872 hours in space and was instrumental in advancing opportunities for women in aerospace.',
      quote: "I think it's important for young girls to see that you can be feminine and be in command.",
      missions: ['STS-63 (1995)', 'STS-84 (1997)', 'STS-93 (1999)', 'STS-114 (2005)'],
      firsts: [
        'First woman to pilot a Space Shuttle',
        'First woman to command a Space Shuttle',
        'First woman to command a space mission'
      ],
      image: 'https://cdn.britannica.com/48/211148-050-E24BD688/Eileen-Collins-training-course-NASA-Vance-Air-Force-Base-Oklahoma.jpg',
      birthYear: 1956,
      nationality: 'United States',
      field: 'Astronaut/Air Force Colonel'
    },
    {
      id: '5',
      name: 'Sunita Williams',
      title: 'Record-Breaking Spacewalker',
      achievement: 'Held the record for longest spaceflight by a woman and most spacewalks by a woman',
      biography: 'Sunita Lyn Williams is an American astronaut and United States Navy officer. She formerly held the records for most spacewalks by a woman (seven) and most spacewalk time for a woman. Williams has spent a total of 322 days in space and has been a long-duration resident of the International Space Station.',
      quote: "I think the space station is absolutely amazing. It's a testament to what we can do when we work together internationally.",
      missions: ['Expedition 14/15 (2006-2007)', 'Expedition 32/33 (2012)', 'Boeing Starliner CFT (2024)'],
      firsts: [
        'Most spacewalks by a woman (7)',
        'Longest single spaceflight by a woman (195 days)',
        'First person to run a marathon in space'
      ],
      image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2024-06/240605-sunita-williams-ch-1203-4bd0e0.jpg',
      birthYear: 1965,
      nationality: 'United States',
      field: 'Astronaut/Navy Officer'
    },
    {
      id: '6',
      name: 'Peggy Whitson',
      title: 'Most Experienced Female Astronaut',
      achievement: 'Holds the record for most time in space by a woman and oldest woman in space',
      biography: 'Peggy Annette Whitson is an American biochemist and retired NASA astronaut. She has spent more time in space than any other woman, and holds the record for oldest woman to fly in space. Whitson was the first woman to command the International Space Station and served as NASA\'s Chief Astronaut.',
      quote: "I do think that it's extremely important to have role models, and to see that it is possible.",
      missions: ['Expedition 5 (2002)', 'Expedition 16 (2007-2008)', 'Expedition 50/51/52 (2016-2017)', 'Axiom Mission 2 (2023)'],
      firsts: [
        'Most time in space by a woman (665 days)',
        'First woman to command the ISS',
        'Oldest woman in space (57 years old)'
      ],
      image: 'https://ichef.bbci.co.uk/images/ic/1920xn/p0j1h2b6.jpg',
      birthYear: 1960,
      nationality: 'United States',
      field: 'Astronaut/Biochemist'
    },
    {
      id: '7',
      name: 'Liu Yang',
      title: 'First Chinese Woman in Space',
      achievement: 'First Chinese woman to travel to space aboard Shenzhou 9 in 2012',
      biography: 'Liu Yang is a Chinese pilot and astronaut who became the first Chinese woman to travel to space. She served as a crew member on the Shenzhou 9 mission in 2012, which was China\'s first manned mission to dock with the Tiangong-1 space laboratory. She later flew on Shenzhou 14 in 2022.',
      quote: "As China's first female astronaut, I feel proud and honored to represent Chinese women in space exploration.",
      missions: ['Shenzhou 9 (2012)', 'Shenzhou 14 (2022)'],
      firsts: [
        'First Chinese woman in space',
        'First Chinese woman to dock with a space station',
        'First woman to visit China\'s space station'
      ],
      image: 'https://cdn.i-scmp.com/sites/default/files/styles/1020x680/public/d8/images/canvas/2024/05/26/a54fe7d5-70c2-4699-bb41-4930da8fcee6_68913e26.jpg?itok=UJ-OGMVf&v=1716689324',
      birthYear: 1978,
      nationality: 'China',
      field: 'Astronaut/Pilot'
    }
  ];

  // Auto-rotate through featured women
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWoman((prev) => (prev + 1) % spaceWomen.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [spaceWomen.length]);

  const nextWoman = () => {
    setCurrentWoman((prev) => (prev + 1) % spaceWomen.length);
  };

  const prevWoman = () => {
    setCurrentWoman((prev) => (prev - 1 + spaceWomen.length) % spaceWomen.length);
  };

  const currentSpaceWoman = spaceWomen[currentWoman];

  return (
    <motion.div
      className="container mx-auto p-4 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Women in Space Spotlight
        </h2>
        <p className="text-gray-400">Celebrating the pioneering women who broke barriers in space exploration</p>
      </div>

      {/* Featured Woman of the Day */}
      <div className="mb-8">
        <motion.div
          className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10"
          key={currentWoman}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Star size={32} className="text-purple-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">Featured Pioneer</h3>
                <p className="text-gray-400">Spotlight on space exploration heroes</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={prevWoman}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => voiceAssistant.speak(`${currentSpaceWoman.name}: ${currentSpaceWoman.achievement}. ${currentSpaceWoman.quote}`)}
                className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
              >
                <Volume2 size={20} />
              </button>
              <button
                onClick={nextWoman}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative group">
              <img
                src={currentSpaceWoman.image}
                alt={currentSpaceWoman.name}
                className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-3xl font-bold text-white mb-2">{currentSpaceWoman.name}</h4>
                <p className="text-xl text-purple-300 mb-4">{currentSpaceWoman.title}</p>
                <p className="text-gray-300 leading-relaxed">{currentSpaceWoman.achievement}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-4xl text-purple-400 mb-2">"</div>
                <blockquote className="text-lg text-white italic leading-relaxed">
                  {currentSpaceWoman.quote}
                </blockquote>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                  {currentSpaceWoman.nationality}
                </span>
                <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {currentSpaceWoman.field}
                </span>
                <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm">
                  Born {currentSpaceWoman.birthYear}
                </span>
              </div>

              <motion.button
                onClick={() => setSelectedWoman(currentSpaceWoman)}
                className="w-full py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-xl transition-colors font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More About {currentSpaceWoman.name}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* All Women Grid */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">All Space Pioneers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaceWomen.map((woman, index) => (
            <motion.div
              key={woman.id}
              className={`bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border cursor-pointer transition-all ${
                index === currentWoman
                  ? 'border-purple-500/50 bg-purple-900/20'
                  : 'border-white/10 hover:border-blue-500/50'
              }`}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedWoman(woman)}
            >
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={woman.image}
                  alt={woman.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-1">{woman.name}</h4>
                  <p className="text-sm text-purple-300 mb-2">{woman.title}</p>
                  <p className="text-xs text-gray-400">{woman.nationality} • {woman.birthYear}</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {woman.achievement}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {woman.firsts.slice(0, 2).map((first, idx) => (
                    <Award key={idx} size={16} className="text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {woman.missions.length} mission{woman.missions.length !== 1 ? 's' : ''}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Biography Modal */}
      <AnimatePresence>
        {selectedWoman && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWoman(null)}
          >
            <motion.div
              className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedWoman.image}
                    alt={selectedWoman.name}
                    className="w-full h-80 object-cover rounded-2xl mb-6"
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-purple-300 mb-2">Missions</h4>
                      <div className="space-y-2">
                        {selectedWoman.missions.map((mission, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Rocket size={16} className="text-blue-400" />
                            <span className="text-gray-300 text-sm">{mission}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-yellow-300 mb-2">Historic Firsts</h4>
                      <div className="space-y-2">
                        {selectedWoman.firsts.map((first, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Award size={16} className="text-yellow-400" />
                            <span className="text-gray-300 text-sm">{first}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedWoman.name}</h2>
                      <p className="text-xl text-purple-300 mb-4">{selectedWoman.title}</p>
                    </div>
                    <button
                      onClick={() => voiceAssistant.speak(`${selectedWoman.name}: ${selectedWoman.biography}`)}
                      className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
                    >
                      <Volume2 size={20} />
                    </button>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-semibold text-green-300 mb-2">Achievement</h4>
                    <p className="text-gray-300 text-sm">{selectedWoman.achievement}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Biography</h4>
                    <p className="text-gray-300 leading-relaxed text-sm">{selectedWoman.biography}</p>
                  </div>

                  <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl p-4">
                    <div className="text-3xl text-purple-400 mb-2">"</div>
                    <blockquote className="text-white italic leading-relaxed">
                      {selectedWoman.quote}
                    </blockquote>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      {selectedWoman.nationality}
                    </span>
                    <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                      {selectedWoman.field}
                    </span>
                    <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm">
                      Born {selectedWoman.birthYear}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedWoman(null)}
                    className="w-full py-3 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WomenInSpace;