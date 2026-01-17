"use client"
import type React from "react"
import { useState } from "react"
import { Check, Loader2, Mail, Download } from "lucide-react"

export function RsvpSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    attendance: "yes",
    companion: "",
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
      drinks: prev.drinks.includes(drinkId) ? prev.drinks.filter((d) => d !== drinkId) : [...prev.drinks, drinkId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log("🔄 Отправляем форму...")

    try {
      // Проверка обязательных полей
      if (!formData.name.trim()) {
        throw new Error("Пожалуйста, введите ваше имя")
      }

      // Имитация отправки (1.5 секунды)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Формируем данные ответа
      const submission = {
        "👤 Имя": formData.name,
        "✅ Присутствие": formData.attendance === "yes" ? "Да, с удовольствием" : "Не смогу",
        "👥 Спутник": formData.companion || "Буду один(а)",
        "🍷 Напитки": formData.drinks.map(id => drinks.find(d => d.id === id)?.label).filter(Boolean).join(", ") || "Не указано",
        "📅 Дата ответа": new Date().toLocaleString("ru-RU"),
        "🕒 Timestamp": new Date().toISOString()
      }
      
      console.log("🎉 Данные RSVP:", submission)
      console.table(submission)
      
      // Сохраняем в localStorage для просмотра
      localStorage.setItem('wedding_rsvp', JSON.stringify(submission, null, 2))
      
      // Показываем успех
      setIsSubmitted(true)
      
    } catch (err: any) {
      console.error("❌ Ошибка:", err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadRSVPData = () => {
    const data = localStorage.getItem('wedding_rsvp')
    if (data) {
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `rsvp-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-[#f5f4f2]">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#5a7247] flex items-center justify-center mx-auto mb-6">
            <Check className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-light tracking-[0.1em] uppercase text-[#3d3d3d] mb-4">Спасибо!</h2>
          <p className="text-[#6b6b6b] mb-6">Мы получили ваш ответ. До встречи на свадьбе!</p>
          
          <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-[#e5e5e5]">
            <h3 className="text-lg font-light text-[#3d3d3d] mb-4">📋 Ваш ответ сохранен</h3>
            
            <div className="space-y-3 text-left mb-6">
              <p className="text-sm"><span className="font-medium">Имя:</span> {formData.name}</p>
              <p className="text-sm"><span className="font-medium">Присутствие:</span> {formData.attendance === "yes" ? "✅ Да, с удовольствием" : "❌ Не смогу"}</p>
              {formData.companion && <p className="text-sm"><span className="font-medium">Спутник:</span> {formData.companion}</p>}
              {formData.drinks.length > 0 && (
                <p className="text-sm"><span className="font-medium">Напитки:</span> {formData.drinks.map(id => drinks.find(d => d.id === id)?.label).join(", ")}</p>
              )}
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={downloadRSVPData}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-[#5a7247] text-[#5a7247] rounded-lg hover:bg-[#5a7247] hover:text-white transition-colors"
              >
                <Download size={16} />
                Скачать данные (JSON)
              </button>
              
              <button
                onClick={() => {
                  const subject = "RSVP Ответ: " + formData.name
                  const body = `Имя: ${formData.name}%0D%0AПрисутствие: ${formData.attendance === "yes" ? "Да" : "Нет"}%0D%0AСпутник: ${formData.companion || "Нет"}%0D%0AНапитки: ${formData.drinks.map(id => drinks.find(d => d.id === id)?.label).join(", ") || "Не указано"}%0D%0A%0D%0AДата ответа: ${new Date().toLocaleString("ru-RU")}`
                  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${body}`)
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail size={16} />
                Отправить себе на email
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              💡 Данные также сохранены в Console (F12) и localStorage
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-[#f5f4f2]">
      <div className="max-w-xl mx-auto px-6">
        <h2 className="text-xl md:text-3xl font-light tracking-[0.15em] uppercase text-rainbow text-center mb-6">
          Анкета гостя
        </h2>
        <p className="text-center text-[#6b6b6b] text-sm mb-2">
          Пожалуйста, подтвердите своё присутствие на мероприятии до:
        </p>
        <p className="text-center text-xl font-light tracking-[0.2em] text-[#3d3d3d] mb-10">
          06 / 02 / 2025
        </p>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-10 shadow-sm">
          {/* Name */}
          <div className="mb-6">
            <label className="block text-sm text-[#3d3d3d] mb-2">Пожалуйста, подтвердите Ваше присутствие:</label>
            <input
              type="text"
              placeholder="Имя и Фамилия"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg text-sm focus:outline-none focus:border-[#a8b5a0]"
              required
            />
          </div>
          {/* Attendance */}
          <div className="mb-6">
            <label className="block text-sm text-[#3d3d3d] mb-3">Планируете ли Вы присутствовать?</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={formData.attendance === "yes"}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-4 h-4 accent-[#5a7247]"
                  required
                />
                <span className="text-sm text-[#6b6b6b]">Да, с удовольствием</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={formData.attendance === "no"}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-4 h-4 accent-[#5a7247]"
                />
                <span className="text-sm text-[#6b6b6b]">Не смогу</span>
              </label>
            </div>
          </div>
          {/* Companion */}
          <div className="mb-6">
            <label className="block text-sm text-[#3d3d3d] mb-2">
              Если Вы будете не одни, пожалуйста, заполните поле ниже:
            </label>
            <input
              type="text"
              placeholder="Имя и Фамилия Вашего спутника/спутницы"
              value={formData.companion}
              onChange={(e) => setFormData({ ...formData, companion: e.target.value })}
              className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg text-sm focus:outline-none focus:border-[#a8b5a0]"
            />
          </div>
          {/* Drinks */}
          <div className="mb-8">
            <label className="block text-sm text-[#3d3d3d] mb-3">Ваши предпочтения</label>
            <div className="grid grid-cols-2 gap-3">
              {drinks.map((drink) => (
                <label key={drink.id} className="flex items-center gap-2 cursor-pointer">
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
          {/* Error message */}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-32 h-32 rounded-full border border-[#d4d4d4] text-xs tracking-[0.1em] uppercase text-[#6b6b6b] hover:border-[#5a7247] hover:text-[#5a7247] transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : "Отправить"}
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-6">
            ⚠️ Временно: данные сохраняются локально. Для сбора ответов настройте Google Forms.
          </p>
        </form>
      </div>
    </section>
  )
}
