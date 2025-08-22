import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './controledContent';

export default function PortalControledForm() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show the controled Form
      </button>
      {showModal && createPortal(
        <ModalContent onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}
