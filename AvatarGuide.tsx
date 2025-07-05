import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RotateCcw, Download, Shirt, User, Palette, X } from 'lucide-react';

const AvatarGuide: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedSuit, setSelectedSuit] = useState('nasa');
  const [selectedAccessory, setSelectedAccessory] = useState('helmet');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [suitColor, setSuitColor] = useState('#ffffff');

  const spaceSuits = [
    {
      id: 'nasa',
      name: 'NASA EMU Suit',
      description: 'Classic NASA spacesuit',
      baseColor: '#ffffff',
      image: '🚀'
    },
    {
      id: 'spacex',
      name: 'SpaceX Dragon Suit',
      description: 'Sleek SpaceX suit',
      baseColor: '#2c2c2c',
      image: '🛸'
    },
    {
      id: 'retro',
      name: 'Retro Space Suit',
      description: 'Vintage space suit',
      baseColor: '#c0c0c0',
      image: '👨‍🚀'
    },
    {
      id: 'mars',
      name: 'Mars Explorer Suit',
      description: 'Mars exploration suit',
      baseColor: '#cd5c5c',
      image: '🔴'
    }
  ];

  const accessories = [
    { id: 'helmet', name: 'Space Helmet', emoji: '⛑️' },
    { id: 'visor', name: 'Reflective Visor', emoji: '🥽' },
    { id: 'antenna', name: 'Communication Antenna', emoji: '📡' },
    { id: 'jetpack', name: 'Jetpack', emoji: '🎒' },
    { id: 'none', name: 'No Accessory', emoji: '❌' }
  ];

  const suitColors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Silver', value: '#c0c0c0' },
    { name: 'Black', value: '#2c2c2c' },
    { name: 'Blue', value: '#4a90e2' },
    { name: 'Red', value: '#e74c3c' },
    { name: 'Orange', value: '#f39c12' },
    { name: 'Green', value: '#27ae60' },
    { name: 'Purple', value: '#9b59b6' }
  ];

  useEffect(() => {
    return () => {
      if (isStreaming && videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isStreaming]);

  useEffect(() => {
    // Update suit color when suit type changes
    const selectedSuitData = spaceSuits.find(suit => suit.id === selectedSuit);
    if (selectedSuitData) {
      setSuitColor(selectedSuitData.baseColor);
    }
  }, [selectedSuit]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please ensure you have granted camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the video frame
        ctx.drawImage(video, 0, 0);
        
        // Get suit color RGB values
        const rgb = hexToRgb(suitColor);
        
        // Create astronaut suit overlay
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Draw suit body with selected color
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
        
        // Suit torso
        ctx.fillRect(centerX - 120, centerY + 20, 240, 200);
        
        // Suit arms
        ctx.fillRect(centerX - 180, centerY + 40, 60, 120);
        ctx.fillRect(centerX + 120, centerY + 40, 60, 120);
        
        // Suit collar/neck area
        ctx.fillRect(centerX - 80, centerY - 20, 160, 40);
        
        // Draw suit details with darker shade
        const darkerRgb = {
          r: Math.max(0, rgb.r - 50),
          g: Math.max(0, rgb.g - 50),
          b: Math.max(0, rgb.b - 50)
        };
        ctx.strokeStyle = `rgb(${darkerRgb.r}, ${darkerRgb.g}, ${darkerRgb.b})`;
        ctx.lineWidth = 3;
        
        // Suit outline
        ctx.strokeRect(centerX - 120, centerY + 20, 240, 200);
        ctx.strokeRect(centerX - 180, centerY + 40, 60, 120);
        ctx.strokeRect(centerX + 120, centerY + 40, 60, 120);
        ctx.strokeRect(centerX - 80, centerY - 20, 160, 40);
        
        // Control panel on chest
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(centerX - 40, centerY + 60, 80, 60);
        ctx.strokeRect(centerX - 40, centerY + 60, 80, 60);
        
        // Control buttons
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(centerX - 30, centerY + 70, 15, 15);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(centerX - 10, centerY + 70, 15, 15);
        ctx.fillStyle = '#0000ff';
        ctx.fillRect(centerX + 10, centerY + 70, 15, 15);
        
        // Life support tubes
        ctx.strokeStyle = '#666666';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(centerX - 60, centerY + 30);
        ctx.quadraticCurveTo(centerX - 100, centerY + 50, centerX - 80, centerY + 100);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX + 60, centerY + 30);
        ctx.quadraticCurveTo(centerX + 100, centerY + 50, centerX + 80, centerY + 100);
        ctx.stroke();
        
        // Draw accessories
        if (selectedAccessory === 'helmet') {
          // Helmet glass with transparency
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 8;
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = '#87ceeb';
          ctx.beginPath();
          ctx.arc(centerX, centerY - 60, 100, 0, 2 * Math.PI);
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.stroke();
          
          // Helmet reflection
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.arc(centerX - 30, centerY - 80, 40, 0, 2 * Math.PI);
          ctx.fill();
        } else if (selectedAccessory === 'visor') {
          // Reflective visor
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.beginPath();
          ctx.arc(centerX, centerY - 60, 90, 0, 2 * Math.PI);
          ctx.fill();
          
          // Visor reflection
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.beginPath();
          ctx.arc(centerX - 20, centerY - 70, 30, 0, 2 * Math.PI);
          ctx.fill();
        } else if (selectedAccessory === 'antenna') {
          // Communication antenna
          ctx.strokeStyle = '#ffff00';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(centerX + 80, centerY - 100);
          ctx.lineTo(centerX + 80, centerY - 150);
          ctx.stroke();
          
          // Antenna tip
          ctx.fillStyle = '#ff0000';
          ctx.beginPath();
          ctx.arc(centerX + 80, centerY - 150, 5, 0, 2 * Math.PI);
          ctx.fill();
        } else if (selectedAccessory === 'jetpack') {
          // Jetpack
          ctx.fillStyle = '#444444';
          ctx.fillRect(centerX - 30, centerY + 180, 60, 40);
          ctx.strokeStyle = '#666666';
          ctx.lineWidth = 2;
          ctx.strokeRect(centerX - 30, centerY + 180, 60, 40);
          
          // Jetpack thrusters
          ctx.fillStyle = '#ff6600';
          ctx.fillRect(centerX - 20, centerY + 220, 15, 20);
          ctx.fillRect(centerX + 5, centerY + 220, 15, 20);
        }
        
        // NASA/Mission patches
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // Left shoulder patch
        ctx.fillRect(centerX - 150, centerY + 50, 30, 20);
        ctx.fillStyle = '#000000';
        ctx.fillText('NASA', centerX - 135, centerY + 63);
        
        // Right shoulder patch (flag)
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(centerX + 120, centerY + 50, 30, 20);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(centerX + 120, centerY + 50, 30, 10);
        ctx.fillStyle = '#0000ff';
        ctx.fillRect(centerX + 120, centerY + 50, 10, 10);
        
        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
      }
    }
  };

  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = `space-avatar-${Date.now()}.png`;
      link.href = capturedImage;
      link.click();
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
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
          Space Avatar Creator
        </h2>
        <p className="text-gray-400">Create your personalized space avatar with different suits, colors, and accessories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Camera/Preview Section */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Camera Preview</h3>
              <div className="flex space-x-2">
                {!isStreaming ? (
                  <motion.button
                    onClick={startCamera}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera size={20} />
                    <span>Start Camera</span>
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      onClick={capturePhoto}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Camera size={20} />
                      <span>Capture</span>
                    </motion.button>
                    <motion.button
                      onClick={stopCamera}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RotateCcw size={20} />
                      <span>Stop</span>
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
              {!capturedImage ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Live Preview Overlay */}
                  {isStreaming && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Suit Preview Outline */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="border-4 border-dashed opacity-50 rounded-lg"
                          style={{ 
                            borderColor: suitColor,
                            width: '240px',
                            height: '200px',
                            marginTop: '20px'
                          }}
                        />
                      </div>
                      
                      {/* Helmet/Accessory Outline */}
                      {selectedAccessory !== 'none' && (
                        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-48 h-48 border-4 border-white/30 rounded-full"></div>
                      )}
                      
                      {/* HUD Elements */}
                      <div className="absolute top-4 left-4 text-green-400 font-mono text-sm">
                        <div>SUIT: {spaceSuits.find(s => s.id === selectedSuit)?.name}</div>
                        <div>COLOR: {suitColors.find(c => c.value === suitColor)?.name}</div>
                        <div>ACCESSORY: {accessories.find(a => a.id === selectedAccessory)?.name}</div>
                        <div>STATUS: ACTIVE</div>
                        <div>O2: 98%</div>
                      </div>
                      
                      <div className="absolute top-4 right-4 text-blue-400 font-mono text-sm">
                        <div>CAM: FRONT</div>
                        <div>REC: ●</div>
                      </div>
                    </div>
                  )}
                  
                  {!isStreaming && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <User size={64} className="text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400">Click "Start Camera" to begin</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="relative">
                  <img src={capturedImage} alt="Captured avatar" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <motion.button
                      onClick={downloadImage}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </motion.button>
                    <motion.button
                      onClick={resetCapture}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RotateCcw size={16} />
                      <span>Retake</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>

        {/* Customization Panel */}
        <div className="space-y-6">
          {/* Space Suits */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-4">
              <Shirt size={20} className="text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Space Suits</h3>
            </div>
            
            <div className="space-y-3">
              {spaceSuits.map((suit) => (
                <motion.div
                  key={suit.id}
                  onClick={() => setSelectedSuit(suit.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedSuit === suit.id
                      ? 'bg-blue-600/30 border-blue-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{suit.image}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-white text-sm">{suit.name}</div>
                      <div className="text-gray-400 text-xs">{suit.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Suit Colors */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-4">
              <Palette size={20} className="text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Suit Colors</h3>
            </div>
            
            <div className="grid grid-cols-4 gap-3 mb-4">
              {suitColors.map((color) => (
                <motion.div
                  key={color.value}
                  onClick={() => setSuitColor(color.value)}
                  className={`aspect-square rounded-lg cursor-pointer border-2 transition-all ${
                    suitColor === color.value
                      ? 'border-white scale-110'
                      : 'border-white/20 hover:border-white/50'
                  }`}
                  style={{ backgroundColor: color.value }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={color.name}
                />
              ))}
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">Custom Color</label>
              <input
                type="color"
                value={suitColor}
                onChange={(e) => setSuitColor(e.target.value)}
                className="w-full h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
              />
            </div>
          </div>

          {/* Accessories */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-4">
              <Palette size={20} className="text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Accessories</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {accessories.map((accessory) => (
                <motion.div
                  key={accessory.id}
                  onClick={() => setSelectedAccessory(accessory.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border text-center ${
                    selectedAccessory === accessory.id
                      ? 'bg-orange-600/30 border-orange-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-2xl mb-1">{accessory.emoji}</div>
                  <div className="text-white text-xs">{accessory.name}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">How to Use</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start space-x-2">
                <span className="text-blue-400">1.</span>
                <span>Choose your space suit type and customize the color</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-400">2.</span>
                <span>Select accessories like helmet or jetpack</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-400">3.</span>
                <span>Click "Start Camera" to activate your webcam</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-400">4.</span>
                <span>Position your face in the center for the helmet</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-400">5.</span>
                <span>Click "Capture" to create your space avatar!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AvatarGuide;