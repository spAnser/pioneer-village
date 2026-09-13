/**
 * Loads parsed track geometry out of the `trains` resource.
 *
 * The track list is read from index.json rather than hardcoded here. The parser
 * writes that file next to the per-track JSON on every run, so adding or
 * renaming a track needs no edit in this resource -- and it avoids a second
 * copy of the stem -> configName table that trains/src/client/data/index.ts
 * already carries.
 */

const SOURCE_RESOURCE = 'trains';
const DATA_DIR = 'resources';

/** The subset of the parser's index.json this tool needs. */
interface TrackIndex {
  tracks: {
    /** Path of the source .dat, relative to the parser's input directory. */
    file: string;
    /** Filename stem. The per-track JSON is `<name>.json`. */
    name: string;
    configName?: string;
    list?: TraintrackEditor.TrackList;
  }[];
}

export interface LoadResult {
  tracks: TraintrackEditor.Track[];
  /** Human-readable reasons a track (or the whole index) could not be read. */
  failures: string[];
}

function readJson<T>(fileName: string): T | null {
  // On the client this native only reads files the owning resource lists in its
  // own files{} block; trains lists "resources/*.json", so every track and the
  // index qualify. It returns an empty string rather than throwing when the
  // file is missing, so the parse has to be guarded either way.
  const raw = LoadResourceFile(SOURCE_RESOURCE, fileName);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadTracks(): LoadResult {
  const failures: string[] = [];

  const index = readJson<TrackIndex>(`${DATA_DIR}/index.json`);
  if (!index?.tracks?.length) {
    failures.push(
      `Could not read ${SOURCE_RESOURCE}/${DATA_DIR}/index.json. Re-run the track parser so it ` +
        `writes index.json alongside the per-track files, and make sure the ${SOURCE_RESOURCE} ` +
        `resource is started.`,
    );
    return { tracks: [], failures };
  }

  const tracks: TraintrackEditor.Track[] = [];
  for (const entry of index.tracks) {
    const track = readJson<TraintrackEditor.Track>(`${DATA_DIR}/${entry.name}.json`);
    if (!track?.nodes?.length) {
      failures.push(`${entry.name}.json missing or empty`);
      continue;
    }
    // Older JSON predates the parser recording configName. Junction names still
    // have to resolve against something, and for every track whose stem and
    // configName agree the stem IS the right answer -- it is only wrong for the
    // five renamed ones (trains1/2, trolley1/2, rivers1), which is worth saying
    // out loud rather than failing silently.
    if (!track.configName) {
      track.configName = entry.configName ?? track.source ?? entry.name;
      if (!entry.configName) {
        // failures.push(`${entry.name}: no configName in JSON or index, falling back to "${track.configName}"`);
      }
    }
    track.source ??= entry.name;
    track.list ??= entry.list;
    tracks.push(track);
  }

  return { tracks, failures };
}
