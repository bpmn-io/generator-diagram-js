'use strict';

const Generator = require('yeoman-generator');

const chalk = require('chalk');

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
          if (/"/.test(name)) {
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
          if (!name.includes('/')) {
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

    this.props.projectPath = toShortName(projectName);

    this.log(chalk.yellow('#'), chalk.bold('creating project in folder'), chalk.cyan(this.props.projectPath));

    this.destinationRoot(this.destinationPath(this.props.projectPath));

    const camelCasedPath = toCamelCase(this.props.projectPath);

    const serviceName = toServiceName(camelCasedPath);
    const serviceCls = toServiceClass(camelCasedPath);

    this.composeWith(require.resolve('../project-files'), {
      projectName,
      projectDescription,
      authorName,
      authorUrl,
      githubRepository,
      serviceName,
      serviceCls
    });

    this.log(chalk.yellow('#'), chalk.bold('creating service'), chalk.cyan(serviceName));

    this.composeWith(require.resolve('../service'), {
      serviceName,
      serviceCls,
      serviceLocation: '.',
      initializeService: true
    });

  }

  install() {
    this.log(chalk.yellow('#'), chalk.bold('installing dependencies'));

    this.npmInstall();
  }

  end() {
    this.log();
    this.log(chalk.yellow('#'), chalk.bold('all done'));
    this.log();
    this.log(chalk.yellow('#'), 'you may now run', chalk.bold('npm run all'), 'in the', chalk.cyan(this.props.projectPath), 'directory', chalk.bold.red('❤️'));
  }

};
