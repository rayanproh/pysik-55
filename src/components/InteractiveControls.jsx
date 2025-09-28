import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, RotateCcw, Plus, Minus, Zap, Orbit, GitCommitHorizontal } from 'lucide-react'

export default function InteractiveControls({ 
  onMassChange, 
  onTimeSpeedChange, 
  onAddPlanet, 
  onRemovePlanet, 
  onResetScene,
  massStrength = 2.0,
  timeSpeed = 1.0,
  planetCount = 2,
  isPlaying = true,
  onPlayPause,
  onStartFallingDemo,
  visualizationType,
  onVisualizationChange
}) {
  const [localMass, setLocalMass] = useState(massStrength)
  const [localTimeSpeed, setLocalTimeSpeed] = useState(timeSpeed)

  const handleMassChange = (value) => {
    setLocalMass(value[0])
    onMassChange(value[0])
  }

  const handleTimeSpeedChange = (value) => {
    setLocalTimeSpeed(value[0])
    onTimeSpeedChange(value[0])
  }

  return (
    <div className="space-y-4">
      {/* Visualization Type Control */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-foreground text-lg flex items-center gap-2">
            نوع التصور / Visualization Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            onClick={() => onVisualizationChange('planet')}
            variant={visualizationType === 'planet' ? 'default' : 'outline'}
            size="sm"
            className="w-full justify-start"
          >
            <Orbit className="w-4 h-4 mr-2" />
            النظام الكوكبي / Planet System
          </Button>
          <Button
            onClick={() => onVisualizationChange('blackhole')}
            variant={visualizationType === 'blackhole' ? 'default' : 'outline'}
            size="sm"
            className="w-full justify-start"
          >
            <GitCommitHorizontal className="w-4 h-4 mr-2" />
            الثقب الأسود / Black Hole
          </Button>
        </CardContent>
      </Card>

      {/* Mass Control */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-foreground text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            قوة الكتلة / Mass Strength
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>ضعيف / Weak</span>
              <Badge variant="outline" className="text-primary border-yellow-400">
                {localMass.toFixed(1)}
              </Badge>
              <span>قوي / Strong</span>
            </div>
            <Slider
              value={[localMass]}
              onValueChange={handleMassChange}
              max={visualizationType === 'blackhole' ? 12.0 : 5.0}
              min={0.5}
              step={0.1}
              className="w-full"
            />
          </div>
          <p className="text-xs text-slate-400">
            اسحب لتغيير قوة الجاذبية ومشاهدة تأثيرها على انحناء الزمكان
          </p>
        </CardContent>
      </Card>

      {/* Time Control */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-foreground text-lg flex items-center gap-2">
            {isPlaying ? <Pause className="w-5 h-5 text-green-400" /> : <Play className="w-5 h-5 text-blue-400" />}
            سرعة الزمن / Time Speed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={onPlayPause}
              variant={isPlaying ? "destructive" : "default"}
              size="sm"
              className="flex-1"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  إيقاف / Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  تشغيل / Play
                </>
              )}
            </Button>
            <Button
              onClick={onResetScene}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              إعادة تعيين / Reset
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>بطيء / Slow</span>
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                {localTimeSpeed.toFixed(1)}x
              </Badge>
              <span>سريع / Fast</span>
            </div>
            <Slider
              value={[localTimeSpeed]}
              onValueChange={handleTimeSpeedChange}
              max={3.0}
              min={0.1}
              step={0.1}
              className="w-full"
              disabled={!isPlaying}
            />
          </div>
        </CardContent>
      </Card>

      {/* Planet Control (only show if not in blackhole mode) */}
      {visualizationType === 'planet' && (
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-lg">
              الكواكب / Planets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">عدد الكواكب / Planet Count:</span>
              <Badge variant="outline" className="text-purple-400 border-purple-400">
                {planetCount}
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={onAddPlanet}
                variant="outline"
                size="sm"
                className="flex-1"
                disabled={planetCount >= 5}
              >
                <Plus className="w-4 h-4 mr-2" />
                إضافة / Add
              </Button>
              <Button
                onClick={onRemovePlanet}
                variant="outline"
                size="sm"
                className="flex-1"
                disabled={planetCount <= 1}
              >
                <Minus className="w-4 h-4 mr-2" />
                إزالة / Remove
              </Button>
            </div>
            
            <p className="text-xs text-slate-400">
              أضف أو أزل كواكب لمشاهدة تأثيرها على المدارات
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-foreground text-lg">
            إعدادات سريعة / Quick Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            onClick={() => {
              onVisualizationChange('planet')
              handleMassChange([1.0])
              handleTimeSpeedChange([1.0])
            }}
            variant="outline"
            size="sm"
            className="w-full"
          >
            الأرض العادية / Normal Earth
          </Button>
          <Button
            onClick={() => {
              onVisualizationChange('planet')
              handleMassChange([4.0])
              handleTimeSpeedChange([0.5])
            }}
            variant="outline"
            size="sm"
            className="w-full"
          >
            نجم عملاق / Giant Star
          </Button>
          <Button
            onClick={() => {
              onVisualizationChange('blackhole')
              handleMassChange([8.0])
              handleTimeSpeedChange([1.0])
            }}
            variant="outline"
            size="sm"
            className="w-full"
          >
            ثقب أسود / Black Hole
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
