var express = require('express');
var router = express.Router();

const Place = require('../models/places');

router.get('/test', (req, res)=>{
    res.json({result:true})
})

router.post('/places', (req, res) => {
    const newPlace = new Place({
        nickname: req.body.nickname,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    });

    console.log(newPlace)

    newPlace.save().then(() => {
        res.json({ result: true });
    });
})

router.get('/places/:nickname', (req, res) => {
    Place.find({nickname:req.params.nickname})
    .then(data => {
        console.log(data)
        const placesTab =[]

        for (let item of data){
            placesTab.push({nickname:item.nickname, name:item.name, latitude:item.latitude, longitude:item.longitude})
        }

        res.json({result:true, places:placesTab})
    })
})

router.delete('/places', (req, res) => {
    Place.deleteMany({ nickname:req.body.nickname, name:req.body.name })
    .then(data => {
        console.log(data)
        res.json({result:true})
    })
})

module.exports = router;
