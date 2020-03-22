class Utils {
    static sleep(time) {
        return new Promise((resolve) => { 
            setTimeout(resolve, time);
        });
    }
}


class WhatsApp {

    static sendBtnSelector = '#main > footer > div.copyable-area > div:nth-child(3) > button';

    constructor(browser, page) {
        this.browser = browser;
        this.page = page;
    }

    async sendMessage(phone, message) {
        const messageUrl = `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;
        
        await this.page.goto(messageUrl);
        await this.page.waitForSelector(WhatsApp.sendBtnSelector);
        await this.page.click(WhatsApp.sendBtnSelector);
        await Utils.sleep(2000);
    }

    async exit() {
        await this.browser.close();
    }
}

module.exports = WhatsApp;
