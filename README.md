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
import Vue from 'vue';
import Report from 'vue-event-report';

Vue.use(Report);
Report.setReportHandler(({ event, data }) => {
    if (event == 'click') {
        gcenter.report.reportEvent(40002, {
            extra: Object.assign(data, { pos: name })
        });
    } else if (event == 'exposure') {
        gcenter.report.reportEvent(30001, {
            extra: Object.assign(data, { pos: name })
        });
    }
})
```
##### app.vue
```javascript
<template>
  <div v-report="{ key: value }">
  </div>
</template>
```

## Development
* make sure node and npm installed;
* clone the repo to local;
* run `npm install` to install node modules;
* run `npm run build` to get an *unminified* build file at `lib` folder;