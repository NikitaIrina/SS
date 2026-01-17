import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    console.log("✅ RSVP данные получены:", data)
    
    return NextResponse.json({ 
      success: true, 
      message: "Данные получены успешно!",
      receivedData: data,
      timestamp: new Date().toISOString()
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
    message: "RSVP API работает",
    timestamp: new Date().toISOString()
  })
}
