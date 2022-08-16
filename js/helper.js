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
    },
    {
        quote: "With love and patience, nothing is impossible.",
        author: "Daisaku Ikeda"
    },
    {
        quote: "All great achievements require time.",
        author: "Maya Angelou"
    },
    {
        quote: "You are never too old to set another goal or to dream a new dream.",
        author: "C.S. Lewis"
    },
    {
        quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        quote: "For me, becoming isn't about arriving somewhere or achieving a certain aim. I see it instead as forward motion, a means of evolving, a way to reach continuously toward a better self. The journey doesn't end.",
        author: "Michelle Obama"
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


const getTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var time = String(today.getHours()).padStart(2, '0') + ":" 
                + String(today.getMinutes()).padStart(2, '0') + ":" 
                + String(today.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${time}`
}

module.exports = { randomQuotes, getTodaysDate }