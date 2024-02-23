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

import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import Head from 'next/head'
import { Props } from "next/script";
import { getWebDesc, getWebsiteName } from "./__CORE__/common/config";
import { TopNav } from "./__CORE__/containers/TopNav";
import CenterPart from "./__CORE__/containers/CenterPart";
import CardPanel from './__CORE__/components/CardPanel'
import NodeHorizontalBar from "./__CORE__/containers/TabGroupHorizontalBar";
import Footer from "./__CORE__/containers/Footer";
import Layout from './__CORE__/containers/Layout'
import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs'
import PrelintInit from './__CORE__/script/preline-init'
import { getWebsiteLocale } from "./__CORE__/utils/TranslationUtils";
import Client from "./client";
import { getAppIcon } from "./__CORE__/config/imgconfig";

// import dbconn from '.@/app/__CORE__/app/db/index'

export default async function RootLayout(props: {
  children,
}) {
  let { children } = props;
  return (
    <Layout>
      {children}
      <PrelintInit></PrelintInit>
      <Client></Client>
    </Layout>
  );
}

export async function generateMetadata(
  { }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: getWebsiteName(),
    description: getWebDesc(),
    icons: [
      getAppIcon()
    ]
  };
}