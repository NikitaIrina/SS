import { MapPin, Heart, Utensils } from "lucide-react"

const events = [
  {
    time: "16:00",
    title: "СБОР ГОСТЕЙ",
    icon: MapPin,
    color: "#e8a0a0",
  },
  {
    time: "16:15",
    title: "ЦЕРЕМОНИЯ РЕГИСТРАЦИИ",
    icon: Heart,
    color: "#d4c4b5",
  },
  {
    time: "17:30",
    title: "БАНКЕТ",
    icon: Utensils,
    color: "#3d3d3d",
  },
]

export function TimelineSection() {
  return (
    <section className="py-20 bg-[#f5f4f2]">
      <div className="max-w-md mx-auto px-6 text-center">
        {/* Заголовок с большим шрифтом */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-[0.1em] uppercase text-[#3d3d3d] mb-12">
          ТАЙМИНГ
        </h2>

        <div className="space-y-10">
          {events.map((event, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Иконка */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 border-4"
                style={{ 
                  color: event.color,
                  borderColor: event.color,
                  backgroundColor: `${event.color}20`
                }}
              >
                <event.icon size={38} strokeWidth={1.5} />
              </div>
              
              {/* Время - в 2 раза больше */}
              <p className="text-3xl font-black text-[#3d3d3d] mb-2 tracking-tight">
                {event.time}
              </p>
              
              {/* Заголовок - в 2 раза больше */}
              <p 
                className="text-xl font-bold tracking-[0.15em] uppercase" 
                style={{ color: event.color }}
              >
                {event.title}
              </p>
            </div>
          ))}
        </div>
        
        {/* Декоративная линия с увеличенным текстом */}
        <div className="mt-16 pt-10 border-t-2 border-[#e5e5e5]">
          <p className="text-2xl md:text-3xl font-light italic text-[#5a7247]">
            Мы с нетерпением ждём встречи с вами
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-12 h-0.5 bg-[#e5e5e5]"></div>
            <div className="w-2 h-2 rounded-full bg-[#5a7247]"></div>
            <div className="w-12 h-0.5 bg-[#e5e5e5]"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
