/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017-2021 David Jackson
 */

import Point from '../src/point.mjs';

describe('Point', function() {
	let point;

	beforeEach(function() {
		point = new Point(3, 4);
	});

	it('has an x and y coordinate', function() {
		expect(point.x).toBe(3);
		expect(point.y).toBe(4);
	});
});
