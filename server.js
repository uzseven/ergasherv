app.post("/send", async (req, res) => {
    const { username, age } = req.body; // JS’dan kelayotgan username/age
    const message = `📩 Yangi foydalanuvchi:\nIsm: ${username}\nYosh: ${age}`;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message
        });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});
