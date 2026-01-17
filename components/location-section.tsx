export function LocationSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3d3d3d] mb-12">
          ЛОКАЦИЯ
        </h2>
        
        <div className="md:grid md:grid-cols-2 gap-8 items-center">
          {/* Левая часть - Текст */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-[#3d3d3d] mb-4">
              Hedonist
            </h3>
            
            <div className="space-y-4 text-[#6b6b6b] mb-6">
              <p className="text-lg">
                Покровский бульвар, 8с1
              </p>
              <p className="text-lg">
                Москва
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-[#a8b5a0] font-medium text-lg">
                * Сбор гостей - 16:00
              </p>
            </div>
            
            {/* Как добраться */}
            <div>
              <h4 className="text-xl font-bold text-[#3d3d3d] mb-4">
                КАК ДОБРАТЬСЯ
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span>📍</span>
                  <span>Метро: Курская, Чкаловская</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>🚗</span>
                  <span>Парковка: городская парковка</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>🚕</span>
                  <span>Такси: Hedonist на Покровском бульваре</span>
                </li>
              </ul>
            </div>
            
            {/* Кнопка карты */}
            <div className="mt-8">
              <a 
                href="https://yandex.ru/maps/org/hedonist/178845513143/?ll=37.644730%2C55.757328&z=17.17"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#a8b5a0] hover:bg-[#8fa38a] text-white font-medium rounded-lg transition-all duration-300"
              >
                Открыть в Яндекс Картах →
              </a>
            </div>
          </div>
          
          {/* Правая часть - ФОТО */}
          <div className="bg-white p-4 shadow-xl rounded-xl overflow-hidden">
            {/* Основное фото */}
            <div className="mb-4">
              <img 
                src="/elegant-wedding-venue-with-garden.jpg" 
                alt="Ресторан Hedonist"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            {/* Описание фото */}
            <div className="text-center">
              <p className="text-lg font-medium text-[#3d3d3d] mb-2">
                Hedonist
              </p>
              <p className="text-sm text-[#6b6b6b]">
                Элегантный ресторан на Покровском бульваре
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
