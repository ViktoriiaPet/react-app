import z from "zod";

export const registrationSchema = z.object({
  name: z
    .string()
    .min(1, 'Enter the name')
    .regex( /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё]*$/,
     "Имя должно начинаться с заглавной буквы и содержать только буквы"
),

  email: z.email('Введите корректный email'),

  password: z
    .string()
    .min(4, "Пароль должен быть не менее 4 символов")
    .regex(
       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
      'Пароль должен содержать заглавную букву, строчную, спецсивол и цифру'
    ),
    passwordRepit: z
    .string()
    .min(1, "Повторите пароль"),
    age: z.number().min(0, "Возраст не может быть отрицательным").int("Возраст должен быть целым числом"),
    image: z.base64().min(1, "Выберите изображение"),
    terms: z.literal(true, { message: "Необходимо согласиться с условиями" }),
    sex: z.enum(["Male", "Female", "I don't now"]),
    country: z.string().min(1, "Выберите страну"),

}).superRefine(({ passwordRepit, password }, ctx) => {
  if (passwordRepit !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['passwordRepit']
    });
  }
});