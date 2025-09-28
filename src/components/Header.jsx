import React from 'react'
import { useTranslation } from "react-i18next";
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Globe, BookOpen, Atom, Lightbulb, MessageCircle, PlayCircle } from 'lucide-react'
import { ModeToggle } from "./mode-toggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

const Header = ({ currentSection, onSectionChange }) => {
  const { t, i18n } = useTranslation();
  const sections = [
    { id: 'home', name: t('home'), icon: Globe },
    { id: 'explanation', name: t('explanation'), icon: BookOpen },
    { id: 'simulation', name: t('simulation'), icon: Atom },
    { id: 'facts', name: t('facts'), icon: Lightbulb },
    { id: 'tutor', name: t('tutor_nav'), icon: MessageCircle },
    { id: 'video', name: t('video_explanation'), icon: PlayCircle },
    { id: 'presentation', name: t('presentation'), icon: BookOpen }
  ]

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Atom className="w-6 h-6 text-white" />
            </div>
            <div className={`${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-2xl font-bold">{t('main_title')}</h1>
              <p className="text-sm text-purple-200">{t('subtitle')}</p>
            </div>
          </div>
          
          <div className='flex items-center gap-x-2'>
            <ModeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-2 justify-center">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = currentSection === section.id
            
            return (
              <Button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                variant={isActive ? "default" : "ghost"}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-white text-purple-900 shadow-lg transform scale-105' 
                    : 'text-white hover:bg-white/10 hover:scale-105'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {section.name}
                {isActive && (
                  <Badge variant="secondary" className="ml-1 bg-purple-100 text-purple-900">
                    •
                  </Badge>
                )}
              </Button>
            )
          })}
        </nav>
      </div>
      
      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
    </header>
  )
}

export default Header
