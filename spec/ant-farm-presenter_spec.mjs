/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017-2021 David Jackson
 */

import AntFarmPresenter from '../src/ant-farm-presenter.mjs';
import AntFarm from '../src/ant-farm.mjs';
import Square from '../src/square.mjs';

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

	it('ignores negative x offset', function() {
		spyOn(antFarm, 'createAntAtPosition');
		var fakeEvent = {
			offsetX: -1,
			offsetY: 49
		};
		presenter.handleClick(fakeEvent);
		expect(antFarm.createAntAtPosition).not.toHaveBeenCalled();
	});

	it('ignores negative y offset', function() {
		spyOn(antFarm, 'createAntAtPosition');
		var fakeEvent = {
			offsetX: 34,
			offsetY: -1
		};
		presenter.handleClick(fakeEvent);
		expect(antFarm.createAntAtPosition).not.toHaveBeenCalled();
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

	it('can switch clicking to flip square colour', function() {
		presenter.setClickMode(AntFarmPresenter.ClickMode.InvertSquare);
		var fakeEvent = {
			offsetX: 34,
			offsetY: 49
		};
		presenter.handleClick(fakeEvent);
		var square = antFarm.plane.getSquare(3, 4);
		expect(square.colour).toBe(Square.Colour.Black);
	});
});
