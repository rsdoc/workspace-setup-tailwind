const workspace = ['components', 'apps'];

/**
 * @param {import("plop").NodePlopApi } plop
 */
module.exports = function main(plop) {
  plop.setGenerator('component', {
    description: 'Generate components inside package',
    prompts: [
      /** This input will be used in name property of package.json */
      {
        type: 'input',
        name: 'componentName',
        message: 'Enter component name - ',
      },
      /** This will be used for filename and default functions in component file and index.tsx exported file */
      {
        type: 'input',
        name: 'componentDisplayName',
        message: 'Enter component display name - ',
      },
      {
        type: 'input',
        name: 'authorName',
        // default is --> "Rahul Singh<rahul@saastraa.com>"
        message: 'Package author name - ',
      },
      {
        type: 'list',
        name: 'outDir',
        message: 'What should be directory name inside of packages folder -',
        default: 'ui',
        choices: ['ui', 'button', 'alert', 'modal'],
      },
    ],
    actions(answers) {
      const actions = [];

      if (!answers) return actions;

      const { componentName, componentDisplayName, authorName, outDir } =
        answers;

      actions.push({
        type: 'addMany',
        templateFiles: 'plop/component/**',
        destination: './packages/{{outDir}}/{{dashCase componentName}}',
        base: 'plop/component',
        data: { componentName, componentDisplayName, authorName, outDir },
        abortOnFail: true,
      });

      return actions;
    },
  });
};
