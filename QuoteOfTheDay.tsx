import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, X, Volume2, RotateCcw } from 'lucide-react';

interface SpaceQuote {
  id: string;
  quote: string;
  author: string;
  context: string;
  category: string;
}

const QuoteOfTheDay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<SpaceQuote | null>(null);

  const spaceQuotes: SpaceQuote[] = [
    {
      id: '1',
      quote: "That's one small step for man, one giant leap for mankind.",
      author: "Neil Armstrong",
      context: "First words spoken on the Moon during Apollo 11 mission",
      category: "Historic"
    },
    {
      id: '2',
      quote: "The Earth is the cradle of humanity, but mankind cannot stay in the cradle forever.",
      author: "Konstantin Tsiolkovsky",
      context: "Russian rocket scientist and pioneer of astronautic theory",
      category: "Visionary"
    },
    {
      id: '3',
      quote: "Space exploration is a force of nature unto itself that no other force in society can rival.",
      author: "Neil deGrasse Tyson",
      context: "Astrophysicist and science communicator",
      category: "Inspirational"
    },
    {
      id: '4',
      quote: "The important achievement of Apollo was demonstrating that humanity is not forever chained to this planet.",
      author: "Carl Sagan",
      context: "Astronomer and planetary scientist",
      category: "Philosophical"
    },
    {
      id: '5',
      quote: "I believe that space travel will one day become as common as airline travel is today.",
      author: "Buzz Aldrin",
      context: "Apollo 11 astronaut and lunar module pilot",
      category: "Futuristic"
    },
    {
      id: '6',
      quote: "The universe is not only stranger than we imagine, it is stranger than we can imagine.",
      author: "J.B.S. Haldane",
      context: "British scientist and geneticist",
      category: "Philosophical"
    },
    {
      id: '7',
      quote: "We choose to go to the Moon not because it is easy, but because it is hard.",
      author: "John F. Kennedy",
      context: "Speech at Rice University, 1962",
      category: "Historic"
    },
    {
      id: '8',
      quote: "The sky is not the limit, it's just the beginning.",
      author: "Unknown",
      context: "Popular space exploration motto",
      category: "Motivational"
    },
    {
      id: '9',
      quote: "Space is for everybody. It's not just for a few people in science or math, or for a select group of astronauts.",
      author: "Christa McAuliffe",
      context: "Teacher and astronaut aboard Space Shuttle Challenger",
      category: "Inclusive"
    },
    {
      id: '10',
      quote: "The Earth is a very small stage in a vast cosmic arena.",
      author: "Carl Sagan",
      context: "From 'Pale Blue Dot: A Vision of the Human Future in Space'",
      category: "Philosophical"
    }
  ];

  useEffect(() => {
    // Get quote of the day based on current date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % spaceQuotes.length;
    setCurrentQuote(spaceQuotes[quoteIndex]);
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * spaceQuotes.length);
    setCurrentQuote(spaceQuotes[randomIndex]);
  };

  const speakQuote = () => {
    if (currentQuote && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Quote of the day: ${currentQuote.quote} by ${currentQuote.author}`
      );
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Historic': return 'bg-blue-600/20 text-blue-300';
      case 'Visionary': return 'bg-purple-600/20 text-purple-300';
      case 'Inspirational': return 'bg-green-600/20 text-green-300';
      case 'Philosophical': return 'bg-indigo-600/20 text-indigo-300';
      case '': return 'bg-orange-600/20 text-orange-300';
      case 'Motivational': return 'bg-red-600/20 text-red-300';
      case 'Inclusive': return 'bg-pink-600/20 text-pink-300';
      default: return 'bg-gray-600/20 text-gray-300';
    }
  };

  if (!currentQuote) return null;

  return (
    <>
      {/* Quote Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg z-40 ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Quote of the Day"
      >
        <Quote size={24} />
      </motion.button>

      {/* Quote Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-white/20"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-600/20 rounded-xl">
                    <Quote size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Quote of the Day</h3>
                    <p className="text-gray-400 text-sm">{new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={getRandomQuote}
                    className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
                    title="Get Random Quote"
                  >
                    <RotateCcw size={20} className="text-blue-400" />
                  </button>
                  <button
                    onClick={speakQuote}
                    className="p-2 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-colors"
                    title="Listen to Quote"
                  >
                    <Volume2 size={20} className="text-green-400" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-red-400" />
                  </button>
                </div>
              </div>

              {/* Quote Content */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="text-6xl text-purple-400/20 absolute -top-4 -left-2">"</div>
                  <blockquote className="text-xl text-white leading-relaxed pl-8 pr-4 italic">
                    {currentQuote.quote}
                  </blockquote>
                  <div className="text-6xl text-purple-400/20 absolute -bottom-8 -right-2 rotate-180">"</div>
                </div>

                <div className="border-l-4 border-purple-500/50 pl-6">
                  <div className="text-lg font-semibold text-purple-300 mb-1">
                    — {currentQuote.author}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {currentQuote.context}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(currentQuote.category)}`}>
                    {currentQuote.category}
                  </span>
                  
                  <div className="text-gray-500 text-sm">
                    Quote #{currentQuote.id} of {spaceQuotes.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuoteOfTheDay;