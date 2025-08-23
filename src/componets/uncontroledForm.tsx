import { createPortal } from 'react-dom';
import { useState } from 'react';

import ContentUncontroledForm from './contentUncomtroledForm';


export default function PortalUncontroledForm() {
   const [showModal, setShowModal] = useState(false);
    return (
       <>
         <button onClick={() => setShowModal(true)}>
           Show the uncontroled Form
         </button>
         {showModal && createPortal(
           <ContentUncontroledForm onClose={() => setShowModal(false)} />,
           document.body
         )}
       </>
     );
}