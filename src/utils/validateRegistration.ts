import { z } from 'zod';




export const registrationSchema = z.object({
  username: z
    .string()
    .min(1, 'Enter the name')
    .regex(/^[А-Яа-яЁёA-Za-z]+$/, 'Имя должно содержать только буквы'),

  email: z.email('Введите корректный email'),

  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])$/,
      'Пароль должен содержать заглавную букву, строчную, спецсивол и цифру'
    ),
    age: z.number(),
    image: z.base64(),
    terms: z.boolean(),
    sex: z.enum(["Male", "Female", "I don't now"]),

});