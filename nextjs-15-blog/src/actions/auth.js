"use server";
import { LoginFormSchema, RegisterFormSchema } from "../lib/rules";
import { getCollection } from "../lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession } from "../lib/sessions";
import { cookies } from "next/headers";

export async function register(state, formData) {
  // validate form fields
  const validatedFields = RegisterFormSchema?.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // check if any form fields are invalid
  if (!validatedFields?.success) {
    return {
      errors: validatedFields?.error?.flatten()?.fieldErrors,
      email: formData.get("email"),
    };
  }

  // extract form fields
  const { email, password } = validatedFields.data;

  // check if email is already registered or not
  const userCollection = await getCollection("users");
  if (!userCollection)
    return {
      errors: {
        email: "Server Error: Database connection failed!",
      },
    };

  const existingUser = await userCollection.findOne({ email });

  if (existingUser)
    return {
      errors: {
        email: "Email already exist in our database!",
      },
    };

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database
  const results = await userCollection.insertOne({
    email,
    password: hashedPassword,
  });

  // Create a session
  await createSession(results.insertedId.toString());

  // Redirect
  redirect("/dashboard");
}

export async function login(state, formData) {
  // validate form fields
  const validatedFields = LoginFormSchema?.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // check if any form fields are invalid
  if (!validatedFields?.success) {
    return {
      errors: validatedFields?.error?.flatten()?.fieldErrors,
      email: formData.get("email"),
    };
  }

  // extract validated data
  const { email, password } = validatedFields.data;

  // check if email/user exits
  const userCollection = await getCollection("users");
  if (!userCollection)
    return { errors: { email: "Server Error: Database connection failed!" } };

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) return { errors: { email: "Invalid Credentials" } };

  // check if the password is correct
  const matchedPassword = await bcrypt.compare(password, existingUser.password);

  if (!matchedPassword) return { errors: { password: "Invalid Credentials" } };

  // create a session
  await createSession(existingUser._id.toString());

  // redirect
  redirect("/dashboard");
}

export async function logout() {
  // get the session value from cookie store and delete it
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
