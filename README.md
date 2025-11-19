# Web Scraper CLI

A command-line tool for web scraping with headless browsing capabilities using Puppeteer.

## Features

- 🌐 Navigate to any website
- 📄 View full page HTML
- 🎯 Capture specific elements using CSS selectors
- 🖱️ Click on elements and interact with pages
- ✨ Clean, formatted output

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nikusha1446/web-scraper-cli.git
cd web-scraper-cli
```

2. Install dependencies:
```bash
npm install
```

## Usage

Start the CLI:
```bash
npm start
```

You'll see an interactive prompt where you can enter commands:
```
scraper>
```

## Available Commands

### navigate <url>
Navigate to a URL. The `https://` prefix is optional.
```bash
scraper> navigate example.com
scraper> navigate https://github.com
```

### show-code
Display the full HTML code of the current page.
```bash
scraper> show-code
```

### capture <selector>
Capture HTML of a specific element using CSS selector.
```bash
scraper> capture h1
scraper> capture .header
scraper> capture #logo
scraper> capture div.container > p
```

### click <selector>
Click on an element using CSS selector.
```bash
scraper> click a
scraper> click button.submit
scraper> click #login-btn
```

### help
Show available commands (built-in Commander.js help).
```bash
scraper> help
```

### exit
Close the browser and exit the application.
```bash
scraper> exit
```

## Technologies Used

- **Node.js** - Runtime environment
- **Puppeteer** - Headless browser automation
- **Commander.js** - Command-line interface framework
- **Readline** - Interactive command input

## Project Structure
```
web-scraper-cli/
├── src/
│   ├── index.js       # Entry point
│   ├── cli.js         # CLI logic and command handling
│   ├── browser.js     # Puppeteer browser operations
│   └── utils.js       # Utility functions for formatting
├── package.json
├── .gitignore
└── README.md
```

## Error Handling

The tool provides helpful error messages:

- **"Browser not initialized"** - Use `navigate <url>` first
- **"Element not found"** - The CSS selector didn't match any element
- **Invalid commands** - Suggests using `help` command

## Requirements

- Node.js 18+ (for ES modules support)
- npm or yarn

## License

ISC
