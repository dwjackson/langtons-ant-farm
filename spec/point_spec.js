/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

var Point = require('../src/point');

describe('Point', function() {
	var point;

	beforeEach(function() {
		point = new Point(3, 4);
	});

	it('has an x and y coordinate', function() {
		expect(point.x).toBe(3);
		expect(point.y).toBe(4);
	});

	it('is immutable', function() {
		point.x = 999;
		expect(point.x).toBe(3);
	});
});
