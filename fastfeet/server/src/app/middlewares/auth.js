import jwt from "jsonwebtoken";
import { promisify } from "util";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });
  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, "cheesireCat");
    req.userId = decoded.id;
    return next();
  } catch (err) {
    res.status(401).json({ error: "Unexpected error" });
  }
};
