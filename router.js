const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Note = require('./note');
const router = express.Router();

mongoose.connect('mongodb://admin:admin@ds133017.mlab.com:33017/todoapp1996');
const db = mongoose.connection;
db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  console.log('DB connected successfully!');
});


router.get('/', function(req,res){
    res.json({message: 'welcome to uor api'});
});

router.route('/notes')
    .post(function(req,res){
        var note = new Note();
        note.title = req.body.title;
        note.body = req.body.body;

        note.save(function(err){
            if(err){res.send(err);}
            console.log(note);
            res.json(note);
        });
    })

    .get(function(req,res){
        Note.find(function(err,notes){
            if(err){res.send(err);}
            res.json(notes);
        });
    })

router.route('/notes/:note_id')
    .get(function(req,res){
        Note.findById(req.params.note_id, function (err, note) {
            if (err) { res.send(err); }
            res.json(note);
        });
    })
    .put(function(req,res){
        Note.findById(req.params.note_id, function(err,note){
            if(err){res.send(err);}
            note.title = req.body.title;
            note.body = req.body.body;

            note.save(function(err){
                if (err) { res.send(err); }
                res.json(note);
            });
        });
        // Note
        // .findById(req.params.note_id)
        // .exec()
        // .then(note => {
        //     note.title = req.body.title;
        //     note.body = req.body.body;

        //     note.save(function(err){
        //         if (err) { res.send(err); }
        //         res.json(note);
        //     });
        // })
        // .catch(err => next(err));
    })
    .delete(function(req,res){
        Note
        .findByIdAndRemove(req.params.note_id)
        .exec()
        .then(doc =>{
            if(!doc){return res.status(404).end(); }
            return res.status(204).end();
        })
        .catch(err => next(err));

    })





module.exports = router