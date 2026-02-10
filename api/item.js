export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "missing_id" });

  const upstreamUrl = `https://api.mercadolibre.com/items/${encodeURIComponent(id)}`;

  try {
    const r = await fetch(upstreamUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json,text/plain,*/*",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
        "Referer": "https://www.mercadolivre.com.br/",
        "Origin": "https://www.mercadolivre.com.br"
      }
    });

    const text = await r.text();

    return res.status(200).json({
      ok: r.ok,
      upstream_status: r.status,
      upstream_url: upstreamUrl,
      upstream_body_preview: text.slice(0, 400)
    });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
