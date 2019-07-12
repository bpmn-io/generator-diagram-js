'use strict';

const Generator = require('yeoman-generator');

const {
  toShortName,
  toServiceClass,
  toServiceName,
  toCamelCase
} = require('../util');

module.exports = class extends Generator {

  async prompting() {

    this.props = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Name of your project',
        validate: function(name) {
          if (!/\w/.test(name)) {
            return 'Must be valid identifier';
          }

          return true;
        }
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'Short description of your project',
        validate: function(name) {
          if (!/"/.test(name)) {
            return 'Must not contain <">';
          }

          return true;
        }
      },
      {
        type: 'input',
        name: 'githubRepository',
        message: 'Name of your github repository (org/repo)',
        validate: function(name) {
          if (!name.contains('/')) {
            return 'Must match org/repo';
          }

          return true;
        }
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author\'s name',
        default: this.user.git.name()
      },
      {
        type: 'input',
        name: 'authorUrl',
        message: 'Author\'s website'
      }
    ]);

  }

  default() {

    const {
      projectName,
      projectDescription,
      authorName,
      authorUrl,
      githubRepository
    } = this.props;

    const projectPath = toShortName(projectName);

    this.log('Will create project in %s', projectPath);

    this.destinationRoot(this.destinationPath(projectPath));

    const camelCasedPath = toCamelCase(projectPath);

    const serviceName = toServiceName(camelCasedPath);
    const serviceCls = toServiceClass(camelCasedPath);

    this.composeWith(require.resolve('../service'), {
      serviceName,
      serviceCls,
      serviceLocation: '.'
    });

    this.composeWith(require.resolve('../project-files'), {
      projectName,
      projectDescription,
      authorName,
      authorUrl,
      githubRepository,
      serviceName,
      serviceCls
    });

  }

  install() {
    this.installDependencies();
  }

};
