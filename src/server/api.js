'use strict';
let Router = require('express').Router;
let mongojs = require('mongojs');
let db = mongojs('mongodb://navaneeth:navaneeth@ds139989.mlab.com:39989/mytasklist_nava', ['tasks'])


class Api {
    constructor() {
        this.router = Router();
        this.init();
    }
    init() {

        //Get All Tasks
        this.router.get('/tasks', (req, res, next) => {
            db.tasks.find((err, tasks) => {
                if (err) {
                    res.send(err);
                }
                res.json(tasks);
            })
        });

        //Get Single Task
        this.router.get('/task/:id', (req, res, next) => {
            db.tasks.findOne({
                _id: mongojs.ObjectId(req.params.id)
            }, (err, task) => {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            })
        });

        //Save Task
        this.router.post('/task', (req, res, next) => {
            var task = req.body;
            if (!task.title || !(task.isDone + '')) {
                res.status(400);
                res.json({
                    "error": "Bad Data"
                });
            } else {
                db.tasks.save(task, (err, task) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json(task);
                });
            }
        })

        //Delete Task
        this.router.delete('/task/:id', (req, res, next) => {
            db.tasks.remove({
                _id: mongojs.ObjectId(req.params.id)
            }, (err, task) => {
                if (err) {
                    res.send(err);
                }
                //console.log(task);
                res.json(task);
            })
        });

        //Update Task
        this.router.put('/task/:id', (req, res, next) => {
            var task = req.body;
            var updTask = {};

            if (task.isDone) {
                updTask.isDone = task.isDone;
            }

            if (task.title) {
                updTask.title = task.title;
            }

            if (!updTask) {
                res.status(400);
                res.json({
                    error: 'Bad Data'
                })
            } else {
                db.tasks.update({
                    _id: mongojs.ObjectId(req.params.id)
                }, updTask, {}, (err, task) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json(task);
                })
            }
        });
    }
}

module.exports = new Api().router;
