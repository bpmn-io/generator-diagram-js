'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-diagram-js:project-files', () => {

  before(() => {
    return helpers
      .run(path.join(__dirname, '../generators/project-files'))
      .withOptions({
        projectName: '@foo/bar',
        projectDescription: 'YUP!',
        githubRepository: 'foo/bar',
        authorName: 'Walt',
        authorUrl: 'http://wa.lt',
        serviceCls: 'Foo',
        serviceName: 'foo'
      });
  });


  it('creates files', () => {
    assert.file([
      'README.md',
      'package.json'
    ]);

    assert.fileContent([
      ['README.md', /# @foo\/bar/],
      ['package.json', /"name": "@foo\/bar",/]
    ]);
  });

});
