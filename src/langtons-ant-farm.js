/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

var Canvas = require('./canvas');
var AntFarm = require('./ant-farm');
var AntFarmPresenter = require('./ant-farm-presenter');
var Square = require('./square');

function LangtonsAntFarm(sideLength) {
    var canvasElement = document.getElementById('canvas');
    this.canvas = new Canvas(canvasElement);
    var squareSideLength = sideLength;
    this.width = canvasElement.width / squareSideLength;
    this.height = canvasElement.height / squareSideLength;
    this.antFarm = new AntFarm(this.width, this.height);
    var antFarmPresenter = new AntFarmPresenter(
        this.antFarm,
        this.canvas,
        squareSideLength
    );
    this.antFarmPresenter = antFarmPresenter;

    canvasElement.addEventListener('click', function(ev) {
        antFarmPresenter.handleClick(ev);
        antFarmPresenter.drawAnts();
    });

    window.addEventListener('keypress', function(ev) {
        if (ev.key === 's') {
            if (this.isRunning) {
                this.stop();
            } else {
                this.start();
            }
        } else if (ev.key === 'r') {
            this.reset();
        } else if (ev.key === 't') {
		if (this.isRunning) {
			this.stop();
		}
		this.tick();
	}
    }.bind(this));

    this.tickTimeInMillis = 50;
    this.interval = null;
    this.isRunning = false;
}

LangtonsAntFarm.prototype.start = function() {
    this.isRunning = true;
    this.interval = setInterval(function() {
        this.tick();
    }.bind(this), this.tickTimeInMillis);
};

LangtonsAntFarm.prototype.tick = function() {
        this.antFarmPresenter.tick();
};

LangtonsAntFarm.prototype.stop = function() {
    clearInterval(this.interval);
    this.interval = null;
    this.isRunning = false;
};

LangtonsAntFarm.prototype.reset = function() {
    this.antFarm.removeAllAnts();
    this.antFarm.plane.forEachSquare(function(square) {
        square.setColour(Square.Colour.White);
    });
    if (!this.isRunning) {
        this.start();
    }
};

function main(squareSideLength) {
    var langtonsAntFarm = new LangtonsAntFarm(squareSideLength);
    langtonsAntFarm.start();
}

exports.main = main;
