/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

var AntFarmPresenter = require('../src/ant-farm-presenter');
var AntFarm = require('../src/ant-farm');

describe('AntFarmPresenter', function() {
	var antFarm;
	var mockCanvas;
	var presenter;
	var sideLen;

	beforeEach(function() {
		antFarm = new AntFarm(40, 30);
		antFarm.createAntAtPosition(3, 4);
		mockCanvas = {
			square: function(x, y, width, height, colour) {
			}
		};
		sideLen = 10;
		presenter = new AntFarmPresenter(antFarm, mockCanvas, sideLen);
	});

	it('can draw the ant', function() {
		spyOn(mockCanvas, 'square');
		presenter.drawAnts();
		expect(mockCanvas.square).toHaveBeenCalled();
	});

	it('can add an ant at a clicked location', function() {
		spyOn(antFarm, 'createAntAtPosition');
		var fakeEvent = {
			offsetX: 34,
			offsetY: 49
		};
		presenter.handleClick(fakeEvent);
		expect(antFarm.createAntAtPosition)
			.toHaveBeenCalledWith(3, 4);
	});

	it('can tick time forward', function() {
		var ant = antFarm.createAntAtPosition(3, 4);
		spyOn(ant, 'step');
		spyOn(presenter, 'drawAnts');
		presenter.tick();
		expect(ant.step).toHaveBeenCalled();
		expect(presenter.drawAnts).toHaveBeenCalled();
	});

	it('can draw a square', function() {
		spyOn(mockCanvas, 'square');
		var square = antFarm.plane.getSquare(3, 4);
		square.invertColour();
		presenter.drawSquare(square);
		expect(mockCanvas.square).toHaveBeenCalledWith(
			30,
			40,
			10,
			'black'
		);
	});

    it('observes changes in the ant farm', function() {
        spyOn(presenter, 'notify').and.callThrough();
        spyOn(presenter, 'drawSquare');
        var square = antFarm.plane.getSquare(3, 4);
        square.invertColour();
        expect(presenter.notify).toHaveBeenCalled();
        expect(presenter.drawSquare).toHaveBeenCalled();
    });
});
