import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Trophy, Star, Rocket, RotateCcw, Home, Target, Zap } from 'lucide-react';

const SpaceGames: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  // Constellation Matching Game State
  const [constellationScore, setConstellationScore] = useState(0);
  const [constellationMatches, setConstellationMatches] = useState<{[key: string]: string}>({});
  const [selectedConstellation, setSelectedConstellation] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [shuffledDescriptions, setShuffledDescriptions] = useState<string[]>([]);

  // Rocket Launch Game State
  const [rocketAngle, setRocketAngle] = useState(45);
  const [rocketPower, setRocketPower] = useState(50);
  const [launchResult, setLaunchResult] = useState<string | null>(null);
  const [rocketLaunches, setRocketLaunches] = useState(0);
  const [successfulLaunches, setSuccessfulLaunches] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);
  const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0 });

  // Cut & Glue Rocket Game State
  const [cutPieces, setCutPieces] = useState<Set<string>>(new Set());
  const [gluedPieces, setGluedPieces] = useState<string[]>([]);
  const [rocketComplete, setRocketComplete] = useState(false);

  // Make a Wish Feature
  const [showMeteor, setShowMeteor] = useState(false);
  const [wishMessage, setWishMessage] = useState<string | null>(null);

  const quizQuestions = [
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Saturn", "Neptune"],
      correct: 1
    },
    {
      question: "How many moons does Mars have?",
      options: ["1", "2", "3", "4"],
      correct: 1
    },
    {
      question: "What is the closest star to Earth?",
      options: ["Alpha Centauri", "Sirius", "The Sun", "Proxima Centauri"],
      correct: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Mercury"],
      correct: 1
    },
    {
      question: "What is a light-year?",
      options: ["A unit of time", "A unit of distance", "A unit of speed", "A unit of mass"],
      correct: 1
    }
  ];

  const constellations = [
    { name: 'Ursa Major', description: 'The Great Bear constellation containing the Big Dipper' },
    { name: 'Orion', description: 'The Hunter constellation with three bright stars in a row' },
    { name: 'Cassiopeia', description: 'The Queen constellation shaped like a W' },
    { name: 'Leo', description: 'The Lion constellation visible in spring' },
    { name: 'Scorpius', description: 'The Scorpion constellation with bright red star Antares' }
  ];

  const rocketPieces = [
    { id: 'nose', name: 'Nose Cone', color: 'bg-red-500', order: 1 },
    { id: 'body1', name: 'Upper Body', color: 'bg-blue-500', order: 2 },
    { id: 'body2', name: 'Middle Body', color: 'bg-green-500', order: 3 },
    { id: 'body3', name: 'Lower Body', color: 'bg-yellow-500', order: 4 },
    { id: 'fins', name: 'Fins', color: 'bg-purple-500', order: 5 },
    { id: 'engine', name: 'Engine', color: 'bg-orange-500', order: 6 }
  ];

  // Shuffle constellation descriptions
  useEffect(() => {
    const descriptions = constellations.map(c => c.description);
    const shuffled = [...descriptions].sort(() => Math.random() - 0.5);
    setShuffledDescriptions(shuffled);
  }, [selectedGame]);

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowCorrectAnswer(true);
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setQuizScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowCorrectAnswer(false);
      } else {
        setShowQuizResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setShowQuizResult(false);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
  };

  const launchRocket = () => {
    setRocketLaunches(prev => prev + 1);
    setIsLaunching(true);
    
    // Calculate success based on angle and power
    const optimalAngle = 45;
    const optimalPower = 75;
    
    const angleDiff = Math.abs(rocketAngle - optimalAngle);
    const powerDiff = Math.abs(rocketPower - optimalPower);
    
    const success = angleDiff < 15 && powerDiff < 25;
    
    // Animate rocket launch
    const startX = 50;
    const startY = 80;
    const endX = startX + (rocketPower * Math.cos(rocketAngle * Math.PI / 180)) / 2;
    const endY = startY - (rocketPower * Math.sin(rocketAngle * Math.PI / 180)) / 2;
    
    setRocketPosition({ x: startX, y: startY });
    
    setTimeout(() => {
      setRocketPosition({ x: endX, y: Math.max(endY, 10) });
    }, 100);
    
    setTimeout(() => {
      setIsLaunching(false);
      setRocketPosition({ x: 0, y: 0 });
      
      if (success) {
        setSuccessfulLaunches(prev => prev + 1);
        setLaunchResult('🚀 Successful Launch! Your rocket reached orbit!');
      } else {
        setLaunchResult('💥 Launch Failed. Adjust your angle and power settings.');
      }
      
      setTimeout(() => setLaunchResult(null), 3000);
    }, 2000);
  };

  const cutPiece = (pieceId: string) => {
    setCutPieces(prev => new Set([...prev, pieceId]));
  };

  const gluePiece = (pieceId: string) => {
    if (cutPieces.has(pieceId) && !gluedPieces.includes(pieceId)) {
      const newGluedPieces = [...gluedPieces, pieceId];
      setGluedPieces(newGluedPieces);
      
      // Check if rocket is complete and in correct order
      if (newGluedPieces.length === rocketPieces.length) {
        const correctOrder = rocketPieces
          .sort((a, b) => a.order - b.order)
          .map(p => p.id);
        
        if (JSON.stringify(newGluedPieces) === JSON.stringify(correctOrder)) {
          setRocketComplete(true);
        }
      }
    }
  };

  const resetCutGlue = () => {
    setCutPieces(new Set());
    setGluedPieces([]);
    setRocketComplete(false);
  };

  const makeWish = () => {
    setShowMeteor(true);
    const wishes = [
      "May your dreams reach the stars! ⭐",
      "Wishing you cosmic adventures! 🌌",
      "May you find wonder in the universe! 🌟",
      "Your curiosity will take you far! 🚀",
      "Keep exploring the infinite! ✨"
    ];
    
    setWishMessage(wishes[Math.floor(Math.random() * wishes.length)]);
    
    setTimeout(() => {
      setShowMeteor(false);
      setWishMessage(null);
    }, 4000);
  };

  const games = [
    {
      id: 'quiz',
      title: 'Space Quiz Challenge',
      description: 'Test your knowledge of the cosmos',
      icon: <Target className="w-8 h-8" />,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'cut-glue',
      title: 'Cut & Glue Rocket',
      description: 'Build a rocket by cutting and gluing pieces',
      icon: <Rocket className="w-8 h-8" />,
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'constellation',
      title: 'Constellation Match',
      description: 'Match constellations with their descriptions',
      icon: <Star className="w-8 h-8" />,
      color: 'from-yellow-500 to-red-500'
    },
    {
      id: 'rocket-launch',
      title: 'Rocket Launch Simulator',
      description: 'Calculate the perfect launch trajectory',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const renderGameContent = () => {
    switch (selectedGame) {
      case 'quiz':
        return (
          <div className="max-w-2xl mx-auto">
            {!showQuizResult ? (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </h3>
                  <div className="text-white/80">Score: {quizScore}</div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-xl text-white mb-6">
                    {quizQuestions[currentQuestion].question}
                  </h4>
                  
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={showCorrectAnswer}
                        className={`w-full p-4 rounded-lg text-left transition-all ${
                          showCorrectAnswer
                            ? index === quizQuestions[currentQuestion].correct
                              ? 'bg-green-500 text-white'
                              : index === selectedAnswer
                              ? 'bg-red-500 text-white'
                              : 'bg-white/20 text-white/60'
                            : 'bg-white/20 hover:bg-white/30 text-white'
                        }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h3>
                <p className="text-xl text-white/80 mb-6">
                  You scored {quizScore} out of {quizQuestions.length}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetQuiz}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  <RotateCcw className="w-5 h-5 inline mr-2" />
                  Play Again
                </motion.button>
              </div>
            )}
          </div>
        );

      case 'cut-glue':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Cut & Glue Rocket</h3>
                {rocketComplete && <Trophy className="w-8 h-8 text-yellow-400" />}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cutting Area */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">1. Cut the Pieces</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {rocketPieces.map((piece) => (
                      <motion.div
                        key={piece.id}
                        onClick={() => cutPiece(piece.id)}
                        className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                          cutPieces.has(piece.id)
                            ? 'border-green-500 bg-green-500/20'
                            : 'border-dashed border-white/30 hover:border-white/50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`w-full h-16 ${piece.color} rounded mb-2 ${
                          cutPieces.has(piece.id) ? 'opacity-50' : ''
                        }`} />
                        <p className="text-white text-sm text-center">{piece.name}</p>
                        {cutPieces.has(piece.id) && (
                          <p className="text-green-400 text-xs text-center mt-1">✂️ Cut!</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Gluing Area */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">2. Glue in Order</h4>
                  <div className="bg-white/5 rounded-xl p-6 min-h-96">
                    <div className="space-y-2">
                      {rocketPieces
                        .sort((a, b) => a.order - b.order)
                        .map((piece) => (
                          <motion.div
                            key={piece.id}
                            onClick={() => gluePiece(piece.id)}
                            className={`w-full h-12 rounded cursor-pointer transition-all ${
                              gluedPieces.includes(piece.id)
                                ? `${piece.color} border-2 border-white/50`
                                : cutPieces.has(piece.id)
                                ? 'border-2 border-dashed border-blue-400 hover:bg-blue-400/20'
                                : 'border-2 border-dashed border-white/20'
                            }`}
                            whileHover={cutPieces.has(piece.id) && !gluedPieces.includes(piece.id) ? { scale: 1.02 } : {}}
                          >
                            {gluedPieces.includes(piece.id) && (
                              <div className="flex items-center justify-center h-full text-white font-semibold">
                                {piece.name} ✅
                              </div>
                            )}
                            {!gluedPieces.includes(piece.id) && cutPieces.has(piece.id) && (
                              <div className="flex items-center justify-center h-full text-blue-400 text-sm">
                                Click to glue {piece.name}
                              </div>
                            )}
                          </motion.div>
                        ))}
                    </div>
                    
                    {rocketComplete && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 text-center"
                      >
                        <div className="text-4xl mb-2">🚀</div>
                        <p className="text-green-400 font-bold">Rocket Complete!</p>
                        <p className="text-white/80 text-sm">Ready for launch!</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetCutGlue}
                className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
              >
                <RotateCcw className="w-5 h-5 inline mr-2" />
                Reset Game
              </motion.button>
            </div>
          </div>
        );

      case 'constellation':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Constellation Match</h3>
                <div className="text-white/80">Score: {constellationScore}</div>
              </div>
              
              {!gameCompleted ? (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Constellations</h4>
                    <div className="space-y-2">
                      {constellations.map((constellation) => (
                        <motion.button
                          key={constellation.name}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedConstellation(constellation.name)}
                          disabled={constellationMatches[constellation.name]}
                          className={`w-full p-3 rounded-lg text-left transition-all ${
                            constellationMatches[constellation.name]
                              ? 'bg-green-500 text-white'
                              : selectedConstellation === constellation.name
                              ? 'bg-blue-500 text-white'
                              : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                        >
                          <Star className="w-4 h-4 inline mr-2" />
                          {constellation.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Descriptions (Shuffled)</h4>
                    <div className="space-y-2">
                      {shuffledDescriptions.map((description, index) => {
                        const matchedConstellation = constellations.find(c => c.description === description);
                        const isMatched = matchedConstellation && constellationMatches[matchedConstellation.name];
                        
                        return (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              if (selectedConstellation && matchedConstellation && selectedConstellation === matchedConstellation.name) {
                                setConstellationMatches(prev => ({
                                  ...prev,
                                  [matchedConstellation.name]: description
                                }));
                                setConstellationScore(prev => prev + 1);
                                setSelectedConstellation(null);
                                
                                if (Object.keys(constellationMatches).length === constellations.length - 1) {
                                  setGameCompleted(true);
                                }
                              }
                            }}
                            disabled={isMatched}
                            className={`w-full p-3 rounded-lg text-left transition-all ${
                              isMatched
                                ? 'bg-green-500 text-white'
                                : 'bg-white/20 hover:bg-white/30 text-white'
                            }`}
                          >
                            {description}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-white mb-4">Congratulations!</h4>
                  <p className="text-white/80 mb-6">
                    You've matched all constellations correctly!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setConstellationMatches({});
                      setConstellationScore(0);
                      setGameCompleted(false);
                      setSelectedConstellation(null);
                      // Reshuffle descriptions
                      const descriptions = constellations.map(c => c.description);
                      const shuffled = [...descriptions].sort(() => Math.random() - 0.5);
                      setShuffledDescriptions(shuffled);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    <RotateCcw className="w-5 h-5 inline mr-2" />
                    Play Again
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        );

      case 'rocket-launch':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Rocket Launch Simulator</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Launch Angle: {rocketAngle}°
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      value={rocketAngle}
                      onChange={(e) => setRocketAngle(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-sm text-white/60 mt-1">
                      Optimal: 45° for maximum range
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Engine Power: {rocketPower}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={rocketPower}
                      onChange={(e) => setRocketPower(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-sm text-white/60 mt-1">
                      Optimal: 75% for efficient orbit
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={launchRocket}
                    disabled={isLaunching}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-semibold text-lg disabled:opacity-50"
                  >
                    <Rocket className="w-6 h-6 inline mr-2" />
                    {isLaunching ? 'Launching...' : 'Launch Rocket!'}
                  </motion.button>
                  
                  {launchResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        launchResult.includes('Successful') 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {launchResult}
                    </motion.div>
                  )}
                </div>
                
                {/* Launch Visualization */}
                <div className="bg-gradient-to-b from-blue-900 to-green-800 rounded-xl p-6 relative overflow-hidden h-96">
                  <h4 className="text-white font-semibold mb-4">Launch Visualization</h4>
                  
                  {/* Stars */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 60}%`,
                      }}
                    />
                  ))}
                  
                  {/* Ground */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-600 to-green-500" />
                  
                  {/* Launch Pad */}
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-600 rounded-t" />
                  
                  {/* Rocket */}
                  <motion.div
                    className="absolute w-6 h-12 text-2xl flex items-center justify-center"
                    style={{
                      left: `${rocketPosition.x || 50}%`,
                      bottom: `${rocketPosition.y || 20}%`,
                      transform: `rotate(${rocketAngle}deg)`,
                    }}
                    animate={isLaunching ? {
                      left: `${rocketPosition.x}%`,
                      bottom: `${rocketPosition.y}%`,
                    } : {}}
                    transition={{ duration: 2, ease: "easeOut" }}
                  >
                    🚀
                    {isLaunching && (
                      <motion.div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                      >
                        🔥
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Launch Statistics */}
                  <div className="absolute top-4 right-4 bg-black/50 rounded-lg p-3 text-white text-sm">
                    <div>Launches: {rocketLaunches}</div>
                    <div>Success: {successfulLaunches}</div>
                    <div>Rate: {rocketLaunches > 0 ? Math.round((successfulLaunches / rocketLaunches) * 100) : 0}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Meteor shower for wishes */}
      <AnimatePresence>
        {showMeteor && (
          <motion.div
            initial={{ x: -100, y: -100, opacity: 0 }}
            animate={{ x: window.innerWidth + 100, y: window.innerHeight + 100, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-lg"
            style={{
              boxShadow: '0 0 20px #fbbf24, 0 0 40px #fbbf24',
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            🚀 Space Games Galaxy
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Explore the cosmos through interactive games and challenges
          </p>
          
          {/* Make a Wish Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={makeWish}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold mb-8 shadow-lg"
          >
            ⭐ Make a Wish on a Shooting Star
          </motion.button>
          
          {wishMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-8 max-w-md mx-auto"
            >
              <p className="text-white text-lg">{wishMessage}</p>
            </motion.div>
          )}
        </motion.div>

        {!selectedGame ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-br ${game.color} p-6 rounded-xl shadow-xl cursor-pointer`}
                onClick={() => setSelectedGame(game.id)}
              >
                <div className="text-white mb-4">
                  {game.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {game.title}
                </h3>
                <p className="text-white/80 mb-4">
                  {game.description}
                </p>
                <div className="flex items-center text-white font-semibold">
                  <Play className="w-5 h-5 mr-2" />
                  Play Now
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGame(null)}
              className="mb-8 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold backdrop-blur-md"
            >
              <Home className="w-5 h-5 inline mr-2" />
              Back to Games
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {renderGameContent()}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceGames;