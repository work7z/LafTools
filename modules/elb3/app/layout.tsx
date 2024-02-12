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
// import dbconn from '.../__CORE__/app/db/index'

export default async function RootLayout(props: {
  children,
}) {
  // let a=  await dbconn()

  let { children } = props;
  return (
    <Layout>
      {children}
    <PrelintInit></PrelintInit>
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
      "icon6.png"
    ]
  };
}