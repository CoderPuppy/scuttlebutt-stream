var scuttlebutt = require('./');
var Model       = require('scuttlebutt/model');

var m1 = new Model();
var s1 = m1.createStream();

var m2 = new Model();
var s2 = m2.createStream();

var scs = scuttlebutt(function(data) {
	this.queue([ data[0], 'Foo' ]);
});

s1.pipe(scs).pipe(s2);

m1.set('name', 'Drew');

process.nextTick(function() {
	console.log(m1.get('name'), m2.get('name'));
});