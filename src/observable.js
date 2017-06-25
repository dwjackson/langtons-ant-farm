/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

function Observable() {
	this.observers = [];
}

Observable.prototype.registerObserver = function(observer) {
	this.observers.push(observer);
};

Observable.prototype.notifyObservers = function(obj) {
    if (obj === undefined) {
        obj = this;
    }
	this.observers.forEach(function(observer) {
		observer.notify(obj);
	}, this);
};

Observable.prototype.unregisterObserver = function(observer) {
	var index = this.observers.indexOf(observer);
	if (index >= 0) {
		return this.observers.splice(index, 1)[0];
	}
	return null;
};

module.exports = Observable;
