import {Router} from "express";
import fetch from "node-fetch";
// const fetch = await import("node-fetch");
const partnerToken = process.env?.TT_PARTNER_TOKEN ?? '';

const ttBaseUrl = process.env?.TT_BASE_URL ?? 'https://shakertroop15.trooptrack.com/api/v1';
const ttroutes = Router();

ttroutes.route("/tt/login").post((req, res) => {
    const {username, password} = req.body;
    const url = `${ttBaseUrl}/tokens`;
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
        .then((response ) => response.json())
        .then((data: any) => {
            res.setHeader('Set-Cookie', `t15_tt_token=${data.users[0].token}; SameSite=None; Secure`);
            res.json(data);
        })
        .catch((error: any) => {
            console.error("Error:", error);
            res.status(401).send(error);
        });
});

export default ttroutes;