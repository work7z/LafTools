// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 8 Feb 2024
// Author:
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

/** @type {import('next').NextConfig} */

// let API_URL = "https://api.laf-tools.com"; // TODO: api subdomain should be implemented in the future
let API_URL = "https://laf-tools.com";

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sequelize", "sequelize-typescript"],
  },
  output: "standalone",
  // output: "standalone",
  rewrites: async () => {
    return [
      {
        source: "/x-v2-api/:path*",
        destination: `${API_URL}/x-v2-api/:path*`,
      },
    ];
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
