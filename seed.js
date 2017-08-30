const chance = require('chance')(1337);
const Promise = require('bluebird');

const db = require('./db/index');
const Student = require('./db/models/student');
const Campus = require('./db/models/campus')

//utility
function utility(fn,n){ //takes a function and a number
    let result=[];
    for (i=0;i<n;i++){
        result.push(fn());
    }
    return result
}

//generating campus data
const campusCount = 10;
const campusNames = chance.unique(chance.word,campusCount);
const campusImage = 'http://pm1.narvii.com/6353/e4307ac05d7d2f7afcb8c6ef62b075362ddcd2f6_hq.jpg' //random anime school campus

function randomCampus(){
    return Campus.build({
        name: campusNames.pop(),
        image: campusImage
    })
}

function generateCampuses(){
    let campuses = utility(randomCampus,campusCount)
    return campuses
}

console.log('***made campus data')

//generating student data
const studentCount = 200;
const studentNames = chance.unique(chance.name, studentCount);
const studentEmails = chance.unique(chance.email,studentCount)

function randomStudent(createdCampuses){
    let schoolid = Math.floor(Math.random(campusCount)) //chance.pick(createdCampuses)
    return Student.build({
        name: studentNames.pop(),
        email: studentEmails.pop(),
        campusId: schoolid
    })
}

function generateStudents(){
    let students = utility(randomStudent, studentCount)
    return students
}

console.log('***made student data')

//seeding stuff

function createCampuses () {
  return Promise.map(generateCampuses(), function (campus) {
    return campus.save();
  });
}

function createStudents (createdCampuses) {
  return Promise.map(generateStudents(createdCampuses), function (student) {
    return student.save();
  });
}

console.log('***saved stuff')

function seed () {
  return createCampuses()
  .then(function (createCampuses) {
    return createStudents(createCampuses);
  });
}

console.log('Syncing database');

db.sync({force: true})
.then(function () {
  console.log('Seeding database');
  return seed();
})
.then(function () {
  console.log('Seeding successful');
}, function (err) {
  console.error('Error while seeding');
  console.error(err.stack);
})
.finally(function () {
  db.close();
  return null;
});