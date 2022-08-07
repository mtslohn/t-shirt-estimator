import { EstimateSession } from "./estimate-session.ts";
import { Application, Router, RouterContext } from "https://deno.land/x/oak/mod.ts";
import SessionManager from "./session-manager.ts";
import Estimate from "./estimate.ts";

const sessionManager = new SessionManager();

const router = new Router();
router
  .get("/", (context: RouterContext) => {
    context.response.body = "Hello world!";
  })
  .get("/sessions/:name", (context: RouterContext) => {
    let session: EstimateSession = undefined;
    if (context?.params?.name) {
        session = sessionManager.getOrCreateSession(context?.params?.name);
    }
    console.log(session);
    context.response.body = session;
  })
  .post("/sessions/:name/participants", async (context: RouterContext) => {
    let session: EstimateSession = undefined;
    if (context?.params?.name) {
        session = sessionManager.getOrCreateSession(context?.params?.name);
        const body: {participant: string} = await context.request.body().value;
        session.participants.push(body.participant);
    }
    context.response.body = session;
  })
  .post("/sessions/:name/estimate", async (context: RouterContext) => {
    let session: EstimateSession = undefined;
    if (context?.params?.name) {
        session = sessionManager.getOrCreateSession(context?.params?.name);
        const body: Estimate = await context.request.body().value;
        
        session.estimates[body.participant] = body.estimate;
    }
    context.response.body = session;
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

/*const sessions = [];

serve((req: Request) => {
    const url = new URL(req.url);
    const name = url.searchParams.get('name');
    return new Response("Hello World, " + name);
});

function getSession(id: string): EstimateSession {
    let session = sessions[id];
    if (session === undefined) {
        session = new EstimateSession();
        sessions[id] = session;
    }
    return session;
}

function addParticipant(session: EstimateSession, participant: string) {
    session.participants.push(participant);
}*/