// utils.js
import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });

const cookieOptions = {
  maxAge: 3 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "none",
  secure: true,      // ← ahora sí puede ser true
  partitioned: false,// (opcional, Chrome 119+)
};

  console.log("Cookie enviada:", cookieOptions);

  res.cookie("jwt", token, cookieOptions);
};
