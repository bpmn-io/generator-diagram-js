'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-diagram-js:project-files', () => {

  describe('normal package', function() {

    before(() => {
      return helpers
        .run(path.join(__dirname, '../generators/project-files'))
        .withOptions({
          projectName: 'bar',
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
        'test/.eslintrc',
        'README.md',
        'package.json',
        '.eslintrc',
        '.gitignore',
        '.npmignore',
        '.travis.yml'
      ]);

      assert.fileContent([
        ['README.md', /# bar/],
        ['package.json', /"name": "bar",/]
      ]);
    });
  });


  describe('namespaced package', function() {

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
        'test/.eslintrc',
        'README.md',
        'package.json',
        '.eslintrc',
        '.gitignore',
        '.npmignore',
        '.travis.yml'
      ]);

      assert.fileContent([
        ['README.md', /# @foo\/bar/],
        ['package.json', /"name": "@foo\/bar",/, /"publishConfig": / ]
      ]);
    });
  });
});
