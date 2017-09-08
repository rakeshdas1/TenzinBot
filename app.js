require('dotenv').config();

const snoowrap = require('snoowrap');
const snoostorm = require('snoostorm');
const moment = require('moment');

const r = new snoowrap({
    userAgent: 'reddit-bot-tenzin',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

const client = new snoostorm(r);

const streamOpts = {
    subreddit: 'HappyBirthdayTenzin',
    results: 25
};

const comments = client.CommentStream(streamOpts);

submitHbdPost(r);

comments.on('comment', comment => {
    if (!(comment.body.includes("Happy Birthday Tenzin")) || !(comment.body.includes("HappyBirthdayTenzin")) || !(comment.body.includes("Happybirthdaytenzin")) || !(comment.body.includes("happybirthdaytenzin"))) {
        comment.reply("#You suck, you didn't say happy birthday to Tenzin! \n (This action was performed by a bot | [Source](https://github.com/rakeshdas1/tenzinbot))");
        console.log("replied to a comment");
    }
    else {
        comment.reply("#Thanks for saying Happy Birthday to Tenzin! \n (This action was performed by a bot | [Source](https://github.com/rakeshdas1/tenzinbot))");
    }
});

function submitHbdPost(sw) {
    const postText = "Wishing Tenzin a Happy Birthday on " + moment().format('MM/DD/YYYY') + " at " + moment().format("h:mm a") + "\n(This action was performed by a bot | [Source](https://github.com/rakeshdas1/tenzinbot))";
    sw.getSubreddit('HappyBirthdayTenzin').submitSelfpost(
        {
            title: "Happy Birthday Tenzin!",
            text: postText
        }
    )
}