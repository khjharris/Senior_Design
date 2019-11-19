# React Express Starter Kit

Created by Juan Zapata Gomez (juanzgc@bu.edu)

## Getting Started

Clone the repo to get started with the boilerplate.

## Run NPM Install

```javascript
npm install
```

## Start Development Server

```javascript
npm run dev
```

The API's will be running on port: 5000

The react application will be running on port: 3000

### Adding Proxy's

Currently the proxy is set up for routes falling under: /api

In order to add more routes go to src/setupProxy and add a new target.

## Deploying to IBM Cloud Foundry

Login to ibmcloud

```javascript
ibmcloud login --sso
```

Setup cloud foundry

```javascript
ibmcloud target cf
```

Deploy using the manifest.yml file

```javascript
ibmcloud app push <app-name>
```

## PSQL

### CLI Command

```bash
ibmcloud cdb deployment-connections swim-psql --start
```

### Enter

```bash
AccountsSwim
```
