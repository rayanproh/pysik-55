import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import HomeSection from './components/HomeSection'
import SpacetimeVisualization from './components/SpacetimeGrid'
import InteractiveControls from './components/InteractiveControls'
import ExplanationSection from './components/ExplanationSection'
import FactsSection from './components/FactsSection'
import WelcomePopup from './components/WelcomePopup'
import TutorSection from './components/TutorSection'
import VideoExplanation from './components/VideoExplanation'
import Presentation from './components/Presentation'
import { useTranslation } from 'react-i18next'

function App() {
  const { t, i18n } = useTranslation();
  const [currentSection, setCurrentSection] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('section') || 'home';
  });
  const [massStrength, setMassStrength] = useState(2.0)
  const [timeSpeed, setTimeSpeed] = useState(1.0)
  const [planetCount, setPlanetCount] = useState(2)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showFallingDemo, setShowFallingDemo] = useState(false)
  const [visualizationType, setVisualizationType] = useState('planet') // 'planet' or 'blackhole'
  

  useEffect(() => {
    const url = new URL(window.location);
    if (currentSection && currentSection !== 'home') {
      url.searchParams.set('section', currentSection);
    } else {
      url.searchParams.delete('section');
    }
    window.history.pushState({}, '', url);
  }, [currentSection]);

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleSectionChange = (section) => {
    console.log('Changing section to:', section);
    setCurrentSection(section)
  }

  const handleMassChange = (value) => {
    setMassStrength(value)
  }

  const handleTimeSpeedChange = (value) => {
    setTimeSpeed(value)
  }

  const handleAddPlanet = () => {
    if (planetCount < 5) {
      setPlanetCount(planetCount + 1)
    }
  }

  const handleRemovePlanet = () => {
    if (planetCount > 1) {
      setPlanetCount(planetCount - 1)
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleResetScene = () => {
    setMassStrength(2.0)
    setTimeSpeed(1.0)
    setPlanetCount(2)
    setIsPlaying(true)
    setVisualizationType('planet')
  }

  const handleVisualizationChange = (type) => {
    setVisualizationType(type)
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <HomeSection 
            onSectionChange={handleSectionChange}
          />
        )
      
      case 'simulation':
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {t('simulation_title')}
              </h2>
              <p className="text-blue-200">
                {t('simulation_subtitle')}
              </p>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <SpacetimeVisualization
                  showFallingDemo={showFallingDemo}
                  onFallingDemoComplete={() => setShowFallingDemo(false)}
                  massStrength={massStrength}
                  showOrbits={true}
                  timeSpeed={timeSpeed}
                  planetCount={planetCount}
                  isPlaying={isPlaying}
                  visualizationType={visualizationType}
                />
              </div>
              
              <div className="lg:col-span-1">
                <InteractiveControls
                  onMassChange={handleMassChange}
                  onTimeSpeedChange={handleTimeSpeedChange}
                  onAddPlanet={handleAddPlanet}
                  onRemovePlanet={handleRemovePlanet}
                  onResetScene={handleResetScene}
                  onPlayPause={handlePlayPause}
                  onStartFallingDemo={() => {
                    setShowFallingDemo(true)
                    playSound('falling-object.mp3')
                  }}
                  massStrength={massStrength}
                  timeSpeed={timeSpeed}
                  planetCount={planetCount}
                  isPlaying={isPlaying}
                  visualizationType={visualizationType}
                  onVisualizationChange={handleVisualizationChange}
                />
              </div>
            </div>
          </div>
        )
      
      case 'explanation':
        return <ExplanationSection />
      
      case 'facts':
        return <FactsSection />

      case 'tutor':
        return <TutorSection />
      
      case 'video':
        return <VideoExplanation />
      
      case 'presentation':
        return <Presentation />

      default:
        return (
          <HomeSection 
            onSectionChange={handleSectionChange}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark">
      <Header
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />
      
      <main className="pb-8">
        {renderCurrentSection()}
      </main>

      <WelcomePopup />
      
      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-700 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            {t('footer_text')}
          </p>
          <p className="text-slate-500 text-xs mt-2">
            {t('footer_copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App