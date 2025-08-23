import { createPortal } from 'react-dom';
import { useRef } from "react";
import { setUser } from "../feathures/formSubmit";
import {useDispatch } from "react-redux";
import { registrationSchema } from "../utils/validateRegistration";
import { useState } from 'react';


type UncontrolledModalProps = {
  onClose: () => void;
};

export default function ContentUncontroledForm({ onClose }: UncontrolledModalProps) {
    const dispatch = useDispatch();
    const formRef = useRef<HTMLFormElement | null>(null);
    const [errors, setErrors] = useState<Record<string, string[]>>({});


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    passwordRepit: formData.get("passwordRepit") as string,
    age: Number(formData.get("age")),
    sex: formData.get("sex") as "Male" | "Female" | "I don't now",
    terms: formData.get("terms") === "on",
    image: formData.get("image") as string,
    country: formData.get("country") as string,
    };

     const result = registrationSchema.safeParse(rawData);

    if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
        console.log(result.error.format());
      return;
    }

    setErrors({});
    dispatch(setUser(result.data));
    onClose();
  }

    return createPortal(
    <div>
      <div>
        <h2>Uncontrolled Form</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue=""
            />
             {errors.name && <p style={{color: "red"}}>{errors.name[0]}</p>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue=""
            />
             {errors.email && <p style={{color: "red"}}>{errors.email[0]}</p>}
          </div>
                    <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              defaultValue=""
            />
             {errors.age && <p style={{color: "red"}}>{errors.age[0]}</p>}
          </div>
                    <div>
            <label htmlFor="sex">Gender:</label>
            <input
              type="text"
              id="sex"
              name="sex"
              defaultValue=""
            />
             {errors.sex && <p style={{color: "red"}}>{errors.sex[0]}</p>}
          </div>
                    <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              defaultValue=""
            />
             {errors.password && <p style={{color: "red"}}>{errors.password[0]}</p>}
          </div>
                    <div>
            <label htmlFor="passwordRepit">Confirm password:</label>
            <input
              type="password"
              id="passwordRepit"
              name="passwordRepit"
              defaultValue=""
            />
             {errors.passwordRepit && <p style={{color: "red"}}>{errors.passwordRepit[0]}</p>}
          </div>
                    <div>
            <label htmlFor="terms">Terms:</label>
            <input
              type="checkbox"
              id="terms"
              name="terms"
              defaultValue=""
            />
             {errors.terms && <p style={{color: "red"}}>{errors.terms[0]}</p>}
          </div>
                    <div>
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              id="image"
              name="image"
              defaultValue=""
            />
             {errors.image && <p style={{color: "red"}}>{errors.image[0]}</p>}
          </div>
                    <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              defaultValue=""
            />
             {errors.country && <p style={{color: "red"}}>{errors.country[0]}</p>}
          </div>
          <div>
            <button type="submit">
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}