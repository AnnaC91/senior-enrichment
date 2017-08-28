'use strict'
const router = require('express').Router()
const Campus = require('../../db/models/campus')

router.get('/', function (req, res, next) {
    Campus.findAll()
        .then(campuses => res.json(campuses))
        .catch(next)
});

router.get('/:id', function (req, res, next) {
    const campusId = req.params.id
    Campus.findAll({
        where: {
            id: campusId
        }
    })
        .then(campuses => res.json(campuses))
        .catch(next)
});

router.post('/', function (req, res, next) {
    Campus.create(req.body)
        .then(campus => res.json(campus))
        .catch(next)
});

router.put('/:id', function (req, res, next) {
    const campusId = req.params.id
    Campus.update(req.body, {
        where: {
            id: campusId
        }
    })
        .then(() => {
            return Campus.findOne({
                where: {
                    id: campusId
                }
            })
        })
        .then(campus => res.json(campus))
        .catch(next)
});

router.delete('/:id', function (req, res, next) {
    const campusId = req.params.id
    Campus.destroy({
        where: {
            id: campusId
        }
    })
        .then(() => res.status(204).end())
        .catch(next)
});

module.exports = router;