var levelup = require('levelup');
var leveldown = require('leveldown');
var encode = require('encoding-down');
var sub = require('subleveldown');
var levelQuery = require('level-queryengine');
var jsonqueryEngine = require('jsonquery-engine');
var fulltextengine = require('fulltext-engine');
var pairs = require('pairs');

const db = levelQuery(levelup(encode(leveldown("ushin-data"), { valueEncoding: "json" })));    
const authorURL = sub(db, "author-url");
const authorData = sub(db, "author-data");
const messages = sub(db, "messages");
const points = sub(db, "points");

db.query.use(jsonqueryEngine());
db.ensureIndex("*", "pairs", pairs.index);

db.put('hello', { id: 1, name: 'bob' }, function (err) {
  if (err) throw err;
//  db.get("hello", function (err, data) {
//    console.log(data);
//  })
db.query({ $and: [{ id: 1}, { name: 'bob' }]})
    .on("data", console.log);
})

//messages.query.use(jsonqueryengine());
//db.ensureIndex("*", "pairs", pairs.index);
//
//messages.put("message1", {
//  messageId: "message1",
//  authorId: "author1",
//  points: {
//    facts: [],
//    thoughts: [],
//    feelings: [],
//    needs: [],
//    topics: ["pointId1", "pointId6"],
//    actions: ["pointId2", "pointId3", "pointId4", "pointId5", "pointId7"],
//    people: []
//  },
//  focus: "pointId1",
//  main: "pointId5",
//  timeStamp: "2020-09-03T07:02:45.964Z",
//}, function (err) {
//  if (err) throw err;
//  db.query({ 
//$and: [ { authorId: "author1" } ]
//  })
//});
//
//
