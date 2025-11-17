import puppeteer from 'puppeteer';

class Browser {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox'],
    });
    this.page = await this.browser.newPage();
    console.log('Browser initialized');
  }

  async navigate(url) {
    if (!this.page) {
      throw new Error('Browser not initialized');
    }
    await this.page.goto(url, { waitUntil: 'networkidle2' });
    console.log(`Navigated to: ${url}`);
  }

  async getHTML() {
    if (!this.page) {
      throw new Error('Browser not initialized');
    }
    return await this.page.content();
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('Browser closed');
    }
  }
}

export default Browser;
