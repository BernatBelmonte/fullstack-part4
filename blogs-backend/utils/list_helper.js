
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    var likes = 0
    for (var i = 0; i < blogs.length; ++i) {
        likes = likes + blogs[i].likes
    }
    return likes
}

const favouriteBlog = (blogs) => {
    var maxLikes = 0
    var maxIndex = 0
    for (var i = 0; i < blogs.length; ++i) {
        if (blogs[i].likes > maxLikes){
            maxLikes = blogs[i].likes
            maxIndex = i
        };
    }
    return blogs[maxIndex]
}

const mostBlogs = (blogs) => {
    const authors = {}
    for (var i = 0; i < blogs.length; ++i) {
        if (blogs[i].author in authors) {
            authors[blogs[i].author] += 1
        }
        else {
            authors[blogs[i].author] = 1
        }
    }
    winner = ''
    winnerBlogs = 0

    for (const key of Object.keys(authors)) {
        if (authors[key] > winnerBlogs) {
            winner= key
            winnerBlogs = authors[key]
        }
    }
    return {
        winner,
        winnerBlogs
    }
}

const mostLikes = (blogs) => {
    const authors = {}
    for (var i = 0; i < blogs.length; ++i) {
        if (blogs[i].author in authors) {
            authors[blogs[i].author] += blogs[i].likes
        }
        else {
            authors[blogs[i].author] = blogs[i].likes
        }
    }
    winner = ''
    winnerLikes = 0

    for (const key of Object.keys(authors)) {
        if (authors[key] > winnerLikes) {
            winner= key
            winnerLikes = authors[key]
        }
    }
    return {
        winner,
        winnerLikes
    }
}


module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}