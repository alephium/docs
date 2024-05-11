const fetch = require('node-fetch');
const fs = require('fs');

function renderParam(param) {
    const tokens = param.split(" ")
    return `${tokens[0]} **${tokens[1]}** *${tokens.slice(2).join(' ')}*`
}

function renderReturn(returns) {
    const tokens = returns.split(" ")
    const body = tokens.slice(1).join(' ')
    if (body) {
        return `${tokens[0]} *${tokens.slice(1).join(' ')}*`
    } else {
        return `${tokens[0]}`
    }
}

function writeFunction(f, stream) {
    stream.write(`### ${f.name}\n\n`)
    stream.write(`\`\`\`Rust\n${f.signature}\n\`\`\`\n\n`)
    stream.write(`${f.doc}\n\n`)
    f.params.forEach(param => stream.write(`> ${renderParam(param)}\n>\n`))
    stream.write(`> ${renderReturn(f.returns)}\n\n`)
    stream.write(`---\n\n`)
}

function extractCategory(json) {
    const categories = []
    const map = new Map()
    json.forEach(f => {
        if (!categories.includes(f.category)) {
            categories.push(f.category)
        }
        const functions = map.get(f.category) 
        if (functions === undefined) {
            map.set(f.category, [f])
        } else {
            functions.push(f)
        }
    })
    return [categories, map]
}

function writeHeader(stream, categories) {
    stream.write(`
---
sidebar_position: 20
title: Built-in Functions
sidebar_label: Built-in functions
---

<!---
This file is auto-generated with "scripts/generate-builtin-functions.js"
-->

The built-in functions are divided into several categories:
    `.trim())
    stream.write(categories.map(category => `\n[${category}](#${category.toLowerCase()}-functions)`).join(','))
    stream.write(`.\nAll built-in functions are suffixed with \`!\`.`)
    stream.write(`\nAll of the byte encoding use Big Endian byte order.`)
    stream.write('\n\n')
}

async function main() {
    const url = 'https://raw.githubusercontent.com/alephium/alephium/master/protocol/src/main/resources/ralph-built-in-functions.json'
    const response = await fetch(url)
    const json = await response.json()
    // const json = require('./builtin.json')

    const stream = fs.createWriteStream('./docs/ralph/built-in-functions.md')
    const [categories, map] = extractCategory(json)
    writeHeader(stream, categories)
    categories.forEach(category => {
        stream.write(`## ${category} Functions\n---\n`)
        const functions = map.get(category)
        functions.forEach(f => writeFunction(f, stream))
    })
    stream.end()
}

main()
