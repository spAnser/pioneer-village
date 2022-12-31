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

console.log('====================================');
console.log('==========COMPONENTS START==========');
console.log('====================================');

for (const componentFile of componentFiles) {
  const componentsData = JSON.parse(LoadResourceFile('rdr3-shared', `components/${componentFile}.json`));
  for (const componentData of componentsData) {
    const name = GetStringFromHashKey(componentData.component);
    if (name) {
      console.log(componentData.component, name);
    }
  }
}

console.log('====================================');
console.log('===========COMPONENTS END===========');
console.log('====================================');
