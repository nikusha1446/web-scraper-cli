import { Command } from 'commander';

class CLI {
  constructor() {
    this.program = new Command();
    this.setupCommands();
  }

  setupCommands() {
    this.program
      .name('web-scraper')
      .description('A CLI tool for web scraping with headless browsing')
      .version('1.0.0');

    this.program
      .command('navigate <url>')
      .description('Navigate to a URL')
      .action((url) => {
        console.log(`Navigating to: ${url}`);
      });

    this.program
      .command('show-code')
      .description('Show HTML code of current page')
      .action(() => {
        console.log('Showing HTML code...');
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
  }

  start() {
    this.program.parse(process.argv);
  }
}

export default CLI;
