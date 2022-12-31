const fs = require('fs');
const fse = require('fs-extra');

const idTintRE = /.*?_(\d+)_TINT_(\d+)/;

const files = fs.readdirSync('./components');

const componentNames = require('./component-names.js');

for (const file of files) {
  const components = fse.readJsonSync(`./components/${file}`);
  const miscComponents = [];
  const newComponents = {};
  for (const component of components) {
    const friendlyName = componentNames[component.component];
    if (component.name?.includes('_TINT_')) {
      const matches = idTintRE.exec(component.name);
      if (matches) {
        const id = Number(matches[1]);
        const tint = id >= 400 ? Number(matches[2]) : Number(matches[2]) - 1;
        component.id = id;
        component.tint = tint;

        if (friendlyName) {
          component.friendlyName = friendlyName;
        }

        if (!newComponents[id]) {
          newComponents[id] = {
            name: friendlyName || component.id,
            components: [],
          };
        }

        newComponents[id].components.push(component);
      } else {
        miscComponents.push(component);
      }
    } else {
      if (friendlyName) {
        component.friendlyName = friendlyName;
      }
      miscComponents.push(component);
    }
  }

  fs.writeFileSync(
    `./components-ui/${file}`,
    JSON.stringify([{ name: 'Misc', components: miscComponents }, ...Object.values(newComponents)], null, 2),
  );
}
