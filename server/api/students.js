'use strict'
const router = require('express').Router()
const Student = require('../../db/models/student')

router.get('/',function(req,res,next){
    Student.findAll()
        .then(students=>res.json(students))
        .catch(next)
});

router.get('/:id',function(req,res,next){
    const studentId = req.params.id
    Student.findAll({
        where: {
            id: studentId
        }
    })
        .then(students=>res.json(students))
        .catch(next)
});

router.post('/',function(req,res,next){
    Student.create(req.body)
        .then(student=>res.json(student))
        .catch(next)
});

router.put('/:id',function(req,res,next){
    const studentId = req.params.id
    Student.update(req.body, {
        where: {
            id: studentId
        }
    })
        .then(() => {
            return Student.findOne({
                where: {
                    id: studentId
                }
            })
        })
        .then(student=>res.json(student))
        .catch(next)
});
    
router.delete('/:id',function(req,res,next){
    const studentId = req.params.id
    Student.destroy({
        where: {
            id: studentId
        }
    })
        .then(()=>res.status(204).end())
        .catch(next)
});

module.exports = router;