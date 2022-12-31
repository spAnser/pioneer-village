import { onUICall, awaitServer } from '@lib/client';

onUICall('getSocketDetails', (useCache = true) => awaitServer('getSocketDetails', useCache));
