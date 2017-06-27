/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

function AntFarmPresenter(antFarm, canvas, sideLength) {
	this.antFarm = antFarm;
	this.antFarm.registerObserver(this);
	this.canvas = canvas;
	this.sideLength = sideLength;
	this.clickMode = AntFarmPresenter.ClickMode.NewAnt;
}

AntFarmPresenter.prototype.drawAnts = function() {
	this.antFarm.forEachAnt(function(ant) {
		var x = ant.position.x;
		var y = ant.position.y;
		var square = ant.plane.getSquare(x, y);
		var canvasX = x * this.sideLength;
		var canvasY = y * this.sideLength;
		this.canvas.square(canvasX, canvasY, this.sideLength, 'red');
	}, this);
};

AntFarmPresenter.prototype.handleClick = function(ev) {
	var x = Math.floor(ev.offsetX / this.sideLength);
	var y = Math.floor(ev.offsetY / this.sideLength);
	if (this.clickMode === AntFarmPresenter.ClickMode.NewAnt) {
		if (x >= 0 && y >= 0) {
			this.antFarm.createAntAtPosition(x, y);
		}
	} else {
		var square = this.antFarm.plane.getSquare(x, y);
		square.invertColour();
	}
};

AntFarmPresenter.prototype.tick = function() {
	this.antFarm.step();
	this.drawAnts();
};

AntFarmPresenter.prototype.drawSquare = function(square) {
	var canvasX = square.coordinate.x * this.sideLength;
	var canvasY = square.coordinate.y * this.sideLength;
	var colour = square.colour.name;
	this.canvas.square(canvasX, canvasY, this.sideLength, colour);
};

AntFarmPresenter.prototype.notify = function(square) {
    this.drawSquare(square);
};

AntFarmPresenter.prototype.setClickMode = function(clickMode) {
	if (!(clickMode in AntFarmPresenter.ClickMode)) {
		throw new Error('Invalid click mode');
	}
	this.clickMode = clickMode;
};

AntFarmPresenter.ClickMode = {
	NewAnt: 'NewAnt',
	InvertSquare: 'InvertSquare'
};

module.exports = AntFarmPresenter;
