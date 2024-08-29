import { useState } from 'react';
import Button from 'components/ui/Button';
import Modal from 'modal/Modal';
import UnitForm from 'components/Unit/UnitForm';
import UnitList from 'components/Unit/UnitList';
import ConfirmationModal from 'modal/ConfirmationModal';

const Units = () => {
  const [counter, setCounter] = useState(1);
  const [editUnit, setEditUnit] = useState(null);
  const [units, setUnits] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);

  const toggleDisplayForm = () => {
    setDisplayForm(!displayForm);
  };

  const toggleConfirmationModal = () => {
    setDisplayConfirmationModal(!displayConfirmationModal);
  };

  const handleConfirm = (title, description, id) => {
    if (id) {
      setUnits((currUnits) => {
        const updatedUnits = [];
        currUnits.forEach((unit) => {
          if (unit._id === id) {
            updatedUnits.push({ id, title, description });
          } else {
            updatedUnits.push(unit);
          }
        });
        return updatedUnits;
      });
      setEditUnit(null);
    } else {
      setUnits((currUnits) => [
        ...currUnits,
        { _id: counter, title, description },
      ]);
      setCounter(counter + 1);
    }

    toggleDisplayForm();
  };

  const handleUnitEdit = (id) => {
    setEditUnit(units.find((u) => u._id === id));
    toggleDisplayForm();
  };

  const handleDeleteUnit = () => {
    setUnits((currUnits) => {
      const updatedUnits = [];
      currUnits.forEach((unit) => {
        if (unit._id !== editUnit) updatedUnits.push(unit);
      });
      return updatedUnits;
    });
    setEditUnit(null);
    toggleConfirmationModal();
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center">
          <p className="text-white font-cairo text-2xl">Add Units</p>
          <Button onClick={toggleDisplayForm}>New Unit</Button>
        </div>

        {units.length === 0 ? (
          <p className="italic font-cairo text-gray-400 text-lg text-center mt-10">
            No Units Added.
          </p>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-6">
            <UnitList
              units={units}
              editable
              onEdit={handleUnitEdit}
              onDelete={(id) => {
                toggleConfirmationModal();
                setEditUnit(id);
              }}
            />
          </div>
        )}

        <Modal open={displayForm}>
          <UnitForm
            onCancel={() => {
              toggleDisplayForm();
              setEditUnit(null);
            }}
            onConfirm={handleConfirm}
            units={units}
            unit={editUnit}
          />
        </Modal>

        <ConfirmationModal
          open={displayConfirmationModal}
          onCancel={toggleConfirmationModal}
          onConfirm={handleDeleteUnit}
          title="Are you sure you want to delete this unit?"
        />
      </div>
    </>
  );
};

export default Units;
