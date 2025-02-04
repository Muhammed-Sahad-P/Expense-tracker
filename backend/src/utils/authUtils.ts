import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

export const generateToken = (userId: number) => {
  if (!userId || isNaN(userId)) {
    throw new Error("Invalid userId for token generation");
  }

  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      userId?: string | number;
    };

    if (!decoded.userId || isNaN(Number(decoded.userId))) {
      throw new Error("Invalid token payload");
    }

    return { userId: Number(decoded.userId) };
  } catch (error) {
    throw new Error("Invalid token");
  }
};
