var Twit = require('twit');
var config = require('../../config/twitter.config')
var T = new Twit(config);

exports.search = (req, res) => {
    console.log('params', req)
    const params = {
        q: req.query.search,
        count: req.query.count
    }
    T.get('search/tweets', params, (err, data) => {
        console.log(data);
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}

exports.statusUpdate = (req, res) => {
    const tweet = {
        status: req.body.status
    }
    T.post('statuses/update', tweet, (err, data) => {
        if (err) {
            console.log("Something went wrong!");
            res.json(err);
        }
        else {
            console.log("Voila It worked!");
            res.json(data);
        }
    });
}


T.stream('user');
stream.on('follow', followed);

function followed(eventMsg) {
    console.log('FOllow event');
    var name = eventMsg.source.name;
    var screenName = eventMsg.source.screen_name;
    tweetMessage('@' + screenName + "Thank you for following me!")
}

function tweetMessage(txt) {

    var tweet = {
        status: txt
    }

    T.post('statuses/update', tweet, tweeted)

    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong!");
            response.send(err);
        }
        else {
            console.log("Voila It worked!");
            response.send(data);
        }
    }
}
