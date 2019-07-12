import {
  bootstrapViewer,
  inject
} from 'bpmn-js/test/helper';

import <%= serviceCls %>Module from '..';

var bpmnXML = require('./process.bpmn');


describe('<%= projectName %>', function() {

  beforeEach(bootstrapViewer(bpmnXML, {
    additionalModules: [
      <%= serviceCls %>Module
    ]
  }));


  it('serializing exporter value', inject(function(<%= serviceName %>) {

    // given

    // when

    // then

  }));

});
