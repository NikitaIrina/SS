"use client"

import type React from "react"
import { useState } from "react"
import { Check, Loader2 } from "lucide-react"

export function RsvpSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attendance: "",
    companion: "",
    guests: "1",
    wishes: "",
    drinks: [] as string[],
  })

  const drinks = [
    { id: "champagne", label: "Шампанское" },
    { id: "white-wine", label: "Белое вино" },
    { id: "red-wine", label: "Красное вино" },
    { id: "whiskey", label: "Виски" },
    { id: "vodka", label: "Водка" },
    { id: "gin", label: "Джин" },
    { id: "rum", label: "Ром" },
    { id: "no-alcohol", label: "Не пью алкоголь" },
  ]

  const handleDrinkChange = (drinkId: string) => {
    setFormData((prev) => ({
      ...prev,
      drinks: prev.drinks.includes(drinkId) 
        ? prev.drinks.filter((d) => d !== drinkId) 
        : [...prev.drinks, drinkId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Отправляем данные в Telegram
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone || 'Не указано',
          guests: formData.guests || '1',
          companion: formData.companion || 'Нет',
          attendance: formData.attendance === "yes" ? "Да, приду" : "Нет, не смогу",
          drinks: formData.drinks.join(', ') || 'Не указано',
          wishes: formData.wishes || 'Нет пожеланий'
        }),
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        setSubmitStatus('success')
        // Очищаем форму
        setFormData({
          name: "",
          phone: "",
          attendance: "",
          companion: "",
          guests: "1",
          wishes: "",
          drinks: [],
        })
      } else {
        setSubmitStatus('error')
        console.error('Telegram API error:', result.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Network error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <section className="py-20 bg-[#f5f4f2]" id="rsvp">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#5a7247] flex items-center justify-center mx-auto mb-6">
            <Check className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-light tracking-[0.1em] uppercase text-[#3d3d3d] mb-4">
            Спасибо!
          </h2>
          <p className="text-[#6b6b6b] mb-4">
            Мы получили ваш ответ.
          </p>
          <p className="text-[#6b6b6b]">
            До встречи на свадьбе!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-[#f5f4f2]" id="rsvp">
      <div className="max-w-xl mx-auto px-6">
        <h2 className="text-xl md:text-3xl font-light tracking-[0.15em] uppercase text-center mb-6 text-[#3d3d3d]">
          Анкета гостя
        </h2>

        <p className="text-center text-[#6b6b6b] text-sm mb-2">
          Пожалуйста, подтвердите своё присутствие на свадьбе до:
        </p>
        <p className="text-center text-xl font-light tracking-[0.2em] text-[#3d3d3d] mb-10">
          06 / 02 / 2025
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-10 shadow-sm">
          {/* Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#3d3d3d] mb-2">
              Имя и Фамилия *
            </label>
            <input
              type="text"
              placeholder="Ваше имя и фамилия"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg text-sm focus:outline-none focus:border-[#a8b5a0] focus:ring-1 focus:ring-[#a8b5a0]"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#3d3d3d] mb-2">
              Контактный телефон *
            </label>
            <input
              type="tel"
              placeholder="+7 (999) 123-45-67"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg text-sm focus:outline-none focus:border-[#a8b5a0] focus:ring-1 focus:ring-[#a8b5a0]"
              required
            />
          </div>

          {/* Attendance */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#3d3d3d] mb-3">
              Планируете ли Вы присутствовать на нашей свадьбе? *
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-3 cursor-pointer p-3 border border-[#e5e5e5] rounded-lg hover:border-[#a8b5a0] transition-colors">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={formData.attendance === "yes"}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-5 h-5 accent-[#5a7247]"
                  required
                />
                <div>
                  <span className="text-[#3d3d3d] font-medium">Да, с радостью приду!</span>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 border border-[#e5e5e5] rounded-lg hover:border-[#a8b5a0] transition-colors">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={formData.attendance === "no"}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-5 h-5 accent-[#5a7247]"
                  required
                />
                <div>
                  <span className="text-[#3d3d3d] font-medium">К сожалению, не смогу присутствовать</span>
                </div>
              </label>
            </div>
          </div>

          {/* Guests */}
          {formData.attendance === "yes" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#3d3d3d] mb-2">
                Сколько человек будет с Вами?
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg text-sm focus:outline-none focus:border-[#a8b5a0] focus:ring-1 focus:ring-[#a8b5a0]"
              >
                <option value="1">Только я (1 человек)</option>
                <option value="2">Я + 1 спутник (2 человека)</option>
                <option value="3">Я + 2 спутника (3 человека)</option>
                <option value="4">Я + 3 спутника (4 человека)</option>
              </select>
            </div>
          )}

          {/* Companion */}
          {(formData.attendance === "yes" && formData.guests !== "1") && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#3d3d3d] mb-2">
                Имена Ваших спутников
              </label>
              <input
                type="text"
                placeholder="Имена и фамилии спутников"
                value={formData.companion}
                onChange={(e) => setFormData({ ...formData, companion: e.target.value })}
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg text-sm focus:outline-none focus:border-[#a8b5a0] focus:ring-1 focus:ring-[#a8b5a0]"
              />
            </div>
          )}

          {/* Drinks */}
          {formData.attendance === "yes" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#3d3d3d] mb-3">
                Ваши предпочтения в напитках
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {drinks.map((drink) => (
                  <label 
                    key={drink.id} 
                    className="flex items-center gap-2 cursor-pointer p-2 hover:bg-[#faf9f7] rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.drinks.includes(drink.id)}
                      onChange={() => handleDrinkChange(drink.id)}
                      className="w-4 h-4 accent-[#5a7247] rounded"
                    />
                    <span className="text-sm text-[#6b6b6b]">{drink.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Wishes */}
          {formData.attendance === "yes" && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#3d3d3d] mb-2">
                Пожелания или особенности питания
              </label>
              <textarea
                placeholder="Например: вегетарианское меню, аллергия, музыкальные пожелания..."
                value={formData.wishes}
                onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg text-sm focus:outline-none focus:border-[#a8b5a0] focus:ring-1 focus:ring-[#a8b5a0] resize-none"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.phone || !formData.attendance}
              className="px-8 py-4 bg-[#5a7247] hover:bg-[#4a613a] text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[200px] justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Отправка...</span>
                </>
              ) : (
                'Отправить ответ'
              )}
            </button>

            {submitStatus === 'error' && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                ❌ Ошибка при отправке. Пожалуйста, попробуйте еще раз.
              </div>
            )}

            <p className="text-xs text-[#9a9a9a] text-center mt-4">
              * Обязательные поля
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
