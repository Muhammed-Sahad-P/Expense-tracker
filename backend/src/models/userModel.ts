import bcrypt from "bcryptjs";
import pool from "../config/db";

interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

// Create a new user in the database
export const createUser = async (user: User) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const result = await pool.query(query, [
      user.username,
      user.email,
      hashedPassword,
    ]);
  } catch (error) {
    console.error(" Error creating user:", error);
    throw new Error("Error creating user");
  }
};

// Retrieve a user by their username
export const getUserByUsername = async (username: string) => {
  try {
    const [rows]: any = await pool.query(
      "SELECT id, username, email, password FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Error fetching user");
  }
};

// Compare a plaintext password with a hashed password from DB
export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};
