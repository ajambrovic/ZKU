const Ulozak = require('mongoose').model('Ulozak');
const Institucija = require('mongoose').model('Institucija');
const GlavnaKnjiga = require('mongoose').model('GlavnaKnjiga');

module.exports = {
    seeResults: function (req, res, next) {
        const cestice = req.body.cestice;
        const vlasnik = req.body.vlasnik;
        const institucije = req.body.institucije;
        const glavnaKnjiga = req.body.glavnaKnjiga;
        const brojUloska = req.body.brojUloska;
        const brojCestice = req.body.brojCestice;

        const findCondition = {};
        if (cestice == 1) {
            findCondition['harmonisationStatus'] = { $in: [0, 5] };
        } else if (cestice == 2) {
            findCondition['harmonisationStatus'] = { $in: [1, 2, 3, 5] };
        }
        if (!!vlasnik) {
            findCondition['ownershipSheetB.lrUnitShares.lrOwners.person.name'] = new RegExp(`${vlasnik.toUpperCase()}.*`);
        }
        if (!!glavnaKnjiga) {
            findCondition['mainBook.id'] = Number(glavnaKnjiga);
        } else if (!!institucije) {
            findCondition['mainBook.institution.institutionId'] = Number(institucije);
        }

        if (!!brojUloska) {
            findCondition['possessionSheetA1.lrParcels.parcelNumber'] = brojUloska;
        }
        if (!!brojCestice) {
            findCondition['possessionSheetA1.lrParcels.parcelId'] = Number(brojCestice);
        }
        console.log(findCondition);
        Ulozak.find(findCondition, "harmonisationStatus mainBook.institution.institutionId ownershipSheetB.lrUnitShares.lrOwners.person.name")
            .then((ulosci) => {
                res.end(JSON.stringify(ulosci));
            });
    },
    getInstitutions: function (req, res, next) {
        Institucija.find({ deleted: false }, 'name institutionId')
            .then((institucije) => {
                res.end(JSON.stringify(institucije));
            });
    },
    getMainBooks: function (req, res, next) {
        const institucija = req.body.institutionID;
        const findCondition = { deleted: false, "institution.institutionId": institucija };
        console.log(findCondition)
        GlavnaKnjiga.find(findCondition, 'name id')
            .then((glavneKnjige) => {
                res.end(JSON.stringify(glavneKnjige));
            });
    },
}
