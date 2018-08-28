module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    var multer = require('multer')
    var storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, './uploads/');
      },
      filename: function(req, file, cb) {
        cb(null, file.originalname);
      }
    });
    var fileFilter = (req, file, cb) => {
    // reject a file
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(null, false);// new Error('only jpy or png') // handle in FE
      }
    };
    var upload = multer({
    storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5
      },
      fileFilter: fileFilter
    });

    // Create a new Note
    app.post('/notes', upload.single('productImage'), notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
}
