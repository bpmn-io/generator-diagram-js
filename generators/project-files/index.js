'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.option('projectName', {
      type: String,
      required: true
    });

    this.option('projectDescription', {
      type: String,
      required: true
    });

    this.option('authorName', {
      type: String,
      required: true
    });

    this.option('authorUrl', {
      type: String,
      required: true
    });

    this.option('githubRepository', {
      type: String,
      required: true
    });

    this.props = {
      projectName: this.options.projectName,
      projectDescription: this.options.projectDescription,
      authorName: this.options.authorName,
      authorUrl: this.options.authorUrl,
      githubRepository: this.options.githubRepository
    };

    this.props.localPackage = this.props.projectName.includes('/');
  }

  writing() {
    const {
      projectName,
      projectDescription,
      authorName,
      authorUrl,
      githubRepository,
      localPackage,
      serviceName,
      serviceCls
    } = this.props;

    const currentYear = new Date().getFullYear();

    const files = [
      'test/.eslintrc',
      'test/process.bpmn',
      'test/test.js',
      '.eslintrc',
      '.gitignore',
      '.travis.yml',
      'CHANGELOG.md',
      'karma.conf.js',
      'LICENSE',
      'package.json',
      'README.md'
    ];

    for (const file of files) {

      this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), {
        projectName,
        projectDescription,
        authorName,
        authorUrl,
        githubRepository,
        localPackage,
        currentYear,
        serviceName,
        serviceCls
      });
    }

    this.fs.copy(this.templatePath('.npmignore.tpl'), this.destinationPath('.npmignore'));
  }

};
