import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function ClientsForm() {
  const users = useSelector((state: RootState) => state.user.users);

  if (!users) {
    return <p>Users is not exist</p>;
  }

  return (
    <div>
      <h2>Клиенты</h2>
      <div className="clientsBlock">
        {users.map((u, i) => (
          <div key={i}>
            <p>Name: {u.name}</p>
            <p>Email: {u.email}</p>
            <p>Age: {u.age}</p>
            <p>Gender: {u.sex}</p>
            <p>Password: {u.password}</p>
            <p>Confirm password: {u.passwordRepit}</p>
            <p>Term: Yes</p>
            <p>Image:</p>
            <img src={`data:image/png;base64,${u.image}`} alt="clients image" />
            <p>Country: {u.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
