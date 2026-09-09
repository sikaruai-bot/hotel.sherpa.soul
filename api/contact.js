import sendEmailHandler from "./send-email.js";

export default async function handler(req, res) {
  if (req.body && !req.body.type) {
    req.body.type = "contact";
  }
  return sendEmailHandler(req, res);
}
