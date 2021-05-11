/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017-2021 David Jackson
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		resizable: false,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});

	win.setMenu(null);

	win.loadFile('index.html');
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === null) {
			createWindow();
		}
	});
});

app.on('window-all-closed', function() {
	if (process.paltform !== 'darwin') {
		app.quit();
	}
});
