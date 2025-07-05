import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Volume2, Search, Filter } from 'lucide-react';
import { VoiceAssistantHook } from '../hooks/useVoiceAssistant';

interface SpaceNewsProps {
  voiceAssistant: VoiceAssistantHook;
}

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  source: string;
  image: string;
  readTime: string;
}

const SpaceNews: React.FC<SpaceNewsProps> = ({ voiceAssistant }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'James Webb Space Telescope Discovers Most Distant Galaxy Ever Observed',
      summary: 'Astronomers using the James Webb Space Telescope have identified a galaxy that existed just 400 million years after the Big Bang.',
      content: 'The James Webb Space Telescope has made another groundbreaking discovery, identifying the most distant galaxy ever observed. This galaxy, designated JADES-GS-z13-0, existed when the universe was only 400 million years old, providing unprecedented insights into the early cosmos. The discovery challenges our understanding of how quickly galaxies formed after the Big Bang and offers new clues about the conditions in the primordial universe.',
      date: '2024-01-15',
      category: 'Discovery',
      source: 'NASA',
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg',
      readTime: '3 min'
    },
    {
      id: '2',
      title: 'SpaceX Successfully Launches Starship on Historic Test Flight',
      summary: 'SpaceX\'s Starship completed its most successful test flight to date, reaching orbital velocity and demonstrating key technologies.',
      content: 'SpaceX achieved a major milestone with the successful test flight of its Starship vehicle. The massive rocket reached orbital velocity and demonstrated crucial technologies including in-flight refueling capabilities and heat shield performance. This success brings NASA\'s Artemis program one step closer to returning humans to the Moon and eventually reaching Mars.',
      date: '2024-01-12',
      category: 'Launch',
      source: 'SpaceX',
      image: 'https://images.pexels.com/photos/23793/pexels-photo.jpg',
      readTime: '4 min'
    },
    {
      id: '3',
      title: 'Mars Perseverance Rover Finds Evidence of Ancient Microbial Life',
      summary: 'NASA\'s Perseverance rover has discovered compelling evidence of ancient microbial life in Martian rock samples.',
      content: 'In a groundbreaking discovery, NASA\'s Perseverance rover has found what appears to be fossilized evidence of ancient microbial life on Mars. The rover\'s sophisticated instruments detected organic compounds and mineral formations consistent with biological processes in rock samples from Jezero Crater. This discovery represents the strongest evidence yet that life may have once existed on the Red Planet.',
      date: '2024-01-10',
      category: 'Discovery',
      source: 'NASA JPL',
      image: 'https://images.pexels.com/photos/87009/earth-soil-creep-moon-87009.jpeg',
      readTime: '5 min'
    },
    {
      id: '4',
      title: 'International Space Station to Be Deorbited in 2031',
      summary: 'NASA announces plans to safely deorbit the International Space Station in 2031, ending its remarkable 30+ year mission.',
      content: 'NASA has officially announced that the International Space Station will be safely deorbited in 2031, marking the end of an era for human spaceflight. The ISS has served as humanity\'s outpost in space for over two decades, hosting thousands of scientific experiments and fostering international cooperation. Commercial space stations are being developed to continue the legacy of permanent human presence in low Earth orbit.',
      date: '2024-01-08',
      category: 'Mission',
      source: 'NASA',
      image: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg',
      readTime: '4 min'
    },
    {
      id: '5',
      title: 'China\'s Chang\'e 6 Mission Successfully Returns Samples from Moon\'s Far Side',
      summary: 'China becomes the first nation to successfully return samples from the far side of the Moon with the Chang\'e 6 mission.',
      content: 'China\'s Chang\'e 6 mission has achieved a historic first by successfully returning samples from the far side of the Moon. The mission collected 2 kilograms of lunar material from the South Pole-Aitken Basin, one of the largest impact craters in the solar system. These samples will provide invaluable insights into the Moon\'s formation and the early history of the solar system.',
      date: '2024-01-05',
      category: 'Mission',
      source: 'CNSA',
      image: 'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg',
      readTime: '3 min'
    },
    {
      id: '6',
      title: 'Breakthrough in Fusion Propulsion Could Revolutionize Deep Space Travel',
      summary: 'Scientists achieve a major breakthrough in fusion propulsion technology that could cut travel time to Mars in half.',
      content: 'Researchers at Princeton University have achieved a significant breakthrough in fusion propulsion technology that could revolutionize deep space travel. The new fusion engine design could potentially reduce travel time to Mars from 9 months to just 4 months, making human exploration of the outer solar system more feasible. The technology uses a novel magnetic confinement system that maintains stable fusion reactions for extended periods.',
      date: '2024-01-03',
      category: 'Technology',
      source: 'Princeton University',
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg',
      readTime: '6 min'
    }
  ];

  const categories = ['all', 'Discovery', 'Launch', 'Mission', 'Technology'];

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Discovery': return 'bg-blue-600/20 text-blue-300';
      case 'Launch': return 'bg-green-600/20 text-green-300';
      case 'Mission': return 'bg-purple-600/20 text-purple-300';
      case 'Technology': return 'bg-orange-600/20 text-orange-300';
      default: return 'bg-gray-600/20 text-gray-300';
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
          Latest Space News
        </h2>
        <p className="text-gray-400">Stay updated with the latest developments in space exploration and astronomy</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search news articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-900/60 border border-white/20 rounded-xl text-white focus:border-blue-500 focus:outline-none"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <motion.article
            key={article.id}
            className="bg-gray-900/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer"
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setSelectedArticle(article)}
          >
            <div className="relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    voiceAssistant.speak(`${article.title}. ${article.summary}`);
                  }}
                  className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                >
                  <Volume2 size={16} className="text-white" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar size={14} />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>{article.readTime}</span>
                  <span>{article.source}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                {article.summary}
              </p>
              
              <div className="flex items-center justify-between">
                <motion.button
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Read More</span>
                  <ExternalLink size={14} />
                </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedArticle(null)}
        >
          <motion.div
            className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-white/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(selectedArticle.category)}`}>
                    {selectedArticle.category}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar size={14} />
                    <span>{new Date(selectedArticle.date).toLocaleDateString()}</span>
                  </div>
                  <span className="text-gray-400">{selectedArticle.readTime}</span>
                </div>
                
                <button
                  onClick={() => voiceAssistant.speak(`${selectedArticle.title}. ${selectedArticle.content}`)}
                  className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
                >
                  <Volume2 size={20} />
                </button>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-4">
                {selectedArticle.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                {selectedArticle.summary}
              </p>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  {selectedArticle.content}
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="text-gray-400">
                    Source: {selectedArticle.source}
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-6 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
          <p className="text-gray-400">Try adjusting your search terms or category filter</p>
        </div>
      )}
    </motion.div>
  );
};

export default SpaceNews;