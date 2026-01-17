import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    console.log("🎉 RSVP данные:", data)
    
    // Возвращаем успех
    return NextResponse.json({ 
      success: true, 
      message: "Спасибо за ответ!",
      timestamp: new Date().toISOString(),
      data: data
    }, { status: 200 })
    
  } catch (error) {
    console.error("❌ Ошибка API:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Ошибка сервера" 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: "ok",
    message: "RSVP API готов к работе",
    methods: ["GET", "POST"],
    timestamp: new Date().toISOString()
  })
}
