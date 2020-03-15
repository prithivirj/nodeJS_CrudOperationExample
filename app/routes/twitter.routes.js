module.exports = (app) => {

    const twitter = require('../controllers/twitter.controller');
    app.get('/twitter/search', twitter.search);
    app.post('/twitter/updateStatus', twitter.statusUpdate);

}
