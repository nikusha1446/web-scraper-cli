import { Command } from 'commander';
import Browser from './browser.js';
import readline from 'readline';

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
          console.error(`Error: ${error.message}`);
        }
      });

    this.program
      .command('show-code')
      .description('Show HTML code of current page')
      .action(async () => {
        try {
          const html = await this.browser.getHTML();
          console.log('\n--- HTML Code ---\n');
          console.log(html);
          console.log('\n--- End of HTML ---\n');
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      });

    this.program
      .command('capture <selector>')
      .description('Capture HTML using CSS selector')
      .action((selector) => {
        console.log(`Capturing element: ${selector}`);
      });

    this.program
      .command('click <selector>')
      .description('Click on element using CSS selector')
      .action((selector) => {
        console.log(`Clicking element: ${selector}`);
      });

    this.program
      .command('exit')
      .description('Close browser and exit')
      .action(async () => {
        try {
          await this.browser.close();
          process.exit(0);
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      });
  }

  start() {
    console.log('Web Scraper CLI');
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
