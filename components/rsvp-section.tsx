"use client"
import type React from "react"
import { useState } from "react"
import { Check, Loader2 } from "lucide-react"

export function RsvpSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
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

    console.log("🔄 Начинаем отправку...")

    try {
      const payload = {
        name: formData.name,
        attendance: formData.attendance,
        companion: formData.companion,
        drinks: formData.drinks,
        timestamp: new Date().toISOString()
      }

      console.log("📤 Отправляем данные:", payload)

      // ИСПРАВЛЕНО: Полный URL для production
      const API_URL = "https://ss-henna.vercel.app/api/rsvp"
      console.log("🌐 URL запроса:", API_URL)

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
        mode: "cors" // Важно для cross-origin запросов
      })

      console.log("📩 Статус ответа:", response.status)
      console.log("📩 OK?", response.ok)

      // Сначала читаем текст, потом парсим JSON
      const responseText = await response.text()
      console.log("📩 Ответ сервера (текст):", responseText)

      if (!response.ok) {
        throw new Error(`HTTP ошибка: ${response.status}`)
      }

      if (!responseText) {
        throw new Error("Пустой ответ от сервера")
      }

      const result = JSON.parse(responseText)
      console.log("📩 Ответ сервера (JSON):", result)

      if (result.success) {
        console.log("✅ Успех!")
        setIsSubmitted(true)
      } else {
        setError(`Ошибка сервера: ${result.error || "Неизвестная ошибка"}`)
      }
    } catch (err: any) {
      console.error("🔥 Критическая ошибка:", err)
      setError(`Ошибка отправки: ${err.message || "Неизвестная ошибка"}`)
    } finally {
      console.log("🏁 Завершение отправки")
      setIsLoading(false)
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
          <p className="text-[#6b6b6b]">Мы получили ваш ответ. До встречи на свадьбе!</p>
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
        </form>
      </div>
    </section>
  )
}
