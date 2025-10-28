import type { Request, Response } from "express";

import jwt from "jsonwebtoken";

import { users } from "../data/user.type.js";

const JWT_SECRET = "supersecret";

// Route login
export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = users.find(
      u => u.email === email && u.password === password,
    );

    if (!user) {
      res.status(401).json({ success: false, message: "Identifiants invalides" });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      message: `Welcome ${user.username}`,
      data: {
        token,
        role: user.role,
      },
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur interne du serveur" });
  }
}
