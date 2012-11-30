var through    = require('through');
var serializer = require('stream-serializer');

function scuttlebutt(write, end) {
	var input;
	var ts = through(function(data) {
		if(Array.isArray(data)) {
			input = data;
			write.apply(outer, data.concat([ data ]));
			input = undefined;
		}
	}, end);

	var tsQueue = ts.queue;

	var outer = serializer.json(ts);
	ts.outer = outer;
	outer.inner = ts;

	outer.queue = function queue(data, update) {
		if(!update)
			update = input;

		if(update)
			tsQueue.call(ts, [ data, update[1], update[2] ]);

		return this;
	};

	return outer;
}

exports = module.exports = scuttlebutt;