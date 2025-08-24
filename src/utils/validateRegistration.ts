import z from "zod";

export const registrationSchema = z
  .object({
    name: z
      .string()
      .min(1, "Enter the name")
      .regex(
        /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё]*$/,
        "The name must start with a capital letter and contain only letters.",
      ),

    email: z.email("Enter the correct email address"),

    password: z
      .string()
      .min(4, "The password must be at least 4 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
        "The password must contain an uppercase letter, a lowercase letter, a special character, and a number.",
      ),
    passwordRepit: z.string().min(1, "Repeat the password"),
    age: z
      .number()
      .min(0, "Age cannot be negative")
      .int("Age must be an integer number."),
    image: z.base64().min(1, "Select an image"),
    terms: z.literal(true, {
      message: "You must agree to the terms and conditions",
    }),
    sex: z.enum(["Male", "Female", "I don't now"]),
    country: z.string().min(1, "Select a country"),
  })
  .superRefine(({ passwordRepit, password }, ctx) => {
    if (passwordRepit !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordRepit"],
      });
    }
  });
