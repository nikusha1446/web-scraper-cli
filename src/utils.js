class Utils {
  static formatHTML(html) {
    const maxLength = 2000;
    if (html.length > maxLength) {
      return html.substring(0, maxLength) + '\n...(truncated)';
    }
    return html;
  }

  static printSuccess(message) {
    console.log(`✓ ${message}`);
  }

  static printError(message) {
    console.error(`✗ ${message}`);
  }

  static printHTML(html, title = 'HTML Code') {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`${title}`);
    console.log('='.repeat(50));
    console.log(this.formatHTML(html));
    console.log('='.repeat(50) + '\n');
  }
}

export default Utils;
