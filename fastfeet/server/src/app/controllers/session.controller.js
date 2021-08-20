import jwt from "jsonwebtoken";
import * as Yup from "yup";
import User from "../models/User";

class SessionController {
  async session(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email()
    });
    if (!(await schema.isValid(req.body))) {
      return res.json({ err: "please enter a valid email" });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) res.status(401).json({ err: "User not found" });
    if (!(await user.checkPassword(password))) {
      res.status(401).json({ err: "incorrect password" });
    }
    const { name, id } = user;
    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, "cheesireCat", {
        expiresIn: "7d"
      })
    });
  }
}

export default new SessionController();
