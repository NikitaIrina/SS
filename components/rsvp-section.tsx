const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError("")

  console.log("🔄 Начинаем отправку...")

  try {
    // Тестовые данные
    const payload = {
      name: formData.name || "Тест Имя",
      attendance: formData.attendance || "yes",
      companion: formData.companion || "",
      drinks: formData.drinks || [],
      timestamp: new Date().toISOString()
    }

    console.log("📤 Отправляем данные:", payload)

    const API_URL = "/api/rsvp"
    console.log("🌐 URL запроса:", API_URL)

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload),
    })

    console.log("📩 Статус ответа:", response.status)
    console.log("📩 OK?", response.ok)

    const result = await response.json()
    console.log("📩 Ответ сервера:", result)

    if (response.ok) {
      console.log("✅ Успех!")
      setIsSubmitted(true)
    } else {
      console.error("❌ Ошибка сервера:", result)
      setError(`Ошибка сервера: ${result.error || response.status}`)
    }
  } catch (err: any) {
    console.error("🔥 Критическая ошибка:", err)
    setError(`Ошибка: ${err.message || "Неизвестная ошибка"}`)
  } finally {
    console.log("🏁 Завершение отправки")
    setIsLoading(false)
  }
}
