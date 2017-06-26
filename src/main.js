/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2017 David Jackson
 */

var remote = require('electron').remote;

document.addEventListener('keyup', function(ev) {
    if (ev.key === 'q') {
        var win = remote.getCurrentWindow();
        win.close();
    }
});

var LangtonsAntFarm = require('./src/langtons-ant-farm');
LangtonsAntFarm.main(5);
