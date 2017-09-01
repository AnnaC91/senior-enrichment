const chance = require('chance')(1337);
const Promise = require('bluebird');

const db = require('./db/index');
const { Student , Campus } = require('./db/models/index');

const data = {
    campus:[
        {name: 'Blue Waters',
        image: 'http://anime.thenexxus.org/blog/archives/2009/10/07/bscap0001.jpg'},
        {name: 'Hollow Gardens',
        image: 'http://pm1.narvii.com/6353/e4307ac05d7d2f7afcb8c6ef62b075362ddcd2f6_hq.jpg'},
        {name: 'Diamond Sky',
        image: 'http://images6.fanpop.com/image/answers/2972000/2972728_1345948332070.49res_385_300.jpg'},
        
    ],
    student: [
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
        {name: chance.name(),
        email: chance.email({domain: 'mhacademy.com'}),
        campusId: Math.floor(Math.random()*3+1)},
    ]
}

console.log(data)

db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  return Promise.map(Object.keys(data), function (name) {
    return Promise.map(data[name], function (item) {
        console.log(db.model(name))
      return db.model(name)
      .create(item)
      .then(res=>console.log(res));
    });
  });
})
.then(function () {
  console.log("Finished inserting data (press ctrl-c to exit)");
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
});