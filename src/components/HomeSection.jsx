import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Rocket, 
  Brain, 
  Atom, 
  Lightbulb, 
  Play, 
  BookOpen,
  Star,
  Globe,
  Zap
} from 'lucide-react'

export default function HomeSection({ onSectionChange }) {
  const { t, i18n } = useTranslation();

  const features = [
    {
      icon: Atom,
      title: t('home.features.0.title'),
      description: t('home.features.0.description'),
      action: t('home.features.0.action'),
      section: 'simulation'
    },
    {
      icon: Lightbulb,
      title: t('home.features.1.title'),
      description: t('home.features.1.description'),
      action: t('home.features.1.action'),
      section: 'explanation'
    },
    {
      icon: Star,
      title: t('home.features.2.title'),
      description: t('home.features.2.description'),
      action: t('home.features.2.action'),
      section: 'facts'
    }
  ]

  const quickStartSteps = t('home.quickStart.steps', { returnObjects: true });
  const aboutEinsteinFacts = t('home.aboutEinstein.facts', { returnObjects: true });

  return (
    <div className={`max-w-6xl mx-auto p-6 space-y-8 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl text-blue-200 mb-6">
              {t('home.hero.subtitle')}
            </p>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              {t('home.hero.description')}
            </p>
          </div>
        </div>

        {/* Einstein Image Placeholder */}
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
            <Brain className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          
          return (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
                <Button 
                  onClick={() => onSectionChange(feature.section)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {feature.action}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Start Guide */}
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Rocket className="w-6 h-6 text-green-400" />
            {t('home.quickStart.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.isArray(quickStartSteps) && quickStartSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <Badge variant="outline" className="text-green-400 border-green-400 shrink-0">
                  {index + 1}
                </Badge>
                <span className="text-slate-200 text-sm">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* About Einstein */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Brain className="w-6 h-6 text-yellow-400" />
              {t('home.aboutEinstein.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-200 leading-relaxed">
              {t('home.aboutEinstein.description')}
            </p>
            <div className="space-y-2">
              {Array.isArray(aboutEinsteinFacts) && aboutEinsteinFacts.map((fact, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span className="text-yellow-200 text-sm">{fact}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Preview */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-400" />
              {t('home.interactivePreview.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 bg-gradient-to-b from-indigo-900 to-purple-900 rounded-lg overflow-hidden">
              {/* Simple spacetime grid visualization */}
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {Array.from({ length: 21 }, (_, i) => (
                    <g key={i}>
                      <line x1={i * 10} y1="0" x2={i * 10} y2="200" stroke="#4fc3f7" strokeWidth="0.5" />
                      <line x1="0" y1={i * 10} x2="200" y2={i * 10} stroke="#4fc3f7" strokeWidth="0.5" />
                    </g>
                  ))}
                </svg>
              </div>
              
              {/* Central mass */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
              </div>
              
              {/* Orbiting object */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 border border-blue-400 rounded-full animate-spin" style={{animationDuration: '4s'}}>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white text-sm">
                  {t('home.interactivePreview.subtitle')}
                </p>
              </div>
            </div>
            
            <Button 
              onClick={() => onSectionChange('simulation')}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            >
              <Atom className="w-4 h-4 mr-2" />
              {t('home.interactivePreview.action')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

