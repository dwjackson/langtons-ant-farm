/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

function Direction(name) {
	this.name = name;
}

function Compass() {
	this.north = new Direction('North');
	this.east = new Direction('East');
	this.south = new Direction('South');
	this.west = new Direction('West');
	this.directions = [
		this.north,
		this.east,
		this.south,
		this.west
	];
	Object.freeze(this);
}

Compass.prototype.nextClockwise = function(dir) {
	var index = this.directions.indexOf(dir) + 1;
	return this.directions[index % this.directions.length];
};

Compass.prototype.nextCounterclockwise = function(dir) {
	var index = this.directions.indexOf(dir) - 1;
	index = (index < 0) ? this.directions.length - 1 : index;
	return this.directions[index];
};

var _instance = null;
exports.instance = function() {
	if (_instance === null) {
		_instance = new Compass();
	}
	return _instance;
};
