export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "missing_id" });
  }

  const url = `https://api.mercadolibre.com/items/${encodeURIComponent(id)}`;

  try {
    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json,text/plain,*/*",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8"
      }
    });

    const text = await r.text();

    res.status(r.status);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(text);
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
