const express = require('express')
const puppeteer = require('puppeteer');

const WhatsApp = require('./whatsapp/WhatsApp');

const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36'
const userDataDir = '';


const run = async () => {

    const getWhatsAppMeta = async () => {
        const browser = await puppeteer.launch({headless: true, userDataDir: userDataDir});
        const page = await browser.newPage();
        await page.setUserAgent(userAgent); 
        
        return {browser: browser, page: page};
    };

    const setupApp = (whatsApp) => {
        const app = express();

        app.get('/send', async (req, res) => {
            const phone = req.query.phone;
            const text = req.query.text;

            if (!phone || !text) {
                res.status(400);
            } else {
                await whatsApp.sendMessage(phone, text);
            }

            res.send('');
        });

        return app;
    }

    const whatsAppMeta = await getWhatsAppMeta();
    const whatsApp = new WhatsApp(whatsAppMeta.browser, whatsAppMeta.page);
    const app = setupApp(whatsApp);
 
    app.listen(3000, () => console.log(`Listening`));
};

run();

