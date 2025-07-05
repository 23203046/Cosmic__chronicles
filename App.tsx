import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import SolarSystem from './components/SolarSystem';
import EventsCalendar from './components/EventsCalendar';
import SpaceTimeline from './components/SpaceTimeline';
import SpaceMuseum from './components/SpaceMuseum';
import StarMap from './components/StarMap';
import SpaceGames from './components/SpaceGames';
import VideoGallery from './components/VideoGallery';
import AvatarGuide from './components/AvatarGuide';
import QuoteOfTheDay from './components/QuoteOfTheDay';
import PhotoGallery from './components/PhotoGallery';
import WhatIfSimulator from './components/WhatIfSimulator';
import BirthdayInSpace from './components/BirthdayInSpace';
import AstroCalculator from './components/AstroCalculator';
import WomenInSpace from './components/WomenInSpace';
import Chatbot from './components/Chatbot';
import VoiceAssistant from './components/VoiceAssistant';
import { useVoiceAssistant } from './hooks/useVoiceAssistant';

type ViewType = 'events' | 'solar-system' | 'timeline' | 'museum' | 'starmap' | 'games' | 'videos' | 'avatar' | 'gallery' | 'whatif' | 'birthday' | 'calculator' | 'women';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('events'); // Default to events
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const voiceAssistant = useVoiceAssistant();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Stars */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <Header currentView={currentView} onViewChange={setCurrentView} />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'events' && (
            <EventsCalendar key="events" voiceAssistant={voiceAssistant} />
          )}
          {currentView === 'solar-system' && (
            <SolarSystem 
              key="solar-system"
              onPlanetClick={setSelectedPlanet}
              selectedPlanet={selectedPlanet}
              voiceAssistant={voiceAssistant}
            />
          )}
          {currentView === 'timeline' && (
            <SpaceTimeline key="timeline" />
          )}
          {currentView === 'museum' && (
            <SpaceMuseum key="museum" voiceAssistant={voiceAssistant} />
          )}
          {currentView === 'starmap' && (
            <StarMap key="starmap" />
          )}
          {currentView === 'games' && (
            <SpaceGames key="games" />
          )}
          {currentView === 'videos' && (
            <VideoGallery key="videos" />
          )}
          {currentView === 'avatar' && (
            <AvatarGuide key="avatar" />
          )}
          {currentView === 'gallery' && (
            <PhotoGallery key="gallery" />
          )}
          {currentView === 'whatif' && (
            <WhatIfSimulator key="whatif" />
          )}
          {currentView === 'birthday' && (
            <BirthdayInSpace key="birthday" voiceAssistant={voiceAssistant} />
          )}
          {currentView === 'calculator' && (
            <AstroCalculator key="calculator" />
          )}
          {currentView === 'women' && (
            <WomenInSpace key="women" voiceAssistant={voiceAssistant} />
          )}
        </AnimatePresence>
      </main>

      <QuoteOfTheDay />
      <Chatbot voiceAssistant={voiceAssistant} />
      <VoiceAssistant {...voiceAssistant} />
    </div>
  );
}

export default App;