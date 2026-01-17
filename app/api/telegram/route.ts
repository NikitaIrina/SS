import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('📨 Received form data:', body);
    
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    
    console.log('🔧 Environment check:', {
      BOT_TOKEN: BOT_TOKEN ? '✅ Set' : '❌ Missing',
      CHAT_ID: CHAT_ID ? '✅ Set' : '❌ Missing',
      CHAT_ID_VALUE: CHAT_ID
    });
    
    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('❌ Telegram bot not configured');
      return NextResponse.json(
        { 
          success: false,
          error: 'Bot not configured',
          details: {
            BOT_TOKEN_MISSING: !BOT_TOKEN,
            CHAT_ID_MISSING: !CHAT_ID
          }
        },
        { status: 500 }
      );
    }
    
    // Формируем красивое сообщение
    const message = `
🎉 *Новая заявка на свадьбу Никиты и Ирины*

👤 *Имя:* ${body.name || 'Не указано'}
📞 *Телефон:* \`${body.phone || 'Не указано'}\`
✅ *Присутствие:* ${body.attendance === 'Да, приду' ? '✅ Да' : '❌ Нет'}
👥 *Гостей:* ${body.guests || '1'} чел.
${body.companion ? `👫 *Спутники:* ${body.companion}\n` : ''}
${body.drinks ? `🍷 *Напитки:* ${body.drinks}\n` : ''}
${body.wishes ? `💭 *Пожелания:* ${body.wishes}\n` : ''}
⏰ *Отправлено:* ${new Date().toLocaleString('ru-RU', { 
  timeZone: 'Europe/Moscow',
  dateStyle: 'medium',
  timeStyle: 'short'
})}
    `.trim();
    
    console.log('📤 Sending to Telegram:', message);
    
    // Отправляем в Telegram
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    
    const telegramData = await telegramResponse.json();
    
    console.log('📩 Telegram response:', telegramData);
    
    if (telegramData.ok) {
      console.log('✅ Message sent successfully');
      return NextResponse.json({ 
        success: true, 
        message: '✅ Заявка отправлена!',
        telegramData
      });
    } else {
      console.error('❌ Telegram error:', telegramData);
      return NextResponse.json(
        { 
          success: false,
          error: 'Telegram API error',
          details: telegramData,
          debug: {
            url: telegramUrl.replace(BOT_TOKEN, 'HIDDEN'),
            chat_id: CHAT_ID,
            message_length: message.length
          }
        },
        { status: 500 }
      );
    }
    
  } catch (error: any) {
    console.error('🔥 Server error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// GET для проверки
export async function GET() {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;
  
  // Пробуем проверить бота
  let botInfo = null;
  if (BOT_TOKEN) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
      botInfo = await response.json();
    } catch (error) {
      botInfo = { error: String(error) };
    }
  }
  
  return NextResponse.json({
    status: 'ok',
    environment: process.env.NODE_ENV,
    configured: !!(BOT_TOKEN && CHAT_ID),
    variables: {
      BOT_TOKEN: BOT_TOKEN ? '✅ Set (first 10 chars: ' + BOT_TOKEN.substring(0, 10) + '...)' : '❌ Missing',
      CHAT_ID: CHAT_ID ? '✅ Set: ' + CHAT_ID : '❌ Missing'
    },
    bot_test: botInfo,
    timestamp: new Date().toISOString()
  });
}
