/**
 * Helper script to build our custom css for iOS (article view).
 */
const fs = require('fs');

(async function load() {
  try {
    const file = await fs.readFileSync('./build/style.css', 'utf-8')
        // .replace(/(\d*)px/g, '$1pt') // px to pt
        .replace(/:root {([\s\S]*?)}/g, ''); // remove root color definitions

    let output = '/* Note: This file is auto-generated, see "gutenberg-blocks" repo */ \n';
        output += file

    fs.writeFileSync('./build/articleView.css', output)
    console.info('File articleView.css written.')
  } catch (e) {
    throw e
  }
})()

