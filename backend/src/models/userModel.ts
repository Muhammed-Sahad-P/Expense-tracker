import bcrypt from "bcryptjs";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";

interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

// Create a new user in the database
export const createUser = async (user: User): Promise<number> => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const [result] = await pool.query<ResultSetHeader>(query, [
      user.username,
      user.email,
      hashedPassword,
    ]);

    return result.insertId;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
};

// Retrieve all users from the database
export const getAllUsers = async (): Promise<Omit<User, "password">[]> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, username, email FROM users"
    );
    return rows as Omit<User, "password">[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Error fetching users");
  }
};

// Retrieve a user by their username
export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (!rows.length) return null;

  return rows[0] as User;
};

// Compare a plaintext password with a hashed password from DB
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
