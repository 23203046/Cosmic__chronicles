import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, Heart, Share2, X, ZoomIn } from 'lucide-react';

interface Photo {
  id: string;
  title: string;
  description: string;
  photographer: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  likes: number;
  downloads: number;
}

const PhotoGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());

  const photos: Photo[] = [
    {
      id: '1',
      title: 'Apollo 11 Crew Portrait',
      description: 'Historic portrait of Neil Armstrong, Buzz Aldrin, and Michael Collins before their historic Moon landing mission.',
      photographer: 'NASA',
      date: '1969-07-16',
      category: 'Astronauts',
      tags: ['apollo', 'moon', 'crew', 'historic'],
      image: 'https://www.nasa.gov/wp-content/uploads/2023/03/s69-31739orig.jpg',
      likes: 15420,
      downloads: 8932
    },
    {
      id: '2',
      title: 'SpaceX Falcon Heavy Launch',
      description: 'The spectacular maiden flight of SpaceX\'s Falcon Heavy rocket, the most powerful operational rocket in the world.',
      photographer: 'SpaceX',
      date: '2018-02-06',
      category: 'Rocket Launches',
      tags: ['spacex', 'falcon heavy', 'launch', 'rockets'],
      image: 'https://cdn.mos.cms.futurecdn.net/NMwasUPmRFzY3ayztk55yS.jpg',
      likes: 23156,
      downloads: 12847
    },
    {
      id: '3',
      title: 'Valentina Tereshkova in Training',
      description: 'The first woman in space during her intensive training program before the historic Vostok 6 mission.',
      photographer: 'Soviet Space Program',
      date: '1963-06-16',
      category: 'Astronauts',
      tags: ['valentina', 'first woman', 'vostok', 'training'],
      image: 'https://starcity-tours.com/wp-content/gallery/tereshkova/02.jpg',
      likes: 9876,
      downloads: 5432
    },
    {
      id: '4',
      title: 'Space Shuttle Atlantis Final Landing',
      description: 'The emotional final landing of Space Shuttle Atlantis, marking the end of the Space Shuttle program.',
      photographer: 'NASA',
      date: '2011-07-21',
      category: 'Rocket Launches',
      tags: ['atlantis', 'shuttle', 'final', 'landing'],
      image: 'https://cdn.mos.cms.futurecdn.net/LSBkLRYiDn2yQ4itVBDux8.jpg',
      likes: 18743,
      downloads: 9654
    },
    {
      id: '5',
      title: 'ISS Crew Expedition 64',
      description: 'International crew aboard the International Space Station representing global cooperation in space exploration.',
      photographer: 'NASA',
      date: '2021-04-17',
      category: 'Astronauts',
      tags: ['iss', 'crew', 'international', 'cooperation'],
      image: 'https://www.nasa.gov/wp-content/uploads/2023/03/iss064e020858.jpg?w=1041',
      likes: 12389,
      downloads: 7123
    },
    {
      id: '6',
      title: 'Saturn V Rocket Assembly',
      description: 'The massive Saturn V rocket being assembled in the Vehicle Assembly Building for the Apollo missions.',
      photographer: 'NASA',
      date: '1968-12-15',
      category: 'Rocket Launches',
      tags: ['saturn v', 'apollo', 'assembly', 'vab'],
      image: 'https://cdn-imgix.headout.com/media/images/67c24d22de5566d20d06f870470f7a2b-This%20is%20a%20Photograph%20of%20Saturn%20V%20Rocket.jpg?auto=format&w=1222.3999999999999&h=687.6&q=90&ar=16%3A9&crop=faces&fit=crop',
      likes: 16754,
      downloads: 8976
    },
    {
      id: '7',
      title: 'Mae Jemison in Space',
      description: 'Dr. Mae Jemison, the first African American woman astronaut, conducting experiments aboard Space Shuttle Endeavour.',
      photographer: 'NASA',
      date: '1992-09-12',
      category: 'Astronauts',
      tags: ['mae jemison', 'endeavour', 'first', 'experiments'],
      image: 'https://images-assets.nasa.gov/image/STS047-37-003/STS047-37-003~large.jpg',
      likes: 14567,
      downloads: 6789
    },
    {
      id: '8',
      title: 'Perseverance Rover Selfie on Mars',
      description: 'NASA\'s Perseverance rover takes a selfie on the Martian surface while searching for signs of ancient life.',
      photographer: 'NASA JPL',
      date: '2021-04-06',
      category: 'Space Missions',
      tags: ['perseverance', 'mars', 'rover', 'selfie'],
      image: 'https://www.metaltechnews.com/IMG/JjKbxcBkeoWcreshZdYOtxyUtD83t/XPATH/home/cms_data/dfault/photos/stories/id/0/4/1704/s_topXEXT1493x33160is.jpg',
      likes: 21098,
      downloads: 11234
    },
    {
      id: '9',
      title: 'Blue Origin New Shepard Launch',
      description: 'Blue Origin\'s New Shepard rocket launches carrying civilian astronauts to the edge of space.',
      photographer: 'Blue Origin',
      date: '2021-07-20',
      category: 'Rocket Launches',
      tags: ['blue origin', 'new shepard', 'civilian', 'suborbital'],
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2rNgcqmPBoTtQUl0m4rx9hIOy8z9MyIdSjw&s',
      likes: 13456,
      downloads: 7890
    },
    {
      id: '10',
      title: 'Sunita Williams Spacewalk',
      description: 'Astronaut Sunita Williams conducting a spacewalk outside the International Space Station.',
      photographer: 'NASA',
      date: '2007-01-31',
      category: 'Astronauts',
      tags: ['sunita williams', 'spacewalk', 'eva', 'iss'],
      image: 'https://c.ndtvimg.com/2025-03/2ej5tah8_sunita-williams_625x300_10_March_25.jpg?im=FitAndFill,algorithm=dnn,width=1200,height=738',
      likes: 17234,
      downloads: 9123
    },
    {
      id: '11',
      title: 'James Webb Space Telescope Deployment',
      description: 'The James Webb Space Telescope unfolds its golden mirror segments in space, ready to observe the universe.',
      photographer: 'NASA',
      date: '2022-01-08',
      category: 'Space Missions',
      tags: ['james webb', 'telescope', 'deployment', 'mirror'],
      image: 'https://static.scientificamerican.com/sciam/cache/file/48248979-B95D-4B9F-A5A565B5C810FFE5_source.jpg',
      likes: 25678,
      downloads: 14567
    },
    {
      id: '12',
      title: 'Artemis I Launch',
      description: 'NASA\'s Artemis I mission launches, beginning humanity\'s return journey to the Moon.',
      photographer: 'NASA',
      date: '2022-11-16',
      category: 'Rocket Launches',
      tags: ['artemis', 'sls', 'moon', 'launch'],
      image: 'https://bgr.com/wp-content/uploads/2020/08/AdobeStock_155258329-Recovered-Recovered-1.jpg?quality=82&strip=all',
      likes: 19876,
      downloads: 10543
    }
  ];

  const categories = ['all', 'Astronauts', 'Rocket Launches', 'Space Missions'];

  const filteredPhotos = photos.filter(photo => {
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (photoId: string) => {
    const newLikedPhotos = new Set(likedPhotos);
    if (newLikedPhotos.has(photoId)) {
      newLikedPhotos.delete(photoId);
    } else {
      newLikedPhotos.add(photoId);
    }
    setLikedPhotos(newLikedPhotos);
  };

  const downloadPhoto = (photo: Photo) => {
    // In a real app, this would download the actual image
    const link = document.createElement('a');
    link.href = photo.image;
    link.download = `${photo.title.replace(/\s+/g, '_')}.jpg`;
    link.click();
  };

  const sharePhoto = (photo: Photo) => {
    if (navigator.share) {
      navigator.share({
        title: photo.title,
        text: photo.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${photo.title} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Astronauts': return 'bg-blue-600/20 text-blue-300';
      case 'Rocket Launches': return 'bg-red-600/20 text-red-300';
      case 'Space Missions': return 'bg-green-600/20 text-green-300';
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
          Space Photo Gallery
        </h2>
        <p className="text-gray-400">Explore stunning images of astronauts, rocket launches, and space missions</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search photos..."
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

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            className="bg-gray-900/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all group cursor-pointer"
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn size={32} className="text-white" />
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(photo.category)}`}>
                  {photo.category}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(photo.id);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    likedPhotos.has(photo.id)
                      ? 'bg-red-600/80 text-red-200'
                      : 'bg-black/50 hover:bg-black/70 text-white'
                  }`}
                >
                  <Heart size={16} fill={likedPhotos.has(photo.id) ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sharePhoto(photo);
                  }}
                  className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors text-white"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                {photo.title}
              </h3>
              
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                {photo.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{photo.photographer}</span>
                <span>{new Date(photo.date).getFullYear()}</span>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Heart size={14} />
                  <span>{photo.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download size={14} />
                  <span>{photo.downloads.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Photo Detail Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="bg-gray-900/90 backdrop-blur-md rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedPhoto.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-gray-400 mb-3">
                      <span>By {selectedPhoto.photographer}</span>
                      <span>{new Date(selectedPhoto.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(selectedPhoto.category)}`}>
                    {selectedPhoto.category}
                  </span>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  {selectedPhoto.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPhoto.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 text-gray-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Heart size={16} />
                      <span>{selectedPhoto.likes.toLocaleString()} likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download size={16} />
                      <span>{selectedPhoto.downloads.toLocaleString()} downloads</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleLike(selectedPhoto.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        likedPhotos.has(selectedPhoto.id)
                          ? 'bg-red-600/20 text-red-300 hover:bg-red-600/30'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <Heart size={16} fill={likedPhotos.has(selectedPhoto.id) ? 'currentColor' : 'none'} />
                      <span>Like</span>
                    </button>
                    <button
                      onClick={() => downloadPhoto(selectedPhoto)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors"
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => sharePhoto(selectedPhoto)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded-lg transition-colors"
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-semibold text-white mb-2">No photos found</h3>
          <p className="text-gray-400">Try adjusting your search terms or category filter</p>
        </div>
      )}
    </motion.div>
  );
};

export default PhotoGallery;