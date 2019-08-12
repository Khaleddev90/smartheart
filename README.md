# HeartFace Web

This repositiry belogns to Heartface app

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Git

Yarn/npm

### Installing

Please clone and/or download this repo. After install all the dependencies:

```
yarn install
```
or
```
npm install
```

End with an example of getting some data out of the system or using it for a little demo

## Running the app

To run the app just run

```
yarn start
```

### Build and upload to staging environment

```bash
docker run --rm -ti  -v `pwd`:/workdir -w /workdir -eREACT_APP_API_HOST=https://dev.heartface.tv node:8 yarn run build
rsync -avc build/ dev.heartface.tv:/var/www/heartface/
```

### Build and upload to production environment
```bash
docker run --rm -ti  -v `pwd`:/workdir -w /workdir -eREACT_APP_API_HOST=https://heartface.tv node:8 yarn run build
rsync -avc build/ prod.heartface.tv:/var/www/heartface/
```
