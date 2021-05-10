/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017-2021 David Jackson
 */

import Plane from '../src/plane.mjs';
import Square from '../src/square.mjs';

describe('Plane', function() {
	var plane, width, height;

	beforeEach(function() {
		width = 40;
		height = 30;
		plane = new Plane(width, height);
	});

	it('has a width', function() {
		expect(plane.width).toBe(width);
	});
	
	it('has a height', function() {
		expect(plane.height).toBe(height);
	});

	it('can get a square at an arbitrary position', function() {
		var square = plane.getSquare(3, 4);
		var point = square.coordinate;
		expect(point.x).toBe(3);
		expect(point.y).toBe(4);
	});

	it('consists of a grid of squares', function() {
		var square;
		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				square = plane.getSquare(i, j);
				expect(square).toBeDefined();
				expect(square.coordinate.x).toBe(i);
				expect(square.coordinate.y).toBe(j);
			}
		}
	});

	describe('square', function() {
		var square;

		beforeEach(function() {
			square = plane.getSquare(0, 0);
		});

		it('has a colour -- white by default', function() {
			expect(square.colour).toBe(Square.Colour.White);
		});

		it('can invert its colour', function() {
			square.invertColour();
			expect(square.colour).toBe(Square.Colour.Black);
			square.invertColour();
			expect(square.colour).toBe(Square.Colour.White);
		});

		it('is observable', function() {
			var observer = {
				notify: function() {}
			};
			spyOn(observer, 'notify');
			square.registerObserver(observer);
			square.invertColour();
			expect(observer.notify).toHaveBeenCalledWith(square);
		});

		it('can have its colour set', function() {
			square.setColour(Square.Colour.Black);
			expect(square.colour).toBe(Square.Colour.Black);
		});
	});
});
