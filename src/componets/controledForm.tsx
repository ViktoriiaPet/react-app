import ModalContent from "./controledContent";

type Props = { onClose: () => void };

export default function ControledForm({ onClose }: Props) {
  return (
    <>
      <ModalContent onClose={onClose} />,
    </>
  );
}
