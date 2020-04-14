const router = require("express").Router();
const Workout = require("../models/workout");

router.get("/api/workouts", (req,res) => {
  // res.json({"hello": "hi there"})
    Workout.find()
    .then(dbWorkout => {
        console.log("HIT HERE");
        console.log("get all workouts" , dbWorkout);
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workouts", ( {body} , res) => {
    console.log("post new workout", {body});
    Workout.create({})
      .then(workout => {
        console.log(workout)
        res.json(workout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findOneAndUpdate({ _id: params.id }, {$push: {exercises: body}}, {new:true})
    .then(workout => {
      console.log("update workout", workout);
      res.json(workout)
    }).catch(err => {
      res.status(400).json(err);
    });
  });

  router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
    .then(dbWorkout => {
      console.log("get range", dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  })

  module.exports = router