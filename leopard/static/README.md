# README #

### What is this repository for? ###

* Quick summary

This repository holds the source code and tools required for the Xenio Data Visualization front-end.

### Installation and Testing
```bash
# Redis server should be running and data already ingested
yarn install # To install dependencies
yarn watch # For development build. Go to http://localhost:8000/static/index.html
yarn prod:build # For production build. Go to http://localhost:8000/static/index.html
yarn prod:analyze # For analyzing production bundle size. Script will automatically open http://127.0.0.1:8888/
yarn lint # For linting code format
yarn flow # For linting types 
```

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* John Tran
* Raul Gonzalez
* Conover Wang
* Iberth Fernandez

## File Hierarchy and React Component Descriptions
- `index.html` and `dist/js/bundle.js` is what is served by the Python back-end. `bundle.js` contains the webpack output of npm dependencies and React code.
- `index.jsx`: Entry point of React code
    - `App.jsx`: Wrapper for entire app
        - `HomePage.jsx`: Homepage of the app
            - `DataVisualizer.jsx`: Container/parent for all data visualization related components.Requester of redis data and passes this data to child components. The type of charts was taken from Xenio's Tableau workbook
                - `<VisitsOverTimeChart />`: Line chart displaying the amount of visitors over a given period of time. Uses Victory
                - `<BarChart />`: Bar chart displaying unique visitors by date. Uses Victory
                - `<Table />`: Table. Uses react-virtualzied

## Libraries (All are FOSS)
- [Flow](https://flow.org/en/docs/): Type checker by facebook. Assists during linting
- [Jest](https://facebook.github.io/jest/docs/en/getting-started.html): Testing library by Facebook. Will be used for unit tests
- [Victory](https://formidable.com/open-source/victory/docs/): d3-derived charts and graph visualization library
- [react-virtualized](https://github.com/bvaughn/react-virtualized/tree/master/docs#documentation): React component library for rendering tabular data
