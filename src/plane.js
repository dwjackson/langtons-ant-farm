/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

var Square = require('./square');

function Plane(width, height) {
	this.width = width;
	this.height = height;
	this.grid = new Array(width);
	for (var i = 0; i < width; i++) {
		this.grid[i] = new Array(height);
		for (var j = 0; j < height; j++) {
			this.grid[i][j] = new Square(i, j);
		}
	}
}

Plane.prototype.getSquare = function(x, y) {
	return this.grid[x][y];
};

Plane.prototype.forEachSquare = function(callback, thisArg) {
    var square;
    for (var i = 0; i < this.width; i++) {
        for (var j = 0; j < this.height; j++) {
            square = this.getSquare(i, j);
            if (thisArg !== undefined) {
                callback.call(thisArg, square);
            } else {
                callback(square);
            }
        }
    }
};

module.exports = Plane;
