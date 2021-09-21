const path = require('path')
const fs = require('fs')

// *** How To Use ***
// 1. Open the 'index.html' file in your browser
// 2. Copy and paste the updated 'colors' array into 'colors.json'
// 3. Now run 'yarn update' (to run this script)
// ## Note: this will rewrite palette.css, palette.min.css and index.js

try {
    const file = fs.readFileSync(path.resolve(__dirname, 'colors.json'), 'utf8')
    const colors = JSON.parse(file)

    const index_js = 'export const category256 = ' + file
    const _index = fs.writeFileSync(path.resolve(__dirname, 'index.js'), index_js)

    let c = 1
    let palette_css = ''
    let palette_min = ''
    for (const color of colors) {
        const fg = `.category256.color${c}-fg { stroke: ${color}; color: ${color}; } `
        const bg = `.category256.color${c}-bg { background: ${color}; fill: ${color}; } `
        palette_css = palette_css + fg + `\n` + bg + `\n`
        palette_min = palette_min + fg + bg
        c++
    }

    const _palette_css = fs.writeFileSync(path.resolve(__dirname, 'palette.css'), palette_css)
    const _palette_min = fs.writeFileSync(path.resolve(__dirname, 'palette.min.css'), palette_min)

} catch (err) {
    console.error(err)
}