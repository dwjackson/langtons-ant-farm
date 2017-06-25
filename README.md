<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->

<!--
Copyright (c) 2017 David Jackson
-->

# Langton's Ant Farm

## Building & Running

To install all dependencies and build Langton's Ant Farm, run:

```sh
npm install
```

It can be run with:

```sh
npm start
```

To create a standalone executable, see [Electron's distribution documentation](https://electron.atom.io/docs/tutorial/application-distribution/).

## Usage

* Click on the screen to add an ant at that location
* Press `s` to stop/start the progression of time
* Press `r` to reset (i.e. remove all ants)
* Press `t` to advance time by a single tick (this will also "stop time")
* Press `q` to quit

## About Langton's Ant

[Langton's Ant](https://en.wikipedia.org/wiki/Langton%27s_ant) is a cellular
automaton (and universal Turing machine) with interesting emergent behaviour.

* It consists of a 2D plane of squares which can be coloured either black or
  white
* One of the squres is designated as "the ant" (which is coloured red here)
* If the ant is on a black square, it inverts the colour of the square under it,
  turns right (90 degrees), and moves forward a single square/unit
* If the ant is on a white square, it inverts the colour of the square under it,
  turns left (90 degrees), and moves forward a single square/unit

## License

Copyright (c) 2017 David Jackson

Langton's Ant Farm is licensed under the
[MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/).
