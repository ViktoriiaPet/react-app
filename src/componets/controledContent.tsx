

type ModalContentProps = {
  onClose: () => void;
};

export default function ModalContent({ onClose } : ModalContentProps) {



  return (
    <form>
        <button onClick={onClose}>Close</button>
            <div>
                <h3>Controled Form</h3>
                <div>
                    <label>
                    Name
                    </label>
                    <input />
                </div>
                <div>
                    <label>
                    Age
                    </label>
                    <input />
                </div>
                <div>
                    <label>
                    Email
                    </label>
                    <input />
                </div>
                <div>
                    <label>
                    Password
                    </label>
                    <input />
                </div>
                <div>
                    <label>
                    Please repeat password
                    </label>
                    <input />
                </div>
                <div>
                    <label>
                    Sex
                    </label>
                    <input />
                </div>
                <div>
                    <label>
                    Client's terms
                    </label>
                    <input />
                </div>
                <div>
                    <label>
                    Image
                    </label>
                    <input />
                </div>
                <div>
                    <label>
                    Contry
                    </label>
                    <input />
                </div>
            </div>
            <button>Submit</button>
        </form>
  );
}