import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useForm } from "react-hook-form";
import { registrationSchema } from "../utils/validateRegistration";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useDispatch } from "react-redux";
import { addUser } from "../feathures/formSubmit";

type ModalContentProps = {
  onClose: () => void;
};

type FormData = z.infer<typeof registrationSchema>;

export default function ModalContent({ onClose }: ModalContentProps) {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
          <label htmlFor="username">Name</label>
          <input id="name" {...register("name")} />
          {errors.name && <p className="errors">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && <p className="errors">{errors.age.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email")} />
          {errors.email && <p className="errors">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && (
            <p className="errors">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="passwordRepit">Please repeat password</label>
          <input
            type="password"
            id="passwordRepit"
            {...register("passwordRepit")}
          />
          {errors.passwordRepit && (
            <p className="errors">{errors.passwordRepit.message}</p>
          )}
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
          {errors.sex && <p style={{ color: "red" }}>{errors.sex.message}</p>}
        </div>
        <div>
          <label htmlFor="terms">Client's terms</label>
          <input type="checkbox" id="terms" {...register("terms")} />
          {errors.terms && <p className="errors">{errors.terms.message}</p>}
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            {...register("image", { required: "Выберите изображение" })}
          />
          {errors.image && <p className="errors">{errors.image.message}</p>}
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
          {errors.country && <p className="errors">{errors.country.message}</p>}
        </div>
      </div>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
      <input type="reset" value="Reset"></input>
    </form>
  );
}
