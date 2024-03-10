// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/**
 * @author George O [georgeomnet+cyberchef@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import Utils from "../Utils.mjs";

/**
 * Index of Coincidence operation
 */
class IndexOfCoincidence extends Operation {
  /**
   * IndexOfCoincidence constructor
   */
  constructor() {
    super();

    this.name = "Index of Coincidence";
    this.module = "Default";
    this.description =
      "Index of Coincidence (IC) is the probability of two randomly selected characters being the same. This can be used to determine whether text is readable or random, with English text having an IC of around 0.066. IC can therefore be a sound method to automate frequency analysis.";
    this.infoURL = "https://wikipedia.org/wiki/Index_of_coincidence";
    this.inputType = "string";
    this.outputType = "number";
    this.presentType = "html";
    this.args = [];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {number}
   */
  run(input, args) {
    const text = input.toLowerCase().replace(/[^a-z]/g, ""),
      frequencies = new Array(26).fill(0),
      alphabet = Utils.expandAlphRange("a-z");
    let coincidence = 0.0,
      density = 0.0,
      result = 0.0,
      i;

    for (i = 0; i < alphabet.length; i++) {
      frequencies[i] = text.count(alphabet[i]);
    }

    for (i = 0; i < frequencies.length; i++) {
      coincidence += frequencies[i] * (frequencies[i] - 1);
    }

    density = frequencies.sum();

    // Ensure that we don't divide by 0
    if (density < 2) density = 2;

    result = coincidence / (density * (density - 1));

    return result;
  }

  /**
   * Displays the IC as a scale bar for web apps.
   *
   * @param {number} ic
   * @returns {html}
   */
  present(ic) {
    return `Index of Coincidence: ${ic}
Normalized: ${ic * 26}
<br><canvas id='chart-area'></canvas><br>
- 0 represents complete randomness (all characters are unique), whereas 1 represents no randomness (all characters are identical).
- English text generally has an IC of between 0.67 to 0.78.
- 'Random' text is determined by the probability that each letter occurs the same number of times as another.

The graph shows the IC of the input data. A low IC generally means that the text is random, compressed or encrypted.

<script type='application/javascript'>
  var canvas = document.getElementById("chart-area"),
      parentRect = canvas.closest(".cm-scroller").getBoundingClientRect(),
      ic = ${ic};

  canvas.width = parentRect.width * 0.95;
  canvas.height = parentRect.height * 0.25;

  ic = ic > 0.25 ? 0.25 : ic;

  CanvasComponents.drawScaleBar(canvas, ic, 0.25, [
    {
      label: "English text",
      min: 0.05,
      max: 0.08
    },
    {
      label: "> 0.25",
      min: 0.24,
      max: 0.25
    }
  ]);
</script>
     `;
  }
}

export default IndexOfCoincidence;
