const express = require('express');

const router = express.Router();
const cors = require('cors');
require('./../database/mongoose');
const { OAuth2Client } = require('google-auth-library');
const User = require('./../models/userschema');
const Note = require('./../models/noteschema');

const client = new OAuth2Client(
  '1090448541256-p94hg4259rj6fmcvolkc90fte0he5sgd.apps.googleusercontent.com'
);

// router.get('/', cors(), (req, res) => {
//   res.redirect('/app');
//   // res.send('user');
// });

//create user
router.post('/user/:tokenid', cors(), async (req, res) => {
  const idToken = req.params.tokenid;
  const ticket = await client.verifyIdToken({
    idToken,
    audience: '1090448541256-p94hg4259rj6fmcvolkc90fte0he5sgd.apps.googleusercontent.com',
  });
  const { name, email } = ticket.getPayload();

  User.findOne({ email: email }).then((response) => {
    if (response) {
      return res.send(response._id);
    }
    const user = new User({ email, name });
    user.save((err, user) => {
      res.send(user._id);
    });
  });
});

//create note
router.post('/note', cors(), (req, res) => {
  res.json(req.body);
  const { userid, title, note, status, label, image } = req.body;
  const notes = new Note({ userid, title, note, status, label, image });
  notes
    .save()
    .then(() => {
      console.log('Note Saved!!!');
    })
    .catch(() => {
      console.log('Note saving failed!!');
    });
});

//get notes of a particular user
router.get('/note/:userid/:status', cors(), (req, res) => {
  Note.find({
    $and: [
      { userid: req.params.userid },
      { $or: [{ label: req.params.status }, { status: req.params.status }] },
    ],
  })
    .sort({ createdAt: -1 })
    .exec((error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.send(data);
      }
    });
});

//get a particular note
router.get('/onenote/:userid/:noteid', cors(), (req, res) => {
  Note.find({ userid: req.params.userid } && { _id: req.params.noteid })
    .sort({ createdAt: -1 })
    .exec((error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.send(data);
      }
    });
});

//get labels of a particular user
router.get('/label/:userid', cors(), (req, res) => {
  Note.find({ userid: req.params.userid })
    .sort({ createdAt: -1 })
    .exec((error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.send(data.map((d) => d.label));
      }
    });
});

//delete a particular note of a particular user
router.delete('/note/:noteid', cors(), (req, res) => {
  Note.deleteMany({ _id: req.params.noteid }, function (err, results) {
    res.send(results);
  });
});

//update a particular note
router.put('/note/:noteid', cors(), (req, res) => {
  Note.updateMany({ _id: req.params.noteid }, req.body, function (err, results) {
    res.send(results);
  });
});

module.exports = router;
