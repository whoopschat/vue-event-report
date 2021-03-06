# vue-event-report
> vue event report component


## Getting started
* make sure node and npm installed;

### Install
```
> npm install vue-event-report
```

### Usage
##### main.js
```javascript
import vue from 'vue';
import vue_event_report from 'vue-event-report';

// install
vue.use(vue_event_report);
// set report handler
vue_event_report.setReportHandler(({ event, data }) => {
    if (event == 'click') {
        // click event
    } else if (event == 'exposure') {
        // exposure event
    }
})
```
##### app.vue
```javascript
<template>
  <div>
    <div v-report="{ key: value }">
    </div>
    <div v-report:click="{ key: value }">
    </div>
    <div v-report:exposure="{ key: value }">
    </div>
  </div>
</template>
```

## Development
* make sure node and npm installed;
* clone the repo to local;
* run `npm install` to install node modules;
* run `npm run build` to get an *unminified* build file at `lib` folder;