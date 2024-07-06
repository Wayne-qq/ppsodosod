const TelegramBot = require('node-telegram-bot-api');

// Вставте свій токен, отриманий від BotFather
const token = '7210445051:AAEj3izlAUx-eMt8PXouV97ty0xUS05whfY';

// Створіть новий екземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обробник команди /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || msg.from.first_name || 'користувач';

  const message = `Привіт, ${username}! 🎉\n\nЛаскаво просимо до світу VaardToken! 🌟 Тут ти зможеш заробляти VRD токени та обмінювати їх на справжні USDT! 💸 Як? Все просто! Виконуй захоплюючі завдання, запрошуй друзів та майни токени простими тапами! 📲✨\n\nА ще в нас постійно проходять круті дропи, де кожен має шанс виграти! 🎁 Тож не пропусти нагоду підписатися на наш канал, щоб завжди бути в курсі всіх найгарячіших новин та подій! 🔔\n\nГотовий до пригод? Приєднуйся до нас та починай свій шлях до багатства з VaardToken! 🚀`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🌿 PLAY 🌿",
            url: "http://t.me/VaardToken_bot/VaardToken"
          }
        ],
        [
          {
            text: "🤍 Код для друга 🤍",
            callback_data: 'get_user_id'
          }
        ]
      ]
    }
  };

  // Відправка повідомлення з кнопками
  bot.sendMessage(chatId, message, options);
});

// Обробник callback queries
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;
  const userId = callbackQuery.from.id;

  if (callbackQuery.data === 'get_user_id') {
    const referralLink = "http://t.me/VaardToken_bot/VaardToken";
    bot.sendMessage(chatId, `Посилання - ${referralLink}\nКод для друга - ${userId}`);
  }

  // Відповісти на callback query для приховання індикатора завантаження
  bot.answerCallbackQuery(callbackQuery.id);
});

console.log('Bot is running...');
