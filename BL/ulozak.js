var Ulozak = require('mongoose').model('Ulozak');

module.exports = {
    seeResults: function (req, res, next) {
        console.log(req.param.variable_name);
        Ulozak.find({ "ownershipSheetB.lrUnitShares.lrOwners.person.name": /SENTENTIA.*/ }, { mainBook: 1, lrUnitType: 1, ownershipSheetB: 1}).limit(20)
            .then((ulosci) => {
                res.end(JSON.stringify(ulosci));
            });
    },
    getRaw: function (req, res, next) {
        Ulozak.find({}).limit(20)
            .then((ulosci) => {
                res.end(ulosci);
            });
    },
}
