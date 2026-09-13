function getResourceName(): string {
  // GetParentResourceName only exists inside the real NUI browser; opening the
  // page directly for layout work has no client host to talk to.
  const w = window as unknown as { GetParentResourceName?: () => string };
  return typeof w.GetParentResourceName === 'function' ? w.GetParentResourceName() : 'traintrack-editor';
}

export function post<T = unknown>(endpoint: string, data?: object): Promise<T> {
  return fetch(`https://${getResourceName()}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data ?? {}),
  }).then((res) => res.json() as Promise<T>);
}
