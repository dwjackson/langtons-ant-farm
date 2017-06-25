/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

var Compass = require('../src/compass');

describe('Compass', function() {
	var compass;

	beforeEach(function() {
		compass = Compass.instance();
	});

	describe('cardinal directions', function() {
		it('has north', function() {
			expect(compass.north).toBeDefined();
		});
		it('has east', function() {
			expect(compass.east).toBeDefined();
		});
		it('has south', function() {
			expect(compass.south).toBeDefined();
		});
		it('has west', function() {
			expect(compass.west).toBeDefined();
		});
	});

	describe('direction', function() {
		it('finds the "next" direction clockwise', function() {
			var directions = [
				compass.east,
				compass.south,
				compass.west,
				compass.north
			];
			var dir = compass.north;
			directions.forEach(function(cardinalDirection) {
				dir = compass.nextClockwise(dir);
				expect(dir).toBe(cardinalDirection);
			});
		});

		it('finds the "next" direction counterclockwise', function() {
			var directions = [
				compass.west,
				compass.south,
				compass.east,
				compass.north
			];
			var dir = compass.north;
			directions.forEach(function(cardinalDirection) {
				dir = compass.nextCounterclockwise(dir);
				expect(dir).toBe(cardinalDirection);
			});
		});
	});

	it('is immutable', function() {
		compass.north = null;
		expect(compass.north).not.toBe(null);
	});
});
