/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

var Observable = require('../src/observable');

describe('Observable', function() {
	var observable, observer;
	
	beforeEach(function() {
		observable = new ConcreteObservable(42);
		observer = {
			notify: function() {}
		};
		observable.registerObserver(observer);
		spyOn(observer, 'notify');
	});

	it('notifies its observers upon a value change', function() {
		observable.setValue(123);
		observable.notifyObservers();
		expect(observer.notify).toHaveBeenCalledWith(observable);
	});

	it('can remove an observer', function() {
		var o = observable.unregisterObserver(observer);
		expect(o).toBe(observer);
		observable.setValue(123);
		observable.notifyObservers();
		expect(observer.notify).not.toHaveBeenCalled();
	});
});

function ConcreteObservable(value) {
	Observable.call(this);
	this.value = value;
}
ConcreteObservable.prototype = Object.create(Observable.prototype);
ConcreteObservable.prototype.constructor = ConcreteObservable;

ConcreteObservable.prototype.setValue = function(value) {
	this.value = value;
};
