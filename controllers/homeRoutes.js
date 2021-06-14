const router = require('express').Router();
const { Song, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            style: 'main.css'
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/menu', async (req, res) => {
    try{
        res.render('menu')
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            //include: [{model: }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/queue', async (req, res) => {
    try {
        res.render('queue')
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/register', async (req, res) => {
    try {
        res.render('register')
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/requests', async (req, res) => {
    try {
        res.render('requests')
    } catch (err) {
        res.status(500).json(err);
    }
});

/*router.get('/songs', async (req, res) => {
    try {
        res.render('songs', {
            style: 'songs.css'
        })
    } catch (err) {
        res.status(500).json(err);
    }
});*/

router.get('/songs', (req, res) => {
    Song.findAll({
      order: ['artist'],
    })
      .then((dbSongs) => {
        const songs = dbSongs.map((song) => song.get({plain: true}));
  
        res.render("songs", {songs});
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login', {
        style: 'style.css'
    });
});

module.exports = router;