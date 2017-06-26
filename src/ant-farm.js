/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

var Plane = require('./plane');
var Ant = require('./ant');
var Compass = require('./compass');
var Point = require('./point');
var Observable = require('./observable');

function AntFarm(width, height) {
    Observable.call(this);
	this.plane = new Plane(width, height);
    this.plane.forEachSquare(function(square) {
        square.registerObserver(this);
    }, this);
	this.ants = [];
}
AntFarm.prototype = Object.create(Observable.prototype);
AntFarm.prototype.constructor = AntFarm;

AntFarm.prototype.numberOfAnts = function() {
	return this.ants.length;
};

AntFarm.prototype.createAntAtPosition = function(x, y) {
	var point = new Point(x, y);
	var ant = new Ant(Compass.instance(), this.plane, point);
	this.ants.push(ant);
	return ant;
};

AntFarm.prototype.removeAnt = function(ant) {
	var index = this.ants.indexOf(ant);
	if (index >= 0) {
		this.ants.splice(index, 1);
	}
};

AntFarm.prototype.step = function() {
    var antsToRemove = [];
	this.ants.forEach(function(ant) {
		ant.step();
        if (ant.position.x < 0
            || ant.position.y < 0
            || ant.position.x >= this.plane.width
            || ant.position.y >= this.plane.height) {
            antsToRemove.push(ant);
        }
	}, this);
    antsToRemove.forEach(function(ant) {
        this.removeAnt(ant);
    }, this);
};

AntFarm.prototype.forEachAnt = function(callback, thisArg) {
	this.ants.forEach(callback, thisArg);
};

AntFarm.prototype.notify = function(obj) {
    this.notifyObservers(obj);
};

AntFarm.prototype.removeAllAnts = function() {
    this.ants = [];
};

module.exports = AntFarm;
