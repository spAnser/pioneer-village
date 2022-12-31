export { awaitClient, emitClient, onClient, onClientCall } from './comms/client';

export const LoadResourceFile = async (resourceName: string, fileName: string): Promise<string> => {
  const response = await fetch(`nui://${resourceName}/${fileName}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${fileName} from ${resourceName}`);
  }

  return response.text();
};

export const LoadResourceJson = async (resourceName: string, fileName: string): Promise<Record<string, any>> => {
  const response = await fetch(`nui://${resourceName}/${fileName}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${fileName} from ${resourceName}`);
  }

  return response.json();
};
