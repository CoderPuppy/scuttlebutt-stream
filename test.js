var scuttlebutt = require('./');
var Model       = require('scuttlebutt/model');
var ss          = require('stream-serializer');

var m1 = new Model();
var s1 = m1.createStream();

var m2 = new Model();
var s2 = m2.createStream();

s1.pipe(ss.json(scuttlebutt(function(data) {
	this.queue([ data[0], 'Foo' ]);
}))).pipe(s2);

m1.set('name', 'Drew');

process.nextTick(function() {
	console.log('m1.name:', m1.get('name'));
	console.log('m2.name:', m2.get('name'));
});