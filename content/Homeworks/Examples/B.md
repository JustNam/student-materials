```ts
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return new Response('Missing id', { status: 400, headers: corsHeaders })
  }

  const { data, error } = await supabase
    .from('research_questions')
    .select(`
      id,
      content,
      interview_questions (
        id,
        content
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    return new Response(error.message, { status: 500, headers: corsHeaders })
  }

  if (!data) {
    return new Response('Not found', { status: 404, headers: corsHeaders })
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
```
