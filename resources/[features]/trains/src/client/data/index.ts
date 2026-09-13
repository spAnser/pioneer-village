/**
 * Filename stem -> trainConfigName.
 *
 * This duplicates what each track's JSON now carries in its own `configName`
 * field, and it omits the six .dat files no XML list registers
 * (sd_trolley_cable06/11, trolley_intersection1_2/4/6/7). Driving both maps off
 * resources/index.json instead would make this self-maintaining -- see
 * traintrack-editor/src/client/track-data.ts, which already does exactly that.
 */
const TrainTracksMapping = {
  trains1: 'freight_group',
  trains2: 'braithwaites2_track_config',
  trains3: 'trains3',
  trolley1: 'nb_trolley_track_config',
  trolley2: 'nb_trolley_track_config_temp',
  trolley3: 'trolley3',
  trolley4: 'trolley4',
  minecart_jam3_4: 'minecart_Jam3_4',
  rivers1: 'riverboat_track_config',
  trolley_intersection2: 'trolley_intersection2',
  trolley_intersection3: 'trolley_intersection3',
  trolley_intersection5: 'trolley_intersection5',
  trains_nb1: 'trains_nb1',
  trains_nb2: 'trains_nb2',
  trains_nb3: 'trains_nb3',
  trains_rob3: 'trains_rob3',
  trains_intersection1_3: 'trains_intersection1_3',
  trains_intersection2_3: 'trains_intersection2_3',
  trains_intersection1_ann: 'trains_intersection1_ann',
  trains_intersection2_ann: 'trains_intersection2_ann',
  trains_intersection3_cor: 'trains_intersection3_cor',
  trains_intersection1_app: 'trains_intersection1_app',
  trains_old_west03: 'trains_old_west03',
  trains_old_west02: 'trains_old_west02',
  trains_old_west01: 'trains_old_west01',
  trains_old_west_intersection02: 'trains_old_west_intersection02',
  trains_old_west_intersection01: 'trains_old_west_intersection01',
  freight_nb1_inter: 'freight_nb1_inter',
  spanser_train: 'spanser_train',
} as const;

const TrollyCableTracksMapping = {
  sd_trolley_cable01: 'sd_trolley_cable01',
  sd_trolley_cable02: 'sd_trolley_cable02',
  sd_trolley_cable03: 'sd_trolley_cable03',
  sd_trolley_cable04: 'sd_trolley_cable04',
  sd_trolley_cable05: 'sd_trolley_cable05',
  sd_trolley_cable07: 'sd_trolley_cable07',
  sd_trolley_cable08: 'sd_trolley_cable08',
} as const;

type TrainTrackConfig = (typeof TrainTracksMapping)[keyof typeof TrainTracksMapping];
type TrollyCableTrackConfig = (typeof TrollyCableTracksMapping)[keyof typeof TrollyCableTracksMapping];

type TrainTracksType = Record<TrainTrackConfig, TrainData.Track>;
type TrollyCableTracksType = Record<TrollyCableTrackConfig, TrainData.Track>;

const TrainTracks = {} as TrainTracksType;

const TrollyCableTracks = {} as TrollyCableTracksType;

for (const [key, value] of Object.entries(TrainTracksMapping)) {
  const json = LoadResourceFile('trains', `resources/${key}.json`);
  TrainTracks[value as TrainTrackConfig] = JSON.parse(json) as TrainData.Track;
}

for (const [key, value] of Object.entries(TrollyCableTracksMapping)) {
  const json = LoadResourceFile('trains', `resources/${key}.json`);
  TrollyCableTracks[value as TrollyCableTrackConfig] = JSON.parse(json) as TrainData.Track;
}

export default {
  TrainTracks,
  TrollyCableTracks,
};
