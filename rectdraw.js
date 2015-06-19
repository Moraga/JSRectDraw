var w = {};

// base width and height
w.size = 120;

// rectangles
w.rect = [
	[2, 2],
	[2, 1],
	[1, 2]
];

// some area
w.area = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

// left area max repetition
w.rept = 3;

w.rows = w.area.length;
w.cols = w.area[0].length;
w.area = Math.pow(10, w.rows * w.cols);
w.opts = w.rect.map(function() {return [];});

// for debug
var re = new RegExp('(\\d{'+ w.cols +'})', 'g');

// cache possibilities
for (var i = 0, j, k, zero = '0'.repeat(w.cols); i < w.rect.length; i++)
	for (k = 0; k < w.cols; k++)
		for (j = 0; j < w.rows; j++)
			if (w.cols - k >= w.rect[i][0] && w.rows - j >= w.rect[i][1])
				w.opts[i].push(parseInt(
					('0'.repeat(k) + '1'.repeat(w.rect[i][0]) + '0'.repeat(w.cols - k - w.rect[i][0]))
						.repeat(w.rect[i][1])
					+ zero.repeat(w.rows - j - w.rect[i][1])));

w.draw = function(list) {
	for (var area = this.area, opts, rect, topp = 0, left = 0, i = 0, j, k; i < list.length; i++) {
		for (opts = [], j = 0; j < this.opts.length; j++)
			for (k = 0; k < this.opts[j].length; k++)
				if ((this.opts[j][k] + area).toString().indexOf('2') == -1) {
					opts.push([this.opts[j][k], j]);
					break;
				}
		
		if (opts.length) {
			rect = opts[Math.floor(Math.random() * opts.length)];
			area += rect[0];
			this.echo(i + 1, [rect[0], w.rect[rect[1]]], topp, left);
		}
		else {
			area = this.area;
			left += this.cols;
			if (left == this.cols * this.rept) {
				left = 0;
				topp += this.rows;
			}
			i--;
		}
	}
};

w.echo = function(i, rect, topp, left) {
	var div = document.createElement('div'),
		len = rect[0].toString().length;
	div.style.width = this.size * rect[1][0] + 'px';
	div.style.height = this.size * rect[1][1] + 'px';
	div.style.top = (Math.floor((this.rows * this.cols - len) / this.cols) + topp) * this.size + 'px';
	div.style.left = (this.cols  - (len % this.cols || this.cols) + left) * this.size + 'px';
	div.innerHTML = i + ')<br/>' + ('0'.repeat(this.rows * this.cols - len) + rect[0]).replace(re, '$1<br>');
	document.body.appendChild(div);
};