const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('idle');

  // Собираем простые данные для теста
  const testData = {
    name: formData.name,
    phone: formData.phone,
    attendance: formData.attendance === "yes" ? "Да, приду" : "Нет, не смогу",
    guests: formData.guests,
    companion: formData.companion,
    drinks: formData.drinks.join(', ') || 'Не указано',
    wishes: formData.wishes,
    test: true
  };

  console.log('📤 Sending test data:', testData);

  try {
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const result = await response.json();
    
    console.log('📩 Server response:', result);
    
    if (response.ok && result.success) {
      setSubmitStatus('success');
      // Очищаем форму
      setFormData({
        name: "",
        phone: "",
        attendance: "",
        companion: "",
        guests: "1",
        wishes: "",
        drinks: [],
      });
    } else {
      setSubmitStatus('error');
      console.error('Server error:', result);
      // Показываем детали ошибки
      alert('Ошибка: ' + (result.error || 'Unknown error'));
    }
  } catch (error: any) {
    setSubmitStatus('error');
    console.error('Network error:', error);
    alert('Network error: ' + error.message);
  } finally {
    setIsSubmitting(false);
  }
};
