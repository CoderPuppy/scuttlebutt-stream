var through = require('through');

function scuttlebutt(write, end) {
	var input;
	var ts = through(function(data) {
		if(Array.isArray(data)) {
			input = data;
			write.apply(ts, data.concat([ data ]));
			input = undefined;
		}
	}, end);

	var tsQueue = ts.queue;

	ts.queue = function queue(data, update) {
		if(!update)
			update = input;

		if(update)
			tsQueue.call(ts, [ data, update[1], update[2] ]);

		return this;
	};

	return ts;
}

exports = module.exports = scuttlebutt;