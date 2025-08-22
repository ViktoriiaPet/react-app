
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useForm } from "react-hook-form";
import { registrationSchema } from "../utils/validateRegistration";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {useDispatch } from "react-redux";
import { setUser } from "../feathures/formSubmit";

type ModalContentProps = {
  onClose: () => void;
};

type FormData = z.infer<typeof registrationSchema>;

export default function ModalContent({ onClose } : ModalContentProps) {

      const dispatch = useDispatch();
    const countries = useSelector((state: RootState) => state.countries);
 
    const { register, handleSubmit,watch, trigger, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });
   console.log(errors);
const password = watch("password");

  const onSubmit = (data: FormData) => {

    dispatch(setUser({
      name: data.username,
      email: data.email,
      age: data.age,
      sex: data.sex,
      password: data.password,
      terms: data.terms,
      image: data.image,
      contry: data.country,
    }));
    onClose();
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <button onClick={onClose}>Close</button>
            <div>
                <h3>Controled Form</h3>
                <div>
                    <label  htmlFor="username">
                    Name
                    </label>
                    <input id="username" {...register("username")}/>
                    {errors.username && <p className="errors">{errors.username.message}</p>}
                </div>
                <div>
                    <label  htmlFor="age">
                    Age
                    </label>
                    <input  type="number" id="age"  {...register("age", { valueAsNumber: true })}/>
                    {errors.age && <p className="errors">{errors.age.message}</p>}
                </div>
                <div>
                    <label  htmlFor="email">
                    Email
                    </label>
                    <input id="email" {...register("email")}/>
                    {errors.email && <p className="errors">{errors.email.message}</p>}
                </div>
                <div>
                    <label  htmlFor="password">
                    Password
                    </label>
                    <input type="password" id="password" {...register("password")}/>
                    {errors.password && <p className="errors">{errors.password.message}</p>}
                </div>
                <div>
                    <label  htmlFor="passwordRepit">
                    Please repeat password
                    </label>
                      <input type="password" id="passwordRepit" {...register("passwordRepit")} />
                    {errors.passwordRepit && <p className="errors">{errors.passwordRepit.message}</p>}
                </div>
                <div>
                    <label  htmlFor="sex">
                    Gender
                    </label>
                    <input id="sex" {...register("sex")}/>
                    {errors.sex && <p className="errors">{errors.sex.message}</p>}
                </div>
                <div>
                    <label  htmlFor="terms">
                    Client's terms
                    </label>
                    <input  type="checkbox" id="terms" {...register("terms")}/>
                    {errors.terms && <p className="errors">{errors.terms.message}</p>}
                </div>
                <div>
                    <label  htmlFor="image">
                    Image
                    </label>
                    <input id="image" {...register("image")}/>
                    {errors.image && <p className="errors">{errors.image.message}</p>}
                </div>
                <div>
                    <label htmlFor="country">
                    Country
                    </label>
                    <input list="countries" id="country" {...register("country")} />
                    <datalist id="countries">
        {countries.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      {errors.country && <p className="errors">{errors.country.message}</p>}
                </div>
            </div>
            <button>Submit</button>
        </form>
  );
}