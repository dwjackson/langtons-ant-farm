/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

function Canvas(canvasElem) {
	this.context = canvasElem.getContext('2d');
}

Canvas.prototype.square = function(x, y, sideLength, colour) {
    this.rectangle(x, y, sideLength, sideLength, colour);
};

Canvas.prototype.rectangle = function(x, y, width, height, colour) {
	this.context.fillStyle = colour;
	this.context.fillRect(x, y, width, height);
};

module.exports = Canvas;
