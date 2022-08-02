import { serve } from "https://deno.land/std@0.145.0/http/server.ts";

serve((req: Request) => {
    const url = new URL(req.url);
    const nome = url.searchParams;
    return new Response("Hello World, " + nome);
});