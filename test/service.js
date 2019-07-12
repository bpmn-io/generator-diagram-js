'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-diagram-js:service', () => {
  before(() => {
    return helpers
      .run(path.join(__dirname, '../generators/service'))
      .withPrompts({
        serviceName: 'Foo',
        serviceLocation: '.'
      });
  });

  it('creates files', () => {
    assert.file(['Foo.js', 'index.js']);

    assert.fileContent([
      ['Foo.js', /export default function Foo\(eventBus\)/],
      ['index.js', /import Foo from '\.\/Foo';/]
    ]);
  });
});
