function getResourceName(): string {
  // GetParentResourceName is only defined inside the real NUI browser; the
  // dev/standalone case has no client host to talk to.
  const w = window as any;
  return typeof w.GetParentResourceName === 'function' ? w.GetParentResourceName() : 'zone_manager';
}

export function post<T = any>(endpoint: string, data?: object): Promise<T> {
  return fetch(`https://${getResourceName()}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data || {}),
  }).then((res) => res.json());
}
