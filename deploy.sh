#!/bin/sh
set -e
cd /apps/gethubbers
git pull
npm ci
npm run build