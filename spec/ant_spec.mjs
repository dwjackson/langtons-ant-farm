/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017-2021 David Jackson
 */

import Ant from '../src/ant.mjs';
import * as Compass from '../src/compass.mjs';
import Point from '../src/point.mjs';
import Plane from '../src/plane.mjs';
import Square from '../src/square.mjs';

describe('Ant', function() {
	let compass;
	let ant;
	let initialPosition;

	beforeEach(function() {
		compass = Compass.instance();
		let plane = new Plane(40, 30);
		initialPosition = new Point(0, 0);
		ant = new Ant(compass, plane, initialPosition);
	});

	it('faces north by default', function() {
		expect(ant.orientation).toBe(compass.north);
	});

	it('starts at position (0, 0) by default', function() {
		expect(ant.position).toEqual(initialPosition);
	});

	it('can turn right', function() {
		ant.turnRight();
		expect(ant.orientation).toBe(compass.east);
	});

	it('can turn left', function() {
		ant.turnLeft();
	});

	describe('movement', function() {
		it('can move forwrd "northward"', function() {
			ant.moveForward();
			var p = new Point(0, 1);
			expect(ant.position).toEqual(p);
		});
		it('can move forward "eastward"', function() {
			ant.turnRight();
			ant.moveForward();
			var p = new Point(1, 0);
			expect(ant.position).toEqual(p);
		});
		it('can move forward "southward"', function() {
			ant.moveForward();
			ant.turnRight();
			ant.turnRight();
			ant.moveForward();
			var p = new Point(0, 0);
			expect(ant.position).toEqual(p);
		});
		it('can move forward "westward"', function() {
			ant.turnRight();
			ant.moveForward();
			ant.turnLeft();
			ant.turnLeft();
			ant.moveForward();
			var p = new Point(0, 0);
			expect(ant.position).toEqual(p);
		});
	});

	describe('steps', function() {
		var square;

		beforeEach(function() {
			var plane = new Plane(40, 30);
			ant = new Ant(compass, plane, new Point(3, 4));
			square = plane.getSquare(3, 4);
		});

		it('can be given an initial position', function() {
			expect(ant.position.x).toBe(3);
			expect(ant.position.y).toBe(4);
		});

		describe('a black square', function() {
			beforeEach(function() {
				square.invertColour();
				expect(square.colour).toBe(Square.Colour.Black);
				ant.step();
			});

			it('turns right', function() {
				expect(ant.orientation).toBe(compass.east);
			});

			it('flips the colour of the square', function() {
				expect(square.colour).toBe(Square.Colour.White);
			});

			it('moves forward one unit', function() {
				var p = new Point(4, 4);
				expect(ant.position).toEqual(p);
			});
		});

		describe('a white square', function() {
			beforeEach(function() {
				expect(square.colour).toBe(Square.Colour.White);
				ant.step();
			});

			it('turns left', function() {
				expect(ant.orientation).toBe(compass.west);
			});

			it('flips the colour of the square', function() {
				expect(square.colour).toBe(Square.Colour.Black);
			});

			it('moves forward one unit', function() {
				var p = new Point(2, 4);
				expect(ant.position).toEqual(p);
			});
		});
	});
});
