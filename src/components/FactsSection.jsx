import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Lightbulb, 
  Clock, 
  Satellite, 
  Zap, 
  Globe, 
  Star, 
  Rocket,
  Brain,
  Award,
  MapPin,
  Camera,
  Telescope
} from 'lucide-react'

const factIcons = {
  gps: Satellite,
  time: Clock,
  einstein: Brain,
  blackhole: Star,
  waves: Zap,
  universe: Globe,
  eclipse: Camera,
  lensing: Telescope
}

export default function FactsSection() {
  const { t, i18n } = useTranslation();
  const [selectedFact, setSelectedFact] = useState(0)

  const facts = t('facts.facts', { returnObjects: true });
  const applications = t('facts.applications.items', { returnObjects: true });
  const selectedFactData = Array.isArray(facts) ? facts[selectedFact] : {};
  const Icon = factIcons[selectedFactData.id] || Lightbulb;

  return (
    <div className={`max-w-6xl mx-auto p-6 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
          <Lightbulb className="w-8 h-8 text-primary" />
          {t('facts.title')}
        </h2>
        <p className="text-muted-foreground">{t('facts.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Facts List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            {t('facts.list_title')}
          </h3>
          
          {Array.isArray(facts) && facts.map((fact, index) => {
            const FactIcon = factIcons[fact.id] || Lightbulb;
            const isSelected = selectedFact === index
            
            return (
              <Card
                key={fact.id}
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'bg-primary/10 border-primary shadow-lg transform scale-105' 
                    : 'bg-card/50 border-border hover:bg-primary/5'
                }`}
                onClick={() => setSelectedFact(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${fact.color} rounded-full flex items-center justify-center`}>
                      <FactIcon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium text-sm">{fact.title}</h4>
                      {isSelected && (
                        <Badge variant="outline" className="mt-1 text-primary border-primary">
                          {t('facts.selected')}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Selected Fact Detail */}
        <div className="lg:col-span-2">
          <Card className="bg-card/50 border-border h-full">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-3">
                <div className={`w-12 h-12 ${selectedFactData.color} rounded-full flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                {selectedFactData.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {selectedFactData.description}
              </p>
              
              <div className="bg-gradient-to-r from-primary/10 to-orange-900/30 rounded-lg p-4 border border-primary/50">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-primary font-semibold">
                    {t('facts.did_you_know')}
                  </span>
                </div>
                <p className="text-primary">{selectedFactData.detail}</p>
              </div>

              {/* Interactive Element */}
              {selectedFactData.id === 'gps' && (
                <div className="bg-background/30 rounded-lg p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-muted-foreground">
                      {t('facts.gps_accuracy_without')}
                    </span>
                    <Badge variant="destructive">{t('facts.gps_error')}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {t('facts.gps_accuracy_with')}
                    </span>
                    <Badge variant="default" className="bg-primary">{t('facts.gps_accurate')}</Badge>
                  </div>
                </div>
              )}

              {selectedFactData.id === 'time' && (
                <div className="bg-background/30 rounded-lg p-4 border border-border/50">
                  <div className="text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-primary animate-pulse" />
                    <p className="text-primary text-sm">
                      {t('facts.time_difference')}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Applications Section */}
      <Card className="mt-8 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-3">
            <Rocket className="w-6 h-6 text-indigo-400" />
            {t('facts.applications.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.isArray(applications) && applications.map((app, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 text-center">
                <MapPin className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
                <h4 className="text-foreground font-medium mb-1">{app.name}</h4>
                <p className="text-slate-300 text-sm">{app.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

