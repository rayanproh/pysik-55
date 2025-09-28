
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FallingSimulation from './FallingSimulation'
import VideoExplanation from './VideoExplanation'
import { 
  BookOpen, 
  Video, 
  Atom, 
  Telescope, 
  Timer, 
  Zap, 
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Earth,
  Star
} from 'lucide-react'

export default function ExplanationSection() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("basics")
  const [currentConcept, setCurrentConcept] = useState(0)

  const concepts = [
    {
      title: "مقدمة في النسبية العامة",
      icon: <BookOpen className="h-6 w-6" />,
      content: "نظرية النسبية العامة هي نظرية فيزيائية نشرها ألبرت أينشتاين عام 1915. تشرح هذه النظرية الجاذبية ليس كقوة، بل كنتيجة لانحناء الزمكان (المزيج بين المكان والزمن) بسبب الكتلة والطاقة.",
      keyPoints: [
        "الجاذبية ليست قوة بل انحناء في الزمكان",
        "كلما زادت كتلة الجسم، زاد انحناء الزمكان حوله",
        "الأجسام تتحرك على خطوط مستقيمة في الزمكان المنحني"
      ]
    },
    {
      title: "الزمكان",
      icon: <Timer className="h-6 w-6" />,
      content: "الزمكان هو المفهوم الذي يدمج بين الأبعاد المكانية الثلاثة والبعد الزمني في كون رباعي الأبعاد. تخيل شبكة مطاطية، عندما تضع كرة ثقيلة عليها، تنحني الشبكة. هذا يشبه كيف تنحني المادة والطاقة الزمكان.",
      keyPoints: [
        "الزمكان هو نسيج رباعي الأبعاد للكون",
        "الكتلة والطاقة تشوه نسيج الزمكان",
        "الأجسام تتبع المسارات الأقصر في الزمكان المنحني"
      ]
    },
    {
      title: "انحناء الضوء",
      icon: <Zap className="h-6 w-6" />,
      content: "تنبأت نظرية النسبية العامة بأن الضوء ينحني عند مروره بالقرب من الأجسام الضخمة. تم تأكيد هذا التنبؤ خلال كسوف الشمس عام 1919 عندما لوحظ انحناء ضوء النجوم البعيدة عند مروره بالقرب من الشمس.",
      keyPoints: [
        "الضوء يتبع انحناء الزمكان",
        "تم رصد انحناء الضوء لأول مرة عام 1919",
        "هذه الظاهرة تسمى عدسة الجاذبية"
      ]
    },
    {
      title: "الثقوب السوداء",
      icon: <Star className="h-6 w-6" />,
      content: "الثقوب السوداء هي مناطق في الفضاء حيث تكون الجاذبية قوية جداً لدرجة أن لا شيء يمكنه الهروب منها، حتى الضوء. تنشأ عندما تنهار النجوم الضخمة تحت تأثير جاذبيتها نفسها.",
      keyPoints: [
        "الثقوب السوداء هي أماكن تنحني فيها الزمكان بشدة",
        "أفق الحدث هو النقطة التي لا يمكن للضوء الهروب بعدها",
        "التقطت أول صورة لثقب أسود عام 2019"
      ]
    },
    {
      title: "تمدد الزمن",
      icon: <Timer className="h-6 w-6" />,
      content: "تنبأت النسبية العامة بأن الزمن يمر ببطء أكبر في حقول الجاذبية القوية. هذا يعني أن الساعة على سطح الأرض تدق أبطأ قليلاً من الساعة في الفضاء. هذا التأثير صغير ولكنه حقيقي ومهم لأنظمة مثل GPS.",
      keyPoints: [
        "الزمن يبطئ في حقول الجاذبية القوية",
        "هذا التأثير ضروري لعمل أنظمة الملاحة GPS",
        "الفرق في الزمن صغير ولكنه قابل للقياس"
      ]
    },
    {
      title: "الأدلة التجريبية",
      icon: <Telescope className="h-6 w-6" />,
      content: "تم تأكيد نظرية النسبية العامة عبر العديد من التجارب والملاحظات. من أهمها: انحناء ضوء النجوم أثناء كسوف الشمس عام 1919، ودوران مدار عطارد، واكتشاف موجات الجاذبية عام 2015.",
      keyPoints: [
        "كسوف الشمس عام 1919 قدم أول دليل قوي",
        "موجات الجاذبية اكتشفت عام 2015",
        "نظام GPS يعتمد على تصحيحات النسبية العامة"
      ]
    }
  ]

  const nextConcept = () => {
    setCurrentConcept((prev) => (prev + 1) % concepts.length)
  }

  const prevConcept = () => {
    setCurrentConcept((prev) => (prev - 1 + concepts.length) % concepts.length)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">{t('explanation')}</h1>
        <p className="text-blue-200 max-w-3xl mx-auto text-lg">
          اكتشف نظرية النسبية العامة لأينشتاين بطريقة تفاعلية وسهلة الفهم
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="basics" className="text-sm">المفاهيم الأساسية</TabsTrigger>
          <TabsTrigger value="simulation" className="text-sm">المحاكاة التفاعلية</TabsTrigger>
          <TabsTrigger value="video" className="text-sm">الفيديو التعليمي</TabsTrigger>
          <TabsTrigger value="applications" className="text-sm">التطبيقات العملية</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-8">
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                {concepts[currentConcept].icon}
                {concepts[currentConcept].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-blue-100">
                {concepts[currentConcept].content}
              </p>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  النقاط الرئيسية:
                </h3>
                <ul className="space-y-2">
                  {concepts[currentConcept].keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-blue-100">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button onClick={prevConcept} variant="outline" className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />
                  السابق
                </Button>

                <div className="flex gap-1">
                  {concepts.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentConcept(idx)}
                      className={`w-2 h-2 rounded-full ${currentConcept === idx ? 'bg-blue-500' : 'bg-slate-600'}`}
                    />
                  ))}
                </div>

                <Button onClick={nextConcept} variant="outline" className="flex items-center gap-2">
                  التالي
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {concepts.slice(0, 3).map((concept, index) => (
              <Card key={index} className="bg-slate-800/70 border-slate-700 hover:bg-slate-800/90 transition-all cursor-pointer"
                    onClick={() => {
                      setActiveTab("basics")
                      setCurrentConcept(index)
                    }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white text-lg">
                    {concept.icon}
                    {concept.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 line-clamp-3">
                    {concept.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="simulation">
          <FallingSimulation />
        </TabsContent>

        <TabsContent value="video">
          <VideoExplanation />
        </TabsContent>

        <TabsContent value="applications" className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/70 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-xl">
                  <Earth className="h-6 w-6 text-blue-400" />
                  نظام تحديد المواقع (GPS)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-100">
                  نظام GPS هو أحد أهم التطبيقات العملية للنسبية العامة. بدون تصحيحات النسبية، 
                  سيكون النظام غير دقيق بمقدار حوالي 10 كيلومترات يومياً.
                </p>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-bold text-blue-300 mb-2">كيف يعمل؟</h4>
                  <ul className="space-y-2 text-blue-100">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>الأقمار الصناعية تدور حول الأرض بسرعة عالية</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>الساعات على الأقمار الصناعية تدق أسرع من ساعات الأرض</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>يجب تصحيح الوقت باستخدام معادلات النسبية</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/70 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-xl">
                  <Telescope className="h-6 w-6 text-purple-400" />
                  علم الفلك الحديث
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-100">
                  غيرت النسبية العامة فهمنا للكون تماماً، من الثقوب السوداء إلى توسع الكون، 
                  ومكنتنا من اكتشاف ظواهر لم نكن نعرف بوجودها من قبل.
                </p>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-bold text-blue-300 mb-2">الاكتشافات المهمة:</h4>
                  <ul className="space-y-2 text-blue-100">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>موجات الجاذبية (2015)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>صورة الثقب الأسود (2019)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>توسع الكون المتسارع</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/70 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-xl">
                  <Atom className="h-6 w-6 text-green-400" />
                  الطاقة النووية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-100">
                  معادلة أينشتاين الشهيرة E=mc² هي أساس فهم الطاقة النووية، حيث توضح 
                  أن الكتلة يمكن تحويلها إلى طاقة والعكس.
                </p>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-bold text-blue-300 mb-2">التطبيقات:</h4>
                  <ul className="space-y-2 text-blue-100">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>محطات الطاقة النووية</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>الأسلحة النووية</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>الطب النووي</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/70 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-xl">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  المستقبل والتكنولوجيا
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-100">
                  لا تزال النسبية العامة تلهم الابتكارات التكنولوجية الحديثة، من دقة الساعات 
                  الذرية إلى محركات الدفع النووي المستقبلية.
                </p>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-bold text-blue-300 mb-2">تطبيقات مستقبلية:</h4>
                  <ul className="space-y-2 text-blue-100">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>سفر الفضاء بعيد المدى</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>الاتصالات الكمومية</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>محطات الطاقة الاندماجية</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
