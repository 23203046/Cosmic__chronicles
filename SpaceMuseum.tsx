import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, X, ZoomIn, Eye } from 'lucide-react';
import { spaceMuseumExhibits } from '../data/museumExhibits';
import { VoiceAssistantHook } from '../hooks/useVoiceAssistant';

interface SpaceMuseumProps {
  voiceAssistant: VoiceAssistantHook;
}

const SpaceMuseum: React.FC<SpaceMuseumProps> = ({ voiceAssistant }) => {
  const [selectedExhibit, setSelectedExhibit] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleExhibitClick = (exhibit: any) => {
    setSelectedExhibit(exhibit);
    setZoomLevel(1);
    voiceAssistant.speak(`Welcome to the ${exhibit.name} exhibit. ${exhibit.description}`);
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
          Virtual Space Museum
        </h2>
        <p className="text-gray-400">Explore interactive models and detailed information about spacecraft and satellites</p>
      </div>

      {/* Museum Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {spaceMuseumExhibits.map((exhibit) => (
          <motion.div
            key={exhibit.id}
            className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 cursor-pointer hover:border-blue-500/50 transition-all group"
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => handleExhibitClick(exhibit)}
          >
            <div className="relative mb-4 overflow-hidden rounded-xl">
              <motion.img
                src={exhibit.image}
                alt={exhibit.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                whileHover={{ rotateY: 5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-2 right-2 bg-blue-600/80 backdrop-blur-sm rounded-lg p-2">
                <Eye size={16} className="text-white" />
              </div>
              <div className="absolute bottom-2 left-2 text-white">
                <h3 className="text-lg font-semibold">{exhibit.name}</h3>
                <p className="text-sm text-gray-300">{exhibit.type}</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{exhibit.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
                {exhibit.era}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    voiceAssistant.speak(exhibit.description);
                  }}
                  className="p-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors"
                >
                  <Volume2 size={16} />
                </button>
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <Eye size={16} className="text-green-400" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Exhibit View */}
      {selectedExhibit && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedExhibit(null)}
        >
          <motion.div
            className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image View */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">{selectedExhibit.name}</h2>
                </div>

                <div className="relative bg-gradient-to-br from-gray-800 to-black rounded-xl overflow-hidden">
                  <motion.div
                    className="relative w-full h-80 flex items-center justify-center"
                  >
                    <motion.img
                      src={selectedExhibit.image}
                      alt={selectedExhibit.name}
                      className="max-w-full max-h-full object-contain"
                      style={{ 
                        transform: `scale(${zoomLevel})`,
                      }}
                      animate={{ 
                        scale: zoomLevel 
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>

                  {/* Control Overlay */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2))}
                      className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors backdrop-blur-sm"
                      title="Zoom In"
                    >
                      <ZoomIn size={20} className="text-white" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(1)}
                      className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors backdrop-blur-sm text-xs text-white"
                      title="Reset Zoom"
                    >
                      1:1
                    </button>
                  </div>
                </div>

                {/* Controls Info */}
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-center text-gray-400 text-sm space-y-1">
                    <div>🔍 Click zoom to magnify</div>
                    <div>🔎 Zoom: {Math.round(zoomLevel * 100)}%</div>
                  </div>
                </div>
              </div>

              {/* Exhibit Information */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2 mb-4">
                      <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                        {selectedExhibit.type}
                      </span>
                      <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {selectedExhibit.era}
                      </span>
                    </div>
                    <button
                      onClick={() => voiceAssistant.speak(`${selectedExhibit.name}: ${selectedExhibit.description}`)}
                      className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
                    >
                      <Volume2 size={20} />
                    </button>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{selectedExhibit.description}</p>
                </div>

                {selectedExhibit.specifications && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-300">Technical Specifications</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedExhibit.specifications.map((spec: any, index: number) => (
                        <motion.div 
                          key={index} 
                          className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="text-purple-300 font-semibold text-sm">{spec.label}</div>
                          <div className="text-white font-mono">{spec.value}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedExhibit.achievements && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-green-300">Key Achievements</h3>
                    <div className="space-y-3">
                      {selectedExhibit.achievements.map((achievement: string, index: number) => (
                        <motion.div
                          key={index}
                          className="bg-green-600/10 border border-green-600/20 rounded-lg p-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="text-gray-300 flex items-start">
                            <span className="text-green-400 mr-3 text-lg">🏆</span>
                            {achievement}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={() => voiceAssistant.speak(`Technical specifications for ${selectedExhibit.name}: ${selectedExhibit.specifications?.map((s: any) => `${s.label}: ${s.value}`).join(', ')}`)}
                    className="flex-1 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Volume2 size={16} />
                    <span>Read Specifications</span>
                  </button>
                  <button
                    onClick={() => setSelectedExhibit(null)}
                    className="flex-1 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-colors"
                  >
                    Close Exhibit
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SpaceMuseum;