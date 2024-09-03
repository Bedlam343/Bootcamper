import Editable from 'components/ui/Editable';
import UnitList from 'components/Unit/UnitList';
import { useEffect, useRef, useState } from 'react';
import Careers from 'components/Program/Careers';
import Tag from 'components/ui/Tag';
import Modal from 'modal/Modal';
import Edit from 'components/Program/Edit/Edit';
import UnitForm from 'components/Unit/UnitForm';
import ConfirmationModal from 'modal/ConfirmationModal';
import { useSubmit } from 'react-router-dom';
import { useAuth } from 'store/AuthProvider';
import Button from 'components/ui/Button';

const ProgramDetails = ({ program, style = {}, onChange, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editFields, setEditFields] = useState([]);
  const [unitModal, setUnitModal] = useState({ modal: '', unit: null });

  const { token } = useAuth();

  const submit = useSubmit();

  const imageRef = useRef();

  useEffect(() => {
    handleEditClick(null);
    clearUnitModal();
  }, [program]);

  if (!program) return null;

  const toggleEditState = () => {
    setIsEditing(!isEditing);
  };

  const handleEditClick = (fields) => {
    setEditFields(fields);
  };

  const handleFieldChange = (newData) => {
    onChange(newData);
  };

  const clearUnitModal = () => {
    setUnitModal({ modal: '', unit: null });
  };

  const handleUnitChange = (title, description, id) => {
    const unit = { title, description };
    if (id) unit._id = id;

    const formData = new FormData();
    formData.append('unit', JSON.stringify(unit));
    formData.append('token', token);
    formData.append('action', id ? 'update-unit' : 'add-unit');
    formData.append('bootcampId', program.id);

    submit(formData, { method: 'POST' });
  };

  const handleDeleteUnit = () => {
    const formData = new FormData();
    formData.append('unitId', unitModal.unit._id);
    formData.append('action', 'delete-unit');
    formData.append('token', token);
    submit(formData, { method: 'POST' });
  };

  const programDuration =
    program.weeks ||
    program.courses.reduce((acc, course) => acc + Number(course.weeks), 0);

  return (
    <>
      <div
        style={{ ...style }}
        className="sm:max-w-[750px] overflow-auto bg-lightBlack"
      >
        <div ref={imageRef} className="group">
          <img
            src={program.photo}
            alt=""
            className={`w-[100%] h-[300px] object-cover ${
              isEditing && 'group-hover:cursor-pointer group-hover:opacity-50'
            }`}
          />
          {/* {isEditing && (
            <div
              style={{
                top: imageTop / 2,
              }}
              className="absolute left-1/2"
            >
              <img
                src="/assets/edit.png"
                alt="Pencil"
                className="w-[50px] h-[50px] group-hover:cursor-pointer bg-transparent"
              />
            </div>
          )} */}
        </div>

        <div className="flex justify-end px-6 pt-4 gap-4">
          <div
            onClick={toggleEditState}
            className="h-[40px] w-[100px] flex items-center 
          justify-center bg-easyWhite rounded-full border-4 border-black z-50 font-cairo
          hover:cursor-pointer hover:bg-white"
          >
            {isEditing ? 'Done' : 'Edit'}
          </div>
          <div
            onClick={onClose}
            className="h-[40px] w-[100px] flex items-center 
          justify-center bg-easyWhite rounded-full border-4 border-black z-50 font-cairo
          hover:cursor-pointer hover:bg-white"
          >
            Close
          </div>
        </div>

        <div className="px-8 py-6">
          <Editable
            active={isEditing}
            iconSize={35}
            gap={40}
            onClick={() => handleEditClick(['name'])}
          >
            <p className="text-4xl text-white font-cairo">{program.name}</p>
          </Editable>

          <div className="mt-4" />

          <Editable
            active={isEditing}
            iconSize={35}
            gap={50}
            onClick={() =>
              handleEditClick([
                'careers',
                'averageCost',
                'weeks',
                'jobGuarantee',
                'jobAssistance',
              ])
            }
          >
            <div>
              <div className="flex gap-x-3 items-center">
                <img
                  src="/assets/target.png"
                  alt="Location"
                  className="h-[20px] w-[20px]"
                />
                <Careers careers={program.careers} />
              </div>

              <Tag
                text={`Average Cost: $${program.averageCost}`}
                imgSize={20}
                imgSrc="/assets/cash.png"
                imgAlt="Average Cost"
              />

              <Tag
                text={`Duration: ${programDuration} weeks`}
                imgSrc="/assets/calendar.png"
                imgAlt="Duration"
              />

              {program.jobGuarantee && (
                <Tag
                  text="Job Guarantee"
                  imgSrc="/assets/guarantee.png"
                  alt="Job Guarantee"
                />
              )}

              {program.jobAssistance && (
                <Tag
                  text="Job Assistance"
                  imgSrc="/assets/handshake.png"
                  imgAlt="Job Assistance"
                />
              )}
            </div>
          </Editable>

          <div className="mt-8">
            <Editable
              active={isEditing}
              iconSize={30}
              gap={40}
              onClick={() => handleEditClick(['description'])}
            >
              <p className="text-2xl font-cairo text-white">Description</p>
            </Editable>
            <p className="font-cairo text-gray-300 mt-1">
              {program.description}
            </p>
          </div>

          <div className="mt-8">
            <p className="text-2xl font-cairo text-white">Course Breakdown</p>

            <div className="w-[100%] flex justify-center mt-8">
              <div className="w-[80%] flex flex-col gap-y-6">
                <UnitList
                  units={program.courses}
                  editable={isEditing}
                  onEdit={(id) =>
                    setUnitModal({
                      modal: 'form',
                      unit: program.courses.find((course) => course._id === id),
                    })
                  }
                  onDelete={(id) =>
                    setUnitModal({
                      modal: 'confirmation',
                      unit: program.courses.find((course) => course._id === id),
                    })
                  }
                />
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => setUnitModal({ modal: 'form', unit: null })}
                >
                  New Unit
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal open={editFields?.length}>
        <Edit
          program={program}
          fields={editFields}
          onSave={(newData) => handleFieldChange(newData)}
          onCancel={() => handleEditClick(null)}
        />
      </Modal>

      <Modal open={unitModal.modal === 'form'}>
        <UnitForm
          onCancel={clearUnitModal}
          onConfirm={handleUnitChange}
          units={program.courses}
          unit={unitModal.unit}
        />
      </Modal>

      <ConfirmationModal
        open={unitModal.modal === 'confirmation'}
        onCancel={clearUnitModal}
        onConfirm={handleDeleteUnit}
        title="Are you sure you want to delete this unit?"
      />
    </>
  );
};

export default ProgramDetails;
