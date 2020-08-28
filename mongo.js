const mongose = require('mongoose');
let db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/mongose-db', {
    userNewUrlParser: true,
    useCreateIndex: true
})
.then(() => {
    console.info('terkoneksi pada database!');
})
.catch(err => {
    console.error('koneksi gagal: ', err);
    process.exit();
});

module.exports = db;