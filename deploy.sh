#!/bin/sh
set -e
cd /srv/apps/app3
git pull
npm ci
npm run build