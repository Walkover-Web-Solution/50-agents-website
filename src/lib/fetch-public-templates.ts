export type PublicTemplate = {
  _id: string;
  templateDescription?: string;
  agentJson?: { name?: string; description?: string };
};

/** Public template list for server HTML (footer /templates; no auth). */
export async function fetchPublicTemplates(): Promise<PublicTemplate[]> {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) return [];

  try {
    const res = await fetch(`${base}/template`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: { templates?: PublicTemplate[] } };
    return json?.data?.templates ?? [];
  } catch {
    return [];
  }
}