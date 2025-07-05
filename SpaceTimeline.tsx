import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Rocket, Satellite, Users } from 'lucide-react';
import { spaceTimelineEvents } from '../data/timelineEvents';

const SpaceTimeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const getEventIcon = (category: string) => {
    switch (category) {
      case 'launch': return Rocket;
      case 'satellite': return Satellite;
      case 'mission': return Users;
      default: return Rocket;
    }
  };

  return (
    <motion.div
      className="container mx-auto p-4 h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Interactive Space Timeline
        </h2>
        <p className="text-gray-400">Explore major milestones in space exploration history</p>
      </div>

      <div className="relative h-full">
        {/* Timeline Scroll Container */}
        <div className="overflow-x-auto h-full pb-20">
          <div className="flex items-center space-x-8 h-full min-w-max px-8">
            {spaceTimelineEvents.map((event, index) => {
              const Icon = getEventIcon(event.category);
              
              return (
                <motion.div
                  key={event.id}
                  className="flex-shrink-0 w-80"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Timeline Line */}
                  <div className="relative mb-8">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-900"></div>
                  </div>

                  {/* Event Card */}
                  <motion.div
                    className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 cursor-pointer hover:border-blue-500/50 transition-all"
                    whileHover={{ scale: 1.05, y: -10 }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-600/20 rounded-lg">
                          <Icon size={20} className="text-blue-400" />
                        </div>
                        <span className="text-sm text-gray-400">{event.year}</span>
                      </div>
                      <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                        {event.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{event.description}</p>
                    
                    <div className="w-full h-32 bg-gray-800 rounded-lg overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation Hints */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 text-gray-400">
          <ChevronLeft size={20} />
          <span className="text-sm">Scroll horizontally to explore timeline</span>
          <ChevronRight size={20} />
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">{selectedEvent.title}</h2>
                <span className="text-gray-400">{selectedEvent.year}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">{selectedEvent.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                {selectedEvent.category}
              </span>
              <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                {selectedEvent.year}
              </span>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full py-3 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SpaceTimeline;