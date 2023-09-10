import { Router } from "express";
import fetch from "node-fetch";
const partnerToken = process.env?.TT_PARTNER_TOKEN ?? '';
const ttBaseUrl = process.env?.TT_BASE_URL ?? 'https://shakertroop15.trooptrack.com/api/v1';
const ttroutes = Router();
ttroutes.route("/api/tt/login").post((req, res) => {
    console.log(`tt login: ${req.body}`);
    const { username, password } = req.body;
    const url = `${ttBaseUrl}/tokens`;
    console.log(`Using partner token: ${partnerToken} to login username: ${username}`);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Partner-Token': partnerToken,
            'X-Username': username,
            'X-User-Password': password,
            'Accept': 'application/json',
        }
    })
        .then(res => res.json())
        .then((data) => {
        res.setHeader('Set-Cookie', `t15_tt_token=${data?.users?.[0]?.token}; SameSite=None; Secure`);
        res.json(data);
    })
        .catch((error) => {
        console.error("Error:", error);
        res.status(401).send(error);
    });
});
ttroutes.route("/api/tt/events").get((req, res) => {
    const url = `${ttBaseUrl}/events?start_on=2022-08-01&end_on=2023-07-31`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Partner-Token': partnerToken,
            'X-User-Token': req.cookies?.t15_tt_token,
            'Accept': 'application/json',
        }
    })
        .then(res => res.json())
        .then((data) => res.json(data))
        .catch((error) => {
        console.error("Error:", error);
        res.status(401).send(error);
    });
});
ttroutes.route("/api/tt/event/:eventId").get((req, res) => {
    const url = `${ttBaseUrl}/events/${req.params.eventId}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Partner-Token': partnerToken,
            'X-User-Token': req.cookies?.t15_tt_token,
            'Accept': 'application/json',
        }
    })
        .then(res => res.json())
        .then((data) => res.json(data))
        .catch((error) => {
        console.error("Error:", error);
        res.status(401).send(error);
    });
});
export default ttroutes;
