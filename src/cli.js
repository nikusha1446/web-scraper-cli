import { Command } from 'commander';
import Browser from './browser.js';
import readline from 'readline';
import Utils from './utils.js';

class CLI {
  constructor() {
    this.program = new Command();
    this.browser = new Browser();
    this.setupCommands();

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'scraper>',
    });
  }

  setupCommands() {
    this.program
      .name('web-scraper')
      .description('A CLI tool for web scraping with headless browsing')
      .version('1.0.0')
      .exitOverride();

    this.program
      .command('navigate <url>')
      .description('Navigate to a URL')
      .action(async (url) => {
        try {
          if (!this.browser.page) {
            await this.browser.init();
          }
          await this.browser.navigate(url);
        } catch (error) {
          Utils.printError(error.message);
        }
      });

    this.program
      .command('show-code')
      .description('Show HTML code of current page')
      .action(async () => {
        try {
          const html = await this.browser.getHTML();
          Utils.printHTML(html, 'Full Page HTML');
        } catch (error) {
          Utils.printError(error.message);
        }
      });

    this.program
      .command('capture <selector>')
      .description('Capture HTML using CSS selector')
      .action(async (selector) => {
        try {
          const html = await this.browser.capture(selector);
          Utils.printHTML(html, `Captured: ${selector}`);
        } catch (error) {
          Utils.printError(error.message);
        }
      });

    this.program
      .command('click <selector>')
      .description('Click on element using CSS selector')
      .action(async (selector) => {
        try {
          await this.browser.click(selector);
        } catch (error) {
          Utils.printError(error.message);
        }
      });

    this.program
      .command('exit')
      .description('Close browser and exit')
      .action(async () => {
        try {
          await this.browser.close();
          process.exit(0);
        } catch (error) {
          Utils.printError(error.message);
        }
      });
  }

  start() {
    console.log('\n' + '='.repeat(50));
    console.log('  WEB SCRAPER CLI');
    console.log('='.repeat(50));
    console.log('Type "help" for available commands\n');
    this.rl.prompt();

    this.rl.on('line', async (input) => {
      const args = input.trim().split(' ');

      if (args[0]) {
        try {
          await this.program.parseAsync(['node', 'scraper', ...args]);
        } catch (error) {}
      }

      this.rl.prompt();
    });

    this.rl.on('close', async () => {
      await this.browser.close();
      console.log('\nGoodbye!');
      process.exit(0);
    });
  }
}

export default CLI;
