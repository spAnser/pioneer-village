type CreationStructure = {
  label: string;
  camera?: 'face' | 'body';
  components?: string[];
  faceFeatures?: {
    type: 'axis' | 'range';
    features?: string[];
    feature?: string;
  }[];
  overlays?: {
    label: string;
    type: string;
    max: number;
    variations?: number;
    features?: string[];
  }[];
  whistle?: boolean;
  children?: CreationStructure[];
}[];

export const structure: CreationStructure = [
  {
    label: 'General',
    camera: 'body',
    components: ['name', 'dob'],
  },
  {
    label: 'Head',
    camera: 'face',
    components: ['Heads'],
    children: [
      {
        label: 'Face',
        faceFeatures: [
          {
            type: 'range',
            feature: 'headWidth',
          },
        ],
        children: [
          {
            label: 'Eyes + Brows',
            components: ['Eyes'],
            faceFeatures: [
              {
                type: 'axis',
                features: ['eyelidHeight', 'eyelidWidth'],
              },
              {
                type: 'axis',
                features: ['eyesHeight', 'eyesDistance'],
              },
              {
                type: 'range',
                feature: 'eyesDepth',
              },
              {
                type: 'range',
                feature: 'eyesAngle',
              },
              {
                type: 'axis',
                features: ['eyebrowHeight', 'eyebrowWidth'],
              },
              {
                type: 'range',
                feature: 'eyebrowDepth',
              },
            ],
          },
          {
            label: 'Ears',
            faceFeatures: [
              {
                type: 'axis',
                features: ['earsHeight', 'earsWidth'],
              },
              {
                type: 'range',
                feature: 'earsAngle',
              },
              {
                type: 'range',
                feature: 'earlobeSize',
              },
            ],
          },
          {
            label: 'Cheeks',
            faceFeatures: [
              {
                type: 'axis',
                features: ['cheekBoneHeight', 'cheekBoneWidth'],
              },
              {
                type: 'range',
                feature: 'cheekBoneDepth',
              },
            ],
          },
          {
            label: 'Nose',
            faceFeatures: [
              {
                type: 'axis',
                features: ['noseSize', 'nostrilsDistance'],
              },
              {
                type: 'axis',
                features: ['noseHeight', 'noseWidth'],
              },
              {
                type: 'axis',
                features: ['noseAngle', 'noseCurvature'],
              },
            ],
          },
          {
            label: 'Mouth',
            components: ['Teeth'],
            faceFeatures: [
              {
                type: 'axis',
                features: ['mouthDepth', 'mouthWidth'],
              },
              {
                type: 'axis',
                features: ['mouthYPos', 'mouthXPos'],
              },
              {
                type: 'axis',
                features: ['upperLipHeight', 'upperLipWidth'],
              },
              {
                type: 'range',
                feature: 'upperLipDepth',
              },
              {
                type: 'axis',
                features: ['lowerLipHeight', 'lowerLipWidth'],
              },
              {
                type: 'range',
                feature: 'lowerLipDepth',
              },
            ],
          },
          {
            label: 'Jaw + Chin',
            faceFeatures: [
              {
                type: 'axis',
                features: ['jawHeight', 'jawWidth'],
              },
              {
                type: 'range',
                feature: 'jawDepth',
              },
              {
                type: 'axis',
                features: ['chinHeight', 'chinWidth'],
              },
              {
                type: 'range',
                feature: 'chinDepth',
              },
            ],
          },
        ],
      },
      {
        label: 'Overlays',
        overlays: [
          {
            label: 'Ageing',
            type: 'ageing',
            max: 23,
            features: ['opacity'],
          },
          {
            label: 'Acne',
            type: 'acne',
            max: 0,
            variations: 50,
            features: ['opacity'],
          },
          {
            label: 'Moles',
            type: 'moles',
            max: 15,
          },
          {
            label: 'Spots',
            type: 'spots',
            max: 15,
            features: ['opacity'],
          },
          {
            label: 'Scars',
            type: 'scars',
            max: 15,
            features: ['opacity'],
          },
          {
            label: 'Complexion',
            type: 'complex',
            max: 13,
            features: ['opacity'],
          },
          {
            label: 'Discoloration',
            type: 'disc',
            max: 15,
            features: ['opacity'],
          },
          {
            label: 'Freckles',
            type: 'freckles',
            max: 14,
            features: ['opacity'],
          },
          {
            label: 'Grime',
            type: 'grime',
            max: 15,
            features: ['opacity', 'palette', 'paletteP'],
          },
          {
            label: 'Foundation',
            type: 'foundation',
            max: 0,
            features: ['opacity', 'palette', 'paletteP'],
          },
          {
            label: 'Bear Stabble',
            type: 'beardstabble',
            max: 0,
            features: ['opacity', 'palette', 'paletteP'],
          },
          {
            label: 'Blush',
            type: 'blush',
            max: 3,
            features: ['opacity', 'palette', 'paletteP'],
          },
          {
            label: 'Lipstick',
            type: 'lipsticks',
            max: 0,
            variations: 7,
            features: ['opacity', 'palette', 'paletteP', 'paletteS'],
          },
          {
            label: 'Eyeliners',
            type: 'eyeliners',
            max: 0,
            variations: 15,
            features: ['opacity', 'color', 'palette', 'paletteP'],
          },
          {
            label: 'Shadows',
            type: 'shadows',
            max: 0,
            variations: 5,
            features: ['opacity', 'palette', 'paletteP', 'paletteS', 'paletteT'],
          },
        ],
      },
      {
        label: 'Hair',
        components: ['Hair', 'Beard'],
        overlays: [
          {
            label: 'Eyebrows',
            type: 'eyebrows',
            max: 23,
            features: ['opacity', 'palette', 'paletteP'],
          },
          {
            label: 'Hair Base',
            type: 'hair',
            max: 3,
            features: ['opacity', 'palette', 'paletteP'],
          },
        ],
      },
      {
        label: 'Whistle',
        whistle: true,
      },
    ],
  },
  {
    label: 'Body',
    camera: 'body',
    components: ['skinTone', 'Scale', 'body', 'waist'],
  },
  {
    label: 'Clothes',
    camera: 'body',
    components: [
      'Shirts',
      'Pants',
      'Skirts',
      'Boots',
      'Hats',
      'Neckties',
      'Neckwear',
      'Suspenders',
      'Chaps',
      'Vests',
      'Coats',
      'Gloves',
      'Ponchos',
      'Cloaks',
    ],
  },
  {
    label: 'Accessories',
    camera: 'body',
    components: ['Rings_Left_Hand', 'Rings_Right_Hand', 'Bracelets', 'Spats', 'Belts', 'Masks' /*, 'Bandanas'*/],
  },
];
