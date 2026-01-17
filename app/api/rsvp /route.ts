import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Получаем данные
    const data = await request.json()
    
    console.log("📥 Получены данные RSVP:", data)
    
    // Просто возвращаем успех (без Telegram для теста)
    return NextResponse.json({ 
      success: true, 
      message: "✅ Данные успешно получены!",
      timestamp: new Date().toISOString(),
      receivedData: data
    })
    
  } catch (error) {
    console.error("❌ Ошибка RSVP:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Server error",
      details: String(error)
    }, { status: 500 })
  }
}

// Добавь GET для теста
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "rsvp",
    description: "RSVP API endpoint",
    timestamp: new Date().toISOString()
  })
}
