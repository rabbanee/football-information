const swal = require('sweetalert');
class DB {
    constructor() {
        this.idb = require('idb');
        this.base_url = ' https://api.football-data.org/v2/';
        this.dbPromised = this.idb.open('football-information', 1, upgradeDb => {
            let remindersObjectStore = upgradeDb.createObjectStore('reminder', { keyPath: 'id' })
            remindersObjectStore.createIndex('match', 'match', { unique: false })
        });

    }
    remindToWatch(match) {
        return new Promise((resolve, reject) => {
            this.dbPromised.then(db => {
                let tx = db.transaction('reminder', 'readwrite');
                let store = tx.objectStore('reminder');
                store.add(match);
                return tx.complete;
            })
                .then(_ => resolve())
                .catch(_ => reject())
            

        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.dbPromised
                .then(db => {
                    let tx = db.transaction('reminder', 'readonly');
                    let store = tx.objectStore('reminder');
                    return store.getAll();
                })
                .then(reminders => resolve(reminders))
        })
    }

    removeFromReminders(match) {
        return new Promise((resolve, reject) => {
            this.dbPromised
                .then(db => {
                    let tx = db.transaction('reminder', 'readwrite');
                    let store = tx.objectStore('reminder');
                    store.delete(match);
                    return tx.complete;
                })
                .then(resolve('success to delete'))
        })
    }

}

export default DB;