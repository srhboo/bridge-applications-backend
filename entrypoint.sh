#!/bin/bash
yarn run db:migrate:latest
yarn run db:seed
yarn start