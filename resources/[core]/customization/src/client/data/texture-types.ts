const TextureTypes = {
  male: {
    albedo: [
      GetHashKey('mp_head_mr1_sc08_c0_000_ab'), // 0
      GetHashKey('mp_head_mr1_sc01_c0_000_ab'), // 1
      GetHashKey('mp_head_mr1_sc02_c0_000_ab'), // 2
      GetHashKey('mp_head_mr1_sc03_c0_000_ab'), // 3
      GetHashKey('mp_head_mr1_sc04_c0_000_ab'), // 4
      GetHashKey('mp_head_mr1_sc05_c0_000_ab'), // 5
    ],
    normal: [
      GetHashKey('mp_head_mr1_008_nm'),
      GetHashKey('mp_head_mr1_001_nm'),
      GetHashKey('mp_head_mr1_002_nm'),
      GetHashKey('mp_head_mr1_003_nm'),
      GetHashKey('mp_head_mr1_004_nm'),
      GetHashKey('mp_head_mr1_005_nm'),
    ],
    material: GetHashKey('mp_head_mr1_000_m'),
    color_type: 1,
    texture_opacity: 1.0,
    unk_arg: 0,
  },
  female: {
    albedo: [
      GetHashKey('mp_head_fr1_sc08_c0_000_ab'), // 0
      GetHashKey('mp_head_fr1_sc01_c0_000_ab'), // 1
      GetHashKey('mp_head_fr1_sc02_c0_000_ab'), // 2
      GetHashKey('mp_head_fr1_sc03_c0_000_ab'), // 3
      GetHashKey('mp_head_fr1_sc04_c0_000_ab'), // 4
      GetHashKey('mp_head_fr1_sc05_c0_000_ab'), // 5
    ],
    //normal:`mp_head_fr1_000_nm`, // head_fr1_mp_002_nm
    normal: [
      GetHashKey('mp_head_fr1_008_nm'),
      GetHashKey('mp_head_fr1_001_nm'),
      GetHashKey('mp_head_fr1_002_nm'),
      GetHashKey('mp_head_fr1_003_nm'),
      GetHashKey('mp_head_fr1_004_nm'),
      GetHashKey('mp_head_fr1_005_nm'),
    ],
    material: GetHashKey('mp_head_fr1_000_m'),
    color_type: 1,
    texture_opacity: 1.0,
    unk_arg: 0,
  },
};

export default TextureTypes;
