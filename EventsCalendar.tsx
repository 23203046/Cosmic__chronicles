import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Volume2, X, Users, MapPin, Award, Clock, DollarSign, Rocket } from 'lucide-react';
import { format, addDays, startOfYear } from 'date-fns';
import { getAstronomicalEvent } from '../data/astronomicalEvents';
import { getPictureOfTheDay } from '../data/pictureOfTheDay';
import { VoiceAssistantHook } from '../hooks/useVoiceAssistant';

interface EventsCalendarProps {
  voiceAssistant: VoiceAssistantHook;
}

const EventsCalendar: React.FC<EventsCalendarProps> = ({ voiceAssistant }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const todayEvent = getAstronomicalEvent(selectedDate);
  const todaysPicture = getPictureOfTheDay(new Date());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const event = getAstronomicalEvent(date);
    setSelectedEvent(event);
    if (event) {
      voiceAssistant.speak(`On ${format(date, 'MMMM do')}, in ${event.year}, ${event.title}. ${event.description}`);
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Today's Event Hero Section */}
      <div className="mb-8">
        <motion.div
          className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Today in Space History
            </h2>
            <div className="flex items-center space-x-2 text-gray-400">
              <Calendar size={20} />
              <span>{format(new Date(), 'MMMM do, yyyy')}</span>
            </div>
          </div>
          
          {todayEvent && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">{todayEvent.title}</h3>
                <p className="text-gray-300 mb-4">{todayEvent.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                    {todayEvent.year}
                  </span>
                  <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                    {todayEvent.category}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users size={16} className="text-green-400" />
                    <h4 className="font-semibold text-green-300">Key People</h4>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {todayEvent.peopleInvolved?.slice(0, 3).map((person: string, index: number) => (
                      <li key={index}>• {person}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin size={16} className="text-orange-400" />
                    <h4 className="font-semibold text-orange-300">Location</h4>
                  </div>
                  <p className="text-gray-300 text-sm">{todayEvent.location}</p>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock size={16} className="text-blue-400" />
                    <h4 className="font-semibold text-blue-300">Duration</h4>
                  </div>
                  <p className="text-gray-300 text-sm">{todayEvent.duration || 'N/A'}</p>
                </div>
              </div>

              <button
                onClick={() => voiceAssistant.speak(`Today's space event: ${todayEvent.title}. ${todayEvent.description}. Key people involved: ${todayEvent.peopleInvolved?.join(', ')}`)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
              >
                <Volume2 size={20} />
                <span>Listen to Today's Event</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-3 text-center text-gray-400 font-semibold">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-8">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={index} className="p-3" />;
          }

          const event = getAstronomicalEvent(date);
          const isSelected = selectedDate.toDateString() === date.toDateString();
          const isToday = new Date().toDateString() === date.toDateString();

          return (
            <motion.button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              className={`relative p-3 rounded-lg text-center transition-all ${
                isSelected
                  ? 'bg-blue-600/30 text-blue-300 ring-2 ring-blue-500'
                  : isToday
                  ? 'bg-purple-600/30 text-purple-300'
                  : event
                  ? 'bg-green-600/20 text-green-300 hover:bg-green-600/30'
                  : 'hover:bg-white/10 text-gray-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-sm font-semibold">{date.getDate()}</div>
              {event && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Picture of the Day Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Rocket size={32} className="text-blue-400" />
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

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                  <p className="text-gray-400">{format(selectedDate, 'MMMM do, yyyy')} • {selectedEvent.year}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => voiceAssistant.speak(`${selectedEvent.title}. ${selectedEvent.description}. People involved: ${selectedEvent.peopleInvolved?.join(', ')}`)}
                    className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
                  >
                    <Volume2 size={20} />
                  </button>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-300">Event Description</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Users size={20} className="text-green-400" />
                      <h4 className="font-semibold text-green-300">People Involved</h4>
                    </div>
                    <ul className="space-y-1">
                      {selectedEvent.peopleInvolved?.map((person: string, index: number) => (
                        <li key={index} className="text-gray-300 text-sm">• {person}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin size={20} className="text-orange-400" />
                      <h4 className="font-semibold text-orange-300">Location</h4>
                    </div>
                    <p className="text-gray-300 text-sm">{selectedEvent.location}</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Award size={20} className="text-yellow-400" />
                    <h4 className="font-semibold text-yellow-300">Key Achievements</h4>
                  </div>
                  <ul className="space-y-1">
                    {selectedEvent.achievements?.map((achievement: string, index: number) => (
                      <li key={index} className="text-gray-300 text-sm">• {achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-semibold text-purple-300 mb-2">Technical Details</h4>
                    <p className="text-gray-300 text-sm">{selectedEvent.technicalDetails}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-300 mb-2">Historical Significance</h4>
                    <p className="text-gray-300 text-sm">{selectedEvent.historicalSignificance}</p>
                  </div>
                </div>

                {selectedEvent.followUpMissions && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-semibold text-cyan-300 mb-2">Follow-up Missions</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.followUpMissions.map((mission: string, index: number) => (
                        <span key={index} className="bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded-full text-xs">
                          {mission}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                    {selectedEvent.category}
                  </span>
                  <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                    {selectedEvent.year}
                  </span>
                  {selectedEvent.duration && (
                    <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm">
                      {selectedEvent.duration}
                    </span>
                  )}
                  {selectedEvent.cost && (
                    <span className="bg-orange-600/20 text-orange-300 px-3 py-1 rounded-full text-sm">
                      {selectedEvent.cost}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsCalendar;