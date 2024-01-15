// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 14 Jan 2024
// Author: Ryan Laf <get>
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
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

import sm from "sitemap";
import OperationConfig from "../../core/config/OperationConfig.json" assert {type: "json"};


/**
 * Generates an XML sitemap for all CyberChef operations and a number of recipes.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

const smStream = new sm.SitemapStream({
    hostname: "https://gchq.github.io/CyberChef",
});

smStream.write({
    url: "/",
    changefreq: "weekly",
    priority: 1.0
});

for (const op in OperationConfig) {
    smStream.write({
        url: `/?op=${encodeURIComponent(op)}`,
        changeFreq: "yearly",
        priority: 0.5
    });
}
smStream.end();

sm.streamToPromise(smStream).then(
    buffer => console.log(buffer.toString()) // eslint-disable-line no-console
);
