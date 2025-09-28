
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Canvas, useFrame } from '@react-three/fiber';
import { Circle, Line } from '@react-three/drei';

const environments = [
  { name: 'earth', g: 9.8 },
  { name: 'moon', g: 1.6 },
  { name: 'mars', g: 3.7 },
  { name: 'space', g: 0 },
];

const FallingObject = ({ isAnimating, fallTime, height, slowMotion, gravity }) => {
  const ref = useRef();
  const startTime = useRef(0);

  useFrame(({ clock }) => {
    if (isAnimating) {
      if (startTime.current === 0) {
        startTime.current = clock.getElapsedTime();
      }
      const elapsedTime = clock.getElapsedTime() - startTime.current;
      const duration = slowMotion ? fallTime * 2 : fallTime;
      
      let currentPos;
      if (gravity > 0) {
        const t = Math.min(elapsedTime, duration);
        currentPos = height - 0.5 * gravity * Math.pow(t, 2);
      } else {
        currentPos = height; // No gravity, so it should not fall
      }

      // Clamp position to ground
      currentPos = Math.max(currentPos, 0);
      
      // mapping physics coordinates to screen coordinates
      ref.current.position.y = (currentPos / height) * 9 - 4.5;

    } else {
      startTime.current = 0;
      ref.current.position.y = 4.5;
    }
  });

  return (
    <Circle ref={ref} args={[0.5, 32]} position={[0, 4.5, 0]}>
      <meshStandardMaterial color="orange" />
    </Circle>
  );
};

const SimulationCanvas = ({ isAnimating, fallTime, height, slowMotion, gravity }) => {
  return (
    <div className="relative w-full h-[500px]">
      <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <FallingObject 
          isAnimating={isAnimating} 
          fallTime={fallTime} 
          height={height} 
          slowMotion={slowMotion}
          gravity={gravity} 
        />
        <Line points={[[0, -5, 0], [0, 5, 0]]} color="white" dashed dashSize={0.2} gapSize={0.2} />
        <Line points={[[-5, -5, 0], [5, -5, 0]]} color="white" />
      </Canvas>
    </div>
  );
};

export default function ImprovedFallingSimulation() {
  const { t } = useTranslation();
  const [mass, setMass] = useState(10);
  const [height, setHeight] = useState(50);
  const [gravity, setGravity] = useState(environments[0].g);
  const [fallTime, setFallTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slowMotion, setSlowMotion] = useState(false);
  const [showPhysics, setShowPhysics] = useState(true);

  useEffect(() => {
    if (gravity > 0) {
      setFallTime(Math.sqrt(2 * height / gravity));
    } else {
      setFallTime(Infinity);
    }
  }, [height, gravity]);

  const handleDrop = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsAnimating(true);
    }, 100);
  };

  const handleReset = () => {
    setIsAnimating(false);
  };

  const handleEnvChange = (value) => {
    const env = environments.find(e => e.name === value);
    if (env) {
      setGravity(env.g);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{t('falling_sim.title')}</h2>
        <p className="text-blue-200 max-w-3xl mx-auto">{t('falling_sim.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
          <p className="text-white mb-4">{t('falling_sim.central_desc')}</p>
          <SimulationCanvas 
            isAnimating={isAnimating} 
            fallTime={fallTime} 
            height={height} 
            slowMotion={slowMotion}
            gravity={gravity}
          />
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader><CardTitle className="text-white">{t('falling_sim.controls_title')}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">{t('falling_sim.mass_slider')} ({mass.toFixed(0)} kg)</Label>
                <Slider value={[mass]} onValueChange={([val]) => setMass(val)} min={1} max={100} step={1} />
              </div>
              <div>
                <Label className="text-white">{t('falling_sim.height_slider')} ({height.toFixed(0)} m)</Label>
                <Slider value={[height]} onValueChange={([val]) => setHeight(val)} min={10} max={200} step={1} />
              </div>
              <div>
                <Label className="text-white">{t('falling_sim.gravity_slider')} ({gravity.toFixed(1)} N/kg)</Label>
                <Slider value={[gravity]} onValueChange={([val]) => setGravity(val)} min={0} max={20} step={0.1} />
              </div>
              <Select onValueChange={handleEnvChange} defaultValue="earth">
                <SelectTrigger><SelectValue placeholder={t('falling_sim.env_placeholder')} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="earth">{t('falling_sim.env_earth')}</SelectItem>
                  <SelectItem value="moon">{t('falling_sim.env_moon')}</SelectItem>
                  <SelectItem value="mars">{t('falling_sim.env_mars')}</SelectItem>
                  <SelectItem value="space">{t('falling_sim.env_space')}</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <Button onClick={handleDrop} className="w-full">Drop</Button>
                <Button onClick={handleReset} className="w-full" variant="outline">Reset</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="slow-motion-switch" checked={slowMotion} onCheckedChange={setSlowMotion} />
              <Label htmlFor="slow-motion-switch" className="text-white">{t('slow_motion')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="show-physics-switch" checked={showPhysics} onCheckedChange={setShowPhysics} />
              <Label htmlFor="show-physics-switch" className="text-white">{t('show_physics')}</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">{t('falling_sim.usage_title')}</h3>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>{t('falling_sim.usage_step1')}</li>
            <li>{t('falling_sim.usage_step2')}</li>
            <li>{t('falling_sim.usage_step3')}</li>
            <li>{t('falling_sim.usage_step4')}</li>
          </ol>
        </div>
        {showPhysics && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-bold text-white mb-4">{t('falling_sim.concepts_title')}</h3>
            <ul className="text-gray-300 space-y-2">
              <li>**{t('falling_sim.concept1_title')}:** {t('falling_sim.concept1_desc')}</li>
              <li>**{t('falling_sim.concept2_title')}:** {t('falling_sim.concept2_desc')}</li>
              <li>**{t('falling_sim.concept3_title')}:** {t('falling_sim.concept3_desc')} (F=mg)</li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
