'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-diagram-js:project', () => {

  before(() => {
    return helpers
      .run(path.join(__dirname, '../generators/project'))
      .withPrompts({
        projectName: '@foo/bar',
        projectDescription: 'YUP!',
        githubRepository: 'foo/bar',
        authorName: 'Walt',
        authorUrl: 'http://wa.lt'
      });
  });

  it('creates service', () => {
    assert.file([
      'Bar.js',
      'index.js'
    ]);

    assert.fileContent([
      ['Bar.js', /export default function Bar\(eventBus\)/],
      ['index.js', /import Bar from '\.\/Bar';/]
    ]);
  });


  it('creates boilerplate', () => {

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
