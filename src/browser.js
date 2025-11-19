import puppeteer from 'puppeteer';
import Utils from './utils.js';

class Browser {
  constructor() {
    this.browser = null;
    this.page = null;
    this.currentUrl = null;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox'],
    });
    this.page = await this.browser.newPage();
    Utils.printSuccess('Browser initialized');
  }

  async navigate(url) {
    if (!this.page) {
      throw new Error('Browser not initialized');
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    await this.page.goto(url, { waitUntil: 'networkidle2' });
    this.currentUrl = url;
    Utils.printSuccess(`Navigated to: ${url}`);
  }

  async getHTML() {
    if (!this.page) {
      throw new Error('Browser not initialized. Use "navigate <url>" first');
    }
    return await this.page.content();
  }

  async capture(selector) {
    if (!this.page) {
      throw new Error('Browser not initialized. Use "navigate <url>" first');
    }

    const element = await this.page.$(selector);

    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    const html = await this.page.evaluate((el) => el.outerHTML, element);
    return html;
  }

  async click(selector) {
    if (!this.page) {
      throw new Error('Browser not initialized. Use "navigate <url>" first');
    }

    const element = await this.page.$(selector);

    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    await element.click();
    await this.page
      .waitForNavigation({ waitUntil: 'networkidle2' })
      .catch(() => {});

    const newUrl = this.page.url();

    if (newUrl !== this.currentUrl) {
      this.currentUrl = newUrl;
      Utils.printSuccess(`Clicked "${selector}" - navigated to: ${newUrl}`);
    } else {
      Utils.printSuccess(`Clicked on: "${selector}"`);
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      Utils.printSuccess('Browser closed');
    }
  }
}

export default Browser;
