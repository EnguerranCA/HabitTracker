"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message: string;
};

const UserFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: "Please enter a name.",
  }),
  email: z.string({
    invalid_type_error: "Please enter a valid email.",
  }),
  password: z.string({
    invalid_type_error: "Please enter a password.",
  }),
});

const CreateUser = UserFormSchema.omit({ id: true });
const UpdateUser = UserFormSchema.omit({ id: true });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (gen_random_uuid(), ${name}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to Create User.",
    };
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update User.",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}, password = ${hashedPassword}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Update User." };
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function deleteUser(id: string) {
  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
    revalidatePath("/dashboard/users");
    return { message: "Deleted User." };
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Delete User." };
  }
}
