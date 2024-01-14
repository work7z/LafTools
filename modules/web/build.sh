#!/bin/bash
export NODE_OPTIONS=--max-old-space-size=32768 
tsc 
vite build