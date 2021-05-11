/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017-2021 David Jackson
 */

import AntFarm from '../src/ant-farm.mjs';

describe('AntFarm', function() {
	var antFarm;

	beforeEach(function() {
		antFarm = new AntFarm(40, 30);
	});

	it('can be created with a given set of dimensions', function() {
		expect(antFarm.plane.width).toBe(40);
		expect(antFarm.plane.height).toBe(30);
	});

	it('starts out with no ants', function() {
		expect(antFarm.numberOfAnts()).toBe(0);
	});

	describe('ants', function() {
		var ant, x, y;
		
		beforeEach(function() {
			x = 3;
			y = 4;
			ant = antFarm.createAntAtPosition(x, y);
		});

		it('can create and add an ant to itself', function() {
			expect(antFarm.numberOfAnts()).toBe(1);
			expect(ant.position.x).toBe(x);
			expect(ant.position.y).toBe(y);
		});

		it('can remove an ant', function() {
			antFarm.removeAnt(ant);
			expect(antFarm.numberOfAnts()).toBe(0);
		});

		it('can cause all of its ants to perform a step', function() {
			antFarm.step();
			expect(ant.position.x).toBe(x - 1);
		});
	});

    it('observes changes in the plane', function() {
        spyOn(antFarm, 'notify');
        var plane = antFarm.plane;
        var square = plane.getSquare(3, 4);
        square.invertColour();
        expect(antFarm.notify).toHaveBeenCalledWith(square);
    });

    it('removes ants that move outside of the bounds of the plane', function() {
        var ant = antFarm.createAntAtPosition(0,0);
        expect(antFarm.numberOfAnts()).toBe(1);
        antFarm.step();
        expect(ant.position.x).toBe(-1);
        expect(antFarm.numberOfAnts()).toBe(0);
    });

    it('can delete all ants', function() {
        antFarm.createAntAtPosition(0, 0);
        antFarm.createAntAtPosition(0, 1);
        antFarm.createAntAtPosition(0, 2);
        expect(antFarm.numberOfAnts()).toBe(3);
        antFarm.removeAllAnts();
        expect(antFarm.numberOfAnts()).toBe(0);
    });
});
