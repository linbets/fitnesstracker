const router = require('express').Router();
const Workout = require('../models/workout');

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ]).then((workouts) => {
        res.json(workouts);
    });
});

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ]).sort({_id: -1}).limit(7).then((workouts) => {
        res.json(workouts);
    });
});

router.post('/api/workouts/range', (req, res) => {
    Workout.create(req.body).then((workouts) => {
        res.json(workouts);
    });
});

router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, {
        $push: {exercises: req.body}
    }).then((workouts) => {
        res.json(workouts);
    });
});


module.exports = router;
