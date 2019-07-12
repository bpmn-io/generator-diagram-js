# <%= projectName %>

[![Build Status](https://travis-ci.com/<%= githubRepository %>.svg?branch=master)](https://travis-ci.com/<%= githubRepository %>)

<%= projectDescription %>


## Usage

```javascript
import <%= serviceCls %>Module from '<%= projectName %>';

import BpmnViewer from 'bpmn-js';

const viewer = new BpmnViewer({
  additionalModules: [
    <%= serviceCls %>Module
  ]
});
```


## License

MIT
