import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  ignored: [
    '**/templates',
    'node_modules'
  ],
  build: [
    'generators/**/*.js'
  ],
  test: [
    'test/**/*.js'
  ]
};

export default [
  {
    ignores: files.ignored
  },
  ...bpmnIoPlugin.configs.node.map(config => ({
    ...config,
    files: files.build,
    languageOptions: {
      ...config.languageOptions,
      sourceType: 'commonjs'
    }
  })),
  ...bpmnIoPlugin.configs.mocha.map(config => ({
    ...config,
    files: files.test
  })),
  ...bpmnIoPlugin.configs.node.map(config => ({
    ...config,
    files: files.test,
    languageOptions: {
      ...config.languageOptions,
      sourceType: 'commonjs'
    }
  }))
];
