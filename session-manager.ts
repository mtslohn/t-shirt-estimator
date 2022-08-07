import { EstimateSession } from "./estimate-session.ts";

export default class SessionManager {

    sessions = {};

    getOrCreateSession(name: string): EstimateSession {
        let session = this.sessions[name];
        if (session === undefined) {
            session = new EstimateSession(name);
            this.sessions[name] = session;
        }
        return session;
    }

}