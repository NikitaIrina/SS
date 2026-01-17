export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16">
      {/* Фоновое изображение с розами */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('/white-roses-soft-elegant-wedding-background.jpg')`,
        }}
      />

      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
        {/* Заголовок - "Наша весенняя свадьба" */}
        <p className="text-xs tracking-[0.4em] uppercase text-[#9a9a9a] mb-8">
          Наша весенняя свадьба
        </p>

        {/* Имена крупно */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#3d3d3d] mb-6 tracking-tight">
          Никита <span className="text-[#a8b5a0]">&</span> Ирина
        </h1>

        {/* Основная информация о дате */}
        <div className="mb-12">
          <div className="text-4xl md:text-5xl font-light text-[#3d3d3d] mb-4">
            6 марта, 16:00
          </div>
          <div className="text-2xl md:text-3xl text-[#6b6b6b]">
            Москва
          </div>
        </div>

        {/* Поляроидные фото */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-8">
          {/* Левое фото - Ирина в детстве */}
          <div className="bg-white p-3 pb-16 shadow-2xl transform -rotate-3 w-40 md:w-56 transition-transform hover:-rotate-6">
            <div className="aspect-square overflow-hidden mb-3">
              <img 
                src="/little-girl-with-flower-crown-smiling-childhood-ph.jpg" 
                alt="Ирина в детстве" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-[#6b6b6b] italic text-center px-2">
              Будущая невеста
            </p>
          </div>

          {/* Декоративный элемент */}
          <div className="hidden md:flex flex-col items-center">
            <div className="text-4xl text-[#a8b5a0] mb-2">❦</div>
            <div className="h-20 w-px bg-gradient-to-b from-[#a8b5a0] to-transparent"></div>
          </div>

          {/* Правое фото - Никита в детстве */}
          <div className="bg-white p-3 pb-16 shadow-2xl transform rotate-3 w-40 md:w-56 transition-transform hover:rotate-6">
            <div className="aspect-square overflow-hidden mb-3">
              <img 
                src="/little-boy-smiling-childhood-photo-cute.jpg" 
                alt="Никита в детстве" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-[#6b6b6b] italic text-center px-2">
              Будущий жених
            </p>
          </div>
        </div>

        {/* Дата крупно в центре */}
        <div className="mt-10 mb-8">
          <div className="inline-flex items-center gap-4 md:gap-8 bg-white/80 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#3d3d3d]">6</div>
              <div className="text-sm text-[#9a9a9a]">МАРТА</div>
            </div>
            
            <div className="text-3xl text-[#a8b5a0] font-light">—</div>
            
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#3d3d3d]">16:00</div>
              <div className="text-sm text-[#9a9a9a]">ВЕЧЕР</div>
            </div>
            
            <div className="text-3xl text-[#a8b5a0] font-light">—</div>
            
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#3d3d3d]">МОСКВА</div>
            </div>
          </div>
        </div>

        {/* Блок "Подтвердить присутствие" УДАЛЕН */}

        {/* Декоративная стрелка вниз */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#a8b5a0]/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#a8b5a0] rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
