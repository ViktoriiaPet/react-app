import ControledForm from './componets/controledForm'
import UncontroledForm from './componets/uncontroledForm'
import ClientsForm from './componets/clientsForm'
import './App.css'
import { useState } from 'react'
import Modal from './componets/modalUniversal'

function App() {

   const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<"controlled" | "uncontrolled" | null>(null);

  const openControlled = () => { setFormType("controlled"); setIsOpen(true); };
  const openUncontrolled = () => { setFormType("uncontrolled"); setIsOpen(true); };
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      The main page
       <ClientsForm />
      <button onClick={openControlled}>Open Controlled Form</button>
      <button onClick={openUncontrolled}>Open Uncontrolled Form</button>

    {isOpen && (
     <Modal onClose={closeModal}>
    {formType === "controlled" && <ControledForm onClose={closeModal} />}
    {formType === "uncontrolled" && <UncontroledForm onClose={closeModal} />}
     </Modal>
)}
    </div>
  )
}

export default App
