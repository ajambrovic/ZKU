const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Ulozak = new mongoose.Schema({
    harmonisationStatus: {
        type: Number, index: true
    },
    ownershipSheetB: {
        lrUnitShares: {
            lrOwners: {
                person: {
                    name: { type: [String], index: true }
                }
            }
        }
    }
});
const Institucija = new mongoose.Schema({
    name: {
        type: String, index: true
    },
    deleted: {
        type: Boolean, index: true
    }
})

const GlavnaKnjiga = new mongoose.Schema({
    name: {
        type: String, index: true
    },
    deleted: {
        type: Boolean, index: true
    },
    institution: {
        institutionId: {
            type: Number, index: true
        }
    }
})

mongoose.model('Ulozak', Ulozak, 'ulosci');
mongoose.model('Institucija', Institucija, 'institucije');
mongoose.model('GlavnaKnjiga', GlavnaKnjiga, 'glavne_knjige');
mongoose.connect('mongodb://localhost:27017/cupo', {
    useMongoClient: true
});

