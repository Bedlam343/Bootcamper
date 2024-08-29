import Button from 'components/ui/Button';

const { default: Modal } = require('components/ui/Modal');

const ConfirmationModal = ({ open, title, onConfirm, onCancel }) => {
  return (
    <Modal open={open}>
      <div className="w-[500px] border-2 border-white rounded-[10px] px-8 py-6">
        <p className="text-xl text-white text-center font-cairo">{title}</p>
        <div className="flex justify-between mt-10">
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm} danger>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
