/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

var Point = require('./point');
var Square = require('./square');

function Ant(compass, plane, point) {
	this.compass = compass;
	this.orientation = compass.north;
	this.plane = plane;
	this.position = point;
}

Ant.prototype.turnRight = function() {
	this.orientation = this.compass.nextClockwise(this.orientation);
};

Ant.prototype.turnLeft = function() {
	this.orientation = this.compass.nextCounterclockwise(this.orientation);
};

Ant.prototype.moveForward = function() {
	var x = this.position.x;
	var y = this.position.y;
	if (this.orientation === this.compass.north) {
		y++;
	} else if (this.orientation === this.compass.east) {
		x++;
	} else if (this.orientation === this.compass.south) {
		y--;
	} else {
		x--;
	}
	this.position = new Point(x, y);
};

Ant.prototype.step = function() {
	var square = this.plane.getSquare(this.position.x, this.position.y);
	if (square.colour === Square.Colour.Black) {
		this.turnRight();
	} else {
		this.turnLeft();
	}
	square.invertColour();
	this.moveForward();
};

module.exports = Ant;
