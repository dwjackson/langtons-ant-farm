/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017-2021 David Jackson
 */

import Point from './point.mjs';
import Observable from './observable.mjs';

function Colour(name) {
	this.name = name;
	Object.freeze(this);
}

function Square(x, y) {
	Observable.call(this);
	this.coordinate = new Point(x, y);
	this.colour = Square.Colour.White;
}
Square.prototype = Object.create(Observable.prototype);
Square.prototype.constructor = Square;

Square.prototype.invertColour = function() {
	if (this.colour === Square.Colour.White) {
		this.colour = Square.Colour.Black;
	} else {
		this.colour = Square.Colour.White;
	}
	this.notifyObservers();
};

Square.prototype.htmlColour = function() {
	return this.colour.name;
};

Square.prototype.setColour = function(colour) {
    this.colour = colour;
    this.notifyObservers();
};

Square.Colour = {
	White: new Colour('white'),
	Black: new Colour('black')
};

export default Square;
