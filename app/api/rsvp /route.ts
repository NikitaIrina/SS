export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    console.log('✅ Данные получены:', data)
    
    // ВРЕМЕННО ОТКЛЮЧИТЕ TELEGRAM
    /*
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    
    if (!botToken || !chatId) {
      console.error("Missing Telegram credentials")
      return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 })
    }
    
    // ... остальной код Telegram
    */
    
    // ПРОСТО ВОЗВРАЩАЕМ УСПЕХ
    return NextResponse.json({ 
      success: true, 
      message: 'Данные получены (Telegram временно отключен)',
      receivedData: data 
    })
    
  } catch (error) {
    console.error("RSVP error:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
