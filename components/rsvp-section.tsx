"use client"
import type React from "react"
import { useState } from "react"
import { Check, Loader2, Sparkles, Heart } from "lucide-react"

export function RsvpSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    attendance: "yes",
    companion: "",
    drinks: [] as string[],
  })

  const drinks = [
    { id: "champagne", label: "Шампанское", emoji: "🍾" },
    { id: "white-wine", label: "Белое вино", emoji: "🥂" },
    { id: "red-wine", label: "Красное вино", emoji: "🍷" },
    { id: "whiskey", label: "Виски", emoji: "🥃" },
    { id: "vodka", label: "Водка", emoji: "🔥" },
    { id: "gin", label: "Джин", emoji: "🍸" },
    { id: "rum", label: "Ром", emoji: "🏴‍☠️" },
    { id: "no-alcohol", label: "Не пью алкоголь", emoji: "🍹" },
  ]

  const handleDrinkChange = (drinkId: string) => {
    setFormData((prev) => ({
      ...prev,
      drinks: prev.drinks.includes(drinkId) ? prev.drinks.filter((d) => d !== drinkId) : [...prev.drinks, drinkId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Красивая анимация загрузки
    await new Promise(resolve => setTimeout(resolve, 1800))
    
    // Сохраняем данные (можно будет потом собрать)
    const rsvpData = {
      ...formData,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString("ru-RU"),
    }
    
    // Сохраняем в массив всех ответов
    const allResponses = JSON.parse(localStorage.getItem('wedding_responses') || '[]')
    allResponses.push(rsvpData)
    localStorage.setItem('wedding_responses', JSON.stringify(allResponses))
    
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <section className="py-24 bg-gradient-to-b from-[#f9f7f4] to-[#f5f4f2]">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#5a7247] to-[#7a9560] flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Check className="text-white" size={40} />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white border-4 border-[#f5f4f2] flex items-center justify-center shadow-md">
              <Sparkles className="text-[#5a7247]" size={16} />
            </div>
          </div>
          
          <h2 className="text-3xl font-light tracking-[0.15em] uppercase text-[#3d3d3d] mb-6">
            Спасибо за ответ!
          </h2>
          
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/50 shadow-sm">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-[#e5e5e5] text-sm text-[#5a7247]">
              Ваш ответ
            </div>
            
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#f9f7f4] flex items-center justify-center border border-[#e5e5e5]">
                  <span className="text-xl">👤</span>
                </div>
                <div className="text-left">
                  <p className="text-xs text-[#6b6b6b]">Гость</p>
                  <p className="text-lg font-light text-[#3d3d3d]">{formData.name}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#f9f7f4] flex items-center justify-center border border-[#e5e5e5]">
                  <span className="text-xl">
                    {formData.attendance === "yes" ? "✅" : "❌"}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-xs text-[#6b6b6b]">Присутствие</p>
                  <p className="text-lg font-light text-[#3d3d3d]">
                    {formData.attendance === "yes" ? "Буду с удовольствием" : "К сожалению, не смогу"}
                  </p>
                </div>
              </div>
              
              {formData.companion && (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#f9f7f4] flex items-center justify-center border border-[#e5e5e5]">
                    <span className="text-xl">👥</span>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-[#6b6b6b]">Со спутником</p>
                    <p className="text-lg font-light text-[#3d3d3d]">{formData.companion}</p>
                  </div>
                </div>
              )}
              
              {formData.drinks.length > 0 && (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#f9f7f4] flex items-center justify-center border border-[#e5e5e5]">
                    <span className="text-xl">🍷</span>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-[#6b6b6b]">Напитки</p>
                    <p className="text-lg font-light text-[#3d3d3d]">
                      {formData.drinks.map(id => drinks.find(d => d.id === id)?.label).join(", ")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <p className="text-[#6b6b6b] italic mb-2">
            Мы с нетерпением ждём встречи с вами!
          </p>
          <div className="flex items-center justify-center gap-2 text-[#5a7247]">
            <Heart size={16} className="fill-current" />
            <span className="text-sm">С любовью, Алёна и Никита</span>
            <Heart size={16} className="fill-current" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#f9f7f4]">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#5a7247]"></div>
            <h2 className="text-xl md:text-3xl font-light tracking-[0.15em] uppercase text-[#3d3d3d]">
              Подтвердите присутствие
            </h2>
            <div className="w-2 h-2 rounded-full bg-[#5a7247]"></div>
          </div>
          
          <p className="text-[#6b6b6b] text-sm mb-2">
            Пожалуйста, подтвердите своё присутствие до:
          </p>
          <p className="text-2xl font-light tracking-[0.2em] text-[#3d3d3d] mb-10">
            06 · 02 · 2025
          </p>
          
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#5a7247] to-transparent mx-auto"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-[#f0f0f0]">
          {/* Name */}
          <div className="mb-8">
            <label className="block text-sm text-[#3d3d3d] mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#f9f7f4] border border-[#e5e5e5] flex items-center justify-center text-xs">1</span>
              Ваше имя
            </label>
            <input
              type="text"
              placeholder="Имя и Фамилия"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-4 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#a8b5a0] focus:ring-2 focus:ring-[#a8b5a0]/20 transition-all"
              required
            />
          </div>
          
          {/* Attendance */}
          <div className="mb-8">
            <label className="block text-sm text-[#3d3d3d] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#f9f7f4] border border-[#e5e5e5] flex items-center justify-center text-xs">2</span>
              Присутствие на свадьбе
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`
                relative p-5 rounded-xl border-2 cursor-pointer transition-all
                ${formData.attendance === "yes" 
                  ? 'border-[#5a7247] bg-[#f9faf8]' 
                  : 'border-[#e5e5e5] hover:border-[#d4d4d4]'}
              `}>
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={formData.attendance === "yes"}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="sr-only"
                  required
                />
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${formData.attendance === "yes" ? 'border-[#5a7247]' : 'border-[#d4d4d4]'}`}>
                    {formData.attendance === "yes" && (
                      <div className="w-3 h-3 rounded-full bg-[#5a7247]"></div>
                    )}
                  </div>
                  <div>
                    <div className="text-lg font-light text-[#3d3d3d]">Да, с удовольствием</div>
                    <div className="text-sm text-[#6b6b6b]">Буду рад(а) разделить этот день с вами</div>
                  </div>
                </div>
              </label>
              
              <label className={`
                relative p-5 rounded-xl border-2 cursor-pointer transition-all
                ${formData.attendance === "no" 
                  ? 'border-[#5a7247] bg-[#f9faf8]' 
                  : 'border-[#e5e5e5] hover:border-[#d4d4d4]'}
              `}>
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={formData.attendance === "no"}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="sr-only"
                />
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${formData.attendance === "no" ? 'border-[#5a7247]' : 'border-[#d4d4d4]'}`}>
                    {formData.attendance === "no" && (
                      <div className="w-3 h-3 rounded-full bg-[#5a7247]"></div>
                    )}
                  </div>
                  <div>
                    <div className="text-lg font-light text-[#3d3d3d]">Не смогу присутствовать</div>
                    <div className="text-sm text-[#6b6b6b]">Сожалею, но не смогу быть с вами</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
          
          {/* Companion */}
          <div className="mb-8">
            <label className="block text-sm text-[#3d3d3d] mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#f9f7f4] border border-[#e5e5e5] flex items-center justify-center text-xs">3</span>
              Будете ли вы не один?
            </label>
            <input
              type="text"
              placeholder="Имя и Фамилия вашего спутника (если планируете)"
              value={formData.companion}
              onChange={(e) => setFormData({ ...formData, companion: e.target.value })}
              className="w-full px-5 py-4 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#a8b5a0] focus:ring-2 focus:ring-[#a8b5a0]/20 transition-all"
            />
          </div>
          
          {/* Drinks */}
          <div className="mb-10">
            <label className="block text-sm text-[#3d3d3d] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#f9f7f4] border border-[#e5e5e5] flex items-center justify-center text-xs">4</span>
              Ваши предпочтения в напитках
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {drinks.map((drink) => (
                <label key={drink.id} className={`
                  relative p-4 rounded-xl border cursor-pointer transition-all
                  ${formData.drinks.includes(drink.id) 
                    ? 'border-[#5a7247] bg-[#f9faf8]' 
                    : 'border-[#e5e5e5] hover:border-[#d4d4d4]'}
                `}>
                  <input
                    type="checkbox"
                    checked={formData.drinks.includes(drink.id)}
                    onChange={() => handleDrinkChange(drink.id)}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{drink.emoji}</span>
                    <span className="text-xs text-center text-[#6b6b6b]">{drink.label}</span>
                    {formData.drinks.includes(drink.id) && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#5a7247] flex items-center justify-center">
                        <Check className="text-white" size={10} />
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-40 h-40 rounded-full border-2 border-[#d4d4d4] text-sm tracking-[0.1em] uppercase text-[#6b6b6b] hover:border-[#5a7247] hover:text-[#5a7247] transition-all duration-500 disabled:opacity-50 flex items-center justify-center overflow-hidden"
            >
              {/* Анимация кнопки */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={28} />
                    <span>Отправка...</span>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center">
                      <Heart size={20} className="fill-current" />
                    </div>
                    <span>Отправить ответ</span>
                  </>
                )}
              </div>
            </button>
          </div>
          
          {/* Декоративный элемент */}
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-4 text-xs text-[#6b6b6b]">
              <div className="w-16 h-px bg-[#e5e5e5]"></div>
              <span>Спасибо, что делитесь с нами этим днём</span>
              <div className="w-16 h-px bg-[#e5e5e5]"></div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
