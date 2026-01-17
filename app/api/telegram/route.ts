import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Ваши переменные из Vercel
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    
    // Проверка конфигурации
    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('❌ Telegram bot not configured');
      return NextResponse.json(
        { error: 'Bot not configured' },
        { status: 500 }
      );
    }
    
    // Форматируем сообщение
    const message = `
🎉 *Новая заявка со свадебного сайта*

👤 *Имя:* ${body.name || 'Не указано'}
📞 *Телефон:* ${body.phone || 'Не указано'}
👥 *Количество гостей:* ${body.guests || '1'}
✅ *Присутствие:* ${body.attendance === 'yes' ? 'Да, приду' : 'Нет, не смогу'}
💭 *Пожелания:* ${body.wishes || 'Нет пожеланий'}
📅 *Дата отправки:* ${new Date().toLocaleString('ru-RU')}
    `.trim();
    
    // Отправляем в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );
    
    const telegramData = await telegramResponse.json();
    
    if (telegramData.ok) {
      console.log('✅ Message sent to Telegram:', telegramData);
      return NextResponse.json({ 
        success: true, 
        messageId: telegramData.result.message_id 
      });
    } else {
      console.error('❌ Telegram API error:', telegramData);
      return NextResponse.json(
        { error: 'Failed to send message to Telegram', details: telegramData },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

// Для тестирования - GET запрос
export async function GET() {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;
  
  return NextResponse.json({
    configured: !!(BOT_TOKEN && CHAT_ID),
    bot_token_exists: !!BOT_TOKEN,
    chat_id_exists: !!CHAT_ID,
    chat_id: CHAT_ID,
    message: 'Telegram API endpoint is working'
  });
}
