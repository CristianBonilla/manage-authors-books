# Manage autors and books

A REST API to create and get authors and books.

## Prerequesites

You will need the following things properly installed on your computer.

* [git](https://git-scm.com/)
* [node LTS](https://nodejs.org/)
* [npm](https://www.npmjs.com/)
* [yarn](https://classic.yarnpkg.com/)

### Installation

[![git](https://img.shields.io/badge/git-v2.x.x-orange.svg)](https://git-scm.com/downloads/)
[![node LTS](https://img.shields.io/badge/node%20LTS-v16.20.0-green.svg)](https://nodejs.org/en/blog/release/v16.20.0/)
[![npm package](https://img.shields.io/badge/npm%20package-v8.19.2-red.svg)](https://www.npmjs.com/package/npm/v/8.19.2/)
[![yarn](https://img.shields.io/badge/yarn-v1.22.x-blue.svg)](https://classic.yarnpkg.com/lang/en/docs/install/)

## Dependencies

* NodeJS **v16**
* TypeScript **v5**
* Mongoose **v7**
* Express **v4**

## Environment List

| Name | Description |
| :---: | :--- |
| dev | **development** environment
| pro | **production** environment

## Development server

Run `yarn run dev` for a dev server.
Navigate to `http://localhost:3000/` or `http://localhost:3001` or `http://localhost:3002`.
The application will automatically reload if you change any of the source files.

## Build

Run `yarn run build` to build the project.
The build artifacts will be stored in the `dist/` directory.

## Run recommended scripts

| Script | Description |
| :--- | :--- |
| `yarn run start` | Run the already built project from the `/dist` directory in development env |
| `yarn run start:pro` | Works same as `start` but in production env |
| `yarn run pro` | Build the project and run project in production env |
| `yarn run watch` | For each change in the files the project is built |
| `yarn run lint` | Check if the rules indicated in the project are met |
