#!/bin/bash

echo "===================================="
echo "== SH: Installation Script =="
echo "===================================="

if ! command -v node &> /dev/null
then
    echo "[ERROR] Node.js not found. Please install Node.js first."
    exit 1
fi
if ! command -v npm &> /dev/null
then
    echo "[ERROR] npm (Node Package Manager) not found. Please check your Node.js installation."
    exit 1
fi

echo "[INFO] Installing external Node.js modules: hpack, axios, set-cookie-parser, colors, random-useragent"

npm install hpack axios set-cookie-parser colors random-useragent

if [ $? -ne 0 ]; then
    echo "[ERROR] Module installation failed."
    exit 1
fi

echo "[SUCCESS] Module installation complete. You are ready to run the tools."