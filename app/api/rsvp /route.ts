import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    console.log("✅ Данные получены:", data)
    
    // Просто возвращаем успех для теста
    return NextResponse.json({ 
      success: true, 
      message: "Данные получены успешно!"
    })
    
  } catch (error) {
    console.error("❌ Ошибка:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Server error" 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "RSVP API работает"
  })
}
