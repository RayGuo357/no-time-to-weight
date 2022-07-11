const quotes = [
    {
        quote: "It's never too late to change what you are, it took me a long time to figure that out.",
        author: "Erin Morgenstern"
    },
    {
        quote: "Life always offers you a second chance. It's called tomorrow.",
        author: "Stephen King"
    },
    {
        quote: "Great works are performed not by strength but by perseverance.",
        author: "Samuel Johnson"
    }
]

const randomQuotes = (x) => {
    if (x > quotes.length) x = quotes.length
    if (x < 0) x = 0
    let result = []
    for (let i = 0; i < x; i++) {
        let temp = quotes[Math.floor(Math.random() * quotes.length)];
        if (!result.includes(temp)) {
            result.push(temp)
        } else {
            i--
        }
    }
    return result;
}

module.exports = { randomQuotes }