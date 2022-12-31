const componentFiles = [
  '2886757168',
  'accessories',
  'ammo-pistols',
  'ammo-rifles',
  'aprons',
  'armor',
  'badges',
  'beards-chin',
  'beards-chops',
  'beards-complete',
  'beards-mustache',
  'belt-buckles',
  'belts',
  'bodies-lower',
  'bodies-upper',
  'boot-accessories',
  'boots',
  'chaps',
  'cloaks',
  'coats',
  'coats-closed',
  'dresses',
  'eyes',
  'eyewear',
  'gauntlets',
  'gloves',
  'gunbelt-accs',
  'gunbelts',
  'hair',
  'hair-accessories',
  'hats',
  'heads',
  'holsters-crossdraw',
  'holsters-knife',
  'holsters-left',
  'holsters-right',
  'horse-accessories',
  'horse-bedrolls',
  'horse-blankets',
  'horse-bridles',
  'horse-manes',
  'horse-mustache',
  'horse-saddlebags',
  'horse-saddles',
  'horse-shoes',
  'horse-tails',
  'jewelry-bracelets',
  'jewelry-rings-left',
  'jewelry-rings-right',
  'loadouts',
  'masks',
  'masks-large',
  'neckties',
  'neckwear',
  'pants',
  'ponchos',
  'saddle-horns',
  'saddle-lanterns',
  'saddle-stirrups',
  'satchels',
  'shirts-full',
  'skirts',
  'spats',
  'suspenders',
  'talisman-belt',
  'talisman-holster',
  'talisman-satchel',
  'talisman-wrist',
  'teeth',
  'vests',
];
class ComponentManager {
  protected static instance: ComponentManager;

  static getInstance(): ComponentManager {
    if (!ComponentManager.instance) {
      ComponentManager.instance = new ComponentManager();
    }
    return ComponentManager.instance;
  }

  components: Map<number, Component> = new Map();
  componentsGroups: Map<string, Set<number>> = new Map();

  private constructor() {
    // for (const componentFile of componentFiles) {
    //   const componentsData = JSON.parse(
    //     LoadResourceFile('rdr3-shared', `components/${componentFile}.json`),
    //   ) as Component[];
    //   for (const componentData of componentsData) {
    //     if (!this.componentsGroups.has(componentFile)) {
    //       this.componentsGroups.set(componentFile, new Set());
    //     }
    //     this.componentsGroups.get(componentFile)?.add(componentData.component << 0);
    //     this.components.set(componentData.component << 0, componentData);
    //   }
    // }
    console.log(`Loaded ${this.components.size} components`);
  }

  getById(id: number): Component | undefined {
    return this.components.get(id << 0);
  }

  getAllByCategory(category: string): Set<number> {
    return this.componentsGroups.get(category) || new Set();
  }
}

const componentManager = ComponentManager.getInstance();

export default componentManager;
