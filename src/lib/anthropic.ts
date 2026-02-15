type AnthropicMessage = {
  role: 'user'
  content: string
}

export async function anthropicText(prompt: string) {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) throw new Error('Missing ANTHROPIC_API_KEY')

  // Minimal HTTP call (no SDK dependency). Uses the Messages API.
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 400,
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt } satisfies AnthropicMessage],
    }),
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`Anthropic error ${res.status}: ${t}`)
  }
  const json = await res.json()
  // content: [{type:'text', text:'...'}]
  const text = (json?.content || []).find((c: any) => c.type === 'text')?.text
  if (!text) throw new Error('No text in Anthropic response')
  return String(text).trim()
}
