import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useForm } from "react-hook-form";
import { registrationSchema } from "../utils/validateRegistration";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useDispatch } from "react-redux";
import { addUser } from "../feathures/formSubmit";
import { useState } from "react";
import { Controller } from "react-hook-form";

type ModalContentProps = {
  onClose: () => void;
};

type FormData = z.infer<typeof registrationSchema>;

export default function ModalContent({ onClose }: ModalContentProps) {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);
  const [, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPassword = (value: string) => {
    let score = 0;
    if (value.length >= 6) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    setPasswordStrength(checkPassword(val));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    criteriaMode: "all",
  });
  console.log(errors);

  const onSubmit = (data: FormData) => {
    dispatch(
      addUser({
        name: data.name,
        email: data.email,
        age: data.age,
        sex: data.sex,
        password: data.password,
        passwordRepit: data.passwordRepit,
        terms: data.terms,
        image: data.image,
        country: data.country,
      }),
    );
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button onClick={onClose}>Close</button>
      <div>
        <h3>Controled Form</h3>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" {...register("name")} />
          <p className="errors">
            {errors.name && <p>{errors.name.message}</p>}
          </p>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", { valueAsNumber: true })}
          />
          <p className="errors">{errors.age && <p>{errors.age.message}</p>}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email")} />
          <p className="errors">
            {errors.email && <p>{errors.email.message}</p>}
          </p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  type="password"
                  id="password"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handlePasswordChange(e);
                  }}
                />

                <div style={{ marginTop: "4px" }}>
                  <progress max={4} value={passwordStrength}></progress>
                  <p>
                    {passwordStrength === 0 && "So silly"}
                    {passwordStrength === 1 && "Silly"}
                    {passwordStrength === 2 && "Medio"}
                    {passwordStrength === 3 && "Good"}
                    {passwordStrength === 4 && "Strength"}
                  </p>
                </div>
              </div>
            )}
          />
          <p className="errors">
            {errors.password && <p>{errors.password.message}</p>}
          </p>
        </div>

        <div>
          <label htmlFor="passwordRepit">Please repeat password</label>
          <input
            type="password"
            id="passwordRepit"
            {...register("passwordRepit")}
          />
          <p className="errors">
            {errors.passwordRepit && <p>{errors.passwordRepit.message}</p>}
          </p>
        </div>
        <div>
          <label htmlFor="sex">Gender:</label>
          <select
            id="sex"
            {...register("sex", { required: "Выберите пол" })}
            name="sex"
            defaultValue=""
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="I don't now">I don't now</option>
          </select>
          <p className="errors">
            {errors.sex && <p style={{ color: "red" }}>{errors.sex.message}</p>}
          </p>
        </div>
        <div>
          <label htmlFor="terms">Client's terms</label>
          <input type="checkbox" id="terms" {...register("terms")} />
          <p className="errors">
            {errors.terms && <p>{errors.terms.message}</p>}
          </p>
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            {...register("image", { required: "Выберите изображение" })}
          />
          <p className="errors">
            {errors.image && <p>{errors.image.message}</p>}
          </p>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            list="countries"
            id="country"
            {...register("country", { required: "Выберите страну" })}
          />
          <datalist id="countries">
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <p className="errors">
            {errors.country && <p>{errors.country.message}</p>}
          </p>
        </div>
      </div>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
      <input type="reset" value="Reset"></input>
    </form>
  );
}
