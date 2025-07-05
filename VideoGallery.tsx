import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Clock, Eye, Search, Filter } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: string;
  embedId: string;
  uploadDate: string;
}

const VideoGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const videos: Video[] = [
    {
      id: '1',
      title: 'Journey to Mars: The Future of Human Space Exploration',
      description: 'Explore NASA\'s ambitious plans to send humans to Mars, including the technologies and challenges involved in this historic mission.',
      thumbnail: 'https://i.ytimg.com/vi/21GLi9RJQKc/maxresdefault.jpg',
      duration: '12:45',
      views: '2.3M',
      category: 'Mars Exploration',
      embedId: '21GLi9RJQKc',
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'The James Webb Space Telescope: Unveiling the Universe',
      description: 'Discover how the James Webb Space Telescope is revolutionizing our understanding of the cosmos with unprecedented infrared observations.',
      thumbnail: 'https://i.ytimg.com/vi/OcWEYDddJ7Q/maxresdefault.jpg',
      duration: '18:30',
      views: '4.1M',
      category: 'Space Technology',
      embedId: 'OcWEYDddJ7Q',
      uploadDate: '2024-01-12'
    },
    {
      id: '3',
      title: 'Apollo 11: The Greatest Adventure in Human History',
      description: 'Relive the historic Apollo 11 mission that first landed humans on the Moon, featuring rare footage and interviews.',
      thumbnail: 'https://i.ytimg.com/vi/raN5VLEro1w/maxresdefault.jpg',
      duration: '25:15',
      views: '8.7M',
      category: 'Historical Missions',
      embedId: 'raN5VLEro1w',
      uploadDate: '2024-01-10'
    },
    {
      id: '4',
      title: 'SpaceX Starship: The Vehicle That Will Take Us to Mars',
      description: 'An in-depth look at SpaceX\'s Starship, the most powerful rocket ever built, designed to carry humans to Mars and beyond.',
      thumbnail: 'https://i.ytimg.com/vi/eXrHYolBgTQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBDX5SMkRrYI40up5DRqodaEPs8XQ',
      duration: '15:20',
      views: '3.5M',
      category: 'Space Technology',
      embedId: 'eXrHYolBgTQ',
      uploadDate: '2024-01-08'
    },
    {
      id: '5',
      title: 'Life on the International Space Station',
      description: 'Experience daily life aboard the ISS with astronauts as they conduct experiments and maintain humanity\'s outpost in space.',
      thumbnail: 'https://i.ytimg.com/vi/-Y04Zic1-r4/maxresdefault.jpg',
      duration: '22:10',
      views: '1.9M',
      category: 'Astronaut Life',
      embedId: '-Y04Zic1-r4',
      uploadDate: '2024-01-05'
    },
    {
      id: '6',
      title: 'The Search for Extraterrestrial Life',
      description: 'Join scientists as they search for signs of life beyond Earth, from Mars to the moons of Jupiter and Saturn.',
      thumbnail: 'https://i.ytimg.com/vi/cl_YuKk9mzg/maxresdefault.jpg',
      duration: '20:45',
      views: '2.8M',
      category: 'Astrobiology',
      embedId: 'cl_YuKk9mzg',
      uploadDate: '2024-01-03'
    },
    {
      id: '7',
      title: 'Black Holes: The Most Mysterious Objects in the Universe',
      description: 'Explore the fascinating world of black holes, from their formation to their role in shaping galaxies.',
      thumbnail: 'https://i.ytimg.com/vi/pUWMl5W1b_M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB3FHUuhGGSXVn2ry1JuUaX-Uo3dQ',
      duration: '16:35',
      views: '5.2M',
      category: 'Astrophysics',
      embedId: 'pUWMl5W1b_M',
      uploadDate: '2024-01-01'
    },
    {
      id: '8',
      title: 'Women Pioneers in Space Exploration',
      description: 'Celebrate the achievements of women who broke barriers in space exploration, from Valentina Tereshkova to modern astronauts.',
      thumbnail: 'https://i.ytimg.com/vi/FDxm8DPZFcE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD-HMcMHWP1riHKlkRIDvyDvKSPoQ',
      duration: '19:25',
      views: '1.6M',
      category: 'Historical Missions',
      embedId: 'FDxm8DPZFcE',
      uploadDate: '2023-12-28'
    }
  ];

  const categories = ['all', 'Mars Exploration', 'Space Technology', 'Historical Missions', 'Astronaut Life', 'Astrobiology', 'Astrophysics'];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Mars Exploration': return 'bg-red-600/20 text-red-300';
      case 'Space Technology': return 'bg-blue-600/20 text-blue-300';
      case 'Historical Missions': return 'bg-purple-600/20 text-purple-300';
      case 'Astronaut Life': return 'bg-green-600/20 text-green-300';
      case 'Astrobiology': return 'bg-yellow-600/20 text-yellow-300';
      case 'Astrophysics': return 'bg-indigo-600/20 text-indigo-300';
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
          Space Video Gallery
        </h2>
        <p className="text-gray-400">Explore the universe through captivating documentaries and space mission footage</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search videos..."
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

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <motion.div
            key={video.id}
            className="bg-gray-900/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer group"
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div
                  className="w-16 h-16 bg-blue-600/80 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play size={24} className="text-white ml-1" />
                </motion.div>
              </div>
              
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-sm">
                {video.duration}
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(video.category)}`}>
                  {video.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                {video.title}
              </h3>
              
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                {video.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Eye size={14} />
                  <span>{video.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="bg-gray-900/90 backdrop-blur-md rounded-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.embedId}?autoplay=1`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors z-10"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedVideo.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>{selectedVideo.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{selectedVideo.duration}</span>
                      </div>
                      <span>{new Date(selectedVideo.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(selectedVideo.category)}`}>
                    {selectedVideo.category}
                  </span>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {selectedVideo.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold text-white mb-2">No videos found</h3>
          <p className="text-gray-400">Try adjusting your search terms or category filter</p>
        </div>
      )}
    </motion.div>
  );
};

export default VideoGallery;