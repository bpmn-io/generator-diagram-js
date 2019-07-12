'use strict';

const Generator = require('yeoman-generator');

const chalk = require('chalk');

const {
  toServiceName,
  toServiceClass
} = require('../util');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.option('serviceLocation', { type: String });
    this.option('serviceName', { type: String });
    this.option('serviceCls', { type: String });
    this.option('initializeService', { type: Boolean });
  }

  async prompting() {

    this.props = {
      serviceLocation: this.options.serviceLocation,
      serviceName: this.options.serviceName,
      serviceCls: this.options.serviceCls,
      initializeService: this.options.initializeService
    };

    const _i0 = await this.prompt([
      {
        type: 'input',
        name: 'serviceName',
        message: 'Name of the service',
        validate: function(name) {
          if (!/\w/.test(name)) {
            return 'Must be valid javascript identifier';
          }

          return true;
        },
        filter(str) {
          return toServiceName(str);
        },
        when: !this.props.serviceName
      },
      {
        type: 'input',
        name: 'serviceLocation',
        message: 'Location of service in your project',
        default: '.',
        when: !this.props.serviceLocation
      }
    ]);

    if (_i0.serviceName) {
      _i0.serviceCls = toServiceClass(_i0.serviceName);
    }

    this.props = {
      ...this.props,
      ..._i0
    };

    this.props.servicePath = this.destinationPath(
      this.props.serviceLocation,
      this.props.serviceCls + '.js'
    );

    this.props.modulePath = this.destinationPath(this.props.serviceLocation, 'index.js');

    this.props.generateModule = !this.fs.exists(this.props.modulePath);

    if (this.props.generateModule) {

      this.log(chalk.bold('# generating service module'));

      if (typeof this.props.initializeService === 'undefined') {
        const { initializeService } = await this.prompt([
          {
            type: 'confirm',
            name: 'initializeService',
            message: 'Automatically initialize service on module load?',
            default: true
          }
        ]);

        this.props.initializeService = initializeService;
      }

    } else {
      this.log(
        chalk.bold('# Module exists at %s, you have to add your service to it manually'),
        chalk.cyan(this.props.modulePath)
      );
    }
  }

  writing() {

    const {
      serviceName,
      serviceCls,
      servicePath,
      modulePath,
      generateModule,
      initializeService
    } = this.props;

    this.fs.copyTpl(this.templatePath('service.js'), servicePath, {
      serviceCls
    });

    if (generateModule) {
      this.fs.copyTpl(this.templatePath('index.js'), modulePath, {
        serviceCls,
        serviceName,
        initializeService
      });
    }
  }

};
