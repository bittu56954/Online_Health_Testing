import app from '../Backend/server.js';

export default function handler(req, res) {
  return app(req, res);
}
