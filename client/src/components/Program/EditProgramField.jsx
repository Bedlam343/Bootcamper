import Button from 'components/ui/Button';
import TextField from 'components/ui/TextField';
import { capitalizeFirstLetter as cfl } from 'util/helpers';

const EditProgramField = ({ value, field, onCancel, onSave }) => {
  const render = () => {
    switch (field) {
      case 'name':
        return <TextField defaultValue={value} label={cfl(field)} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-black 
    px-6 py-4 border-2 border-white rounded-[10px]"
    >
      <p className="text-white text-2xl font-cairo mb-6">Edit {cfl(field)}</p>
      {render()}
      <div className="flex justify-end gap-4 w-[100%] mt-8">
        <Button onClick={onCancel} danger>
          Cancel
        </Button>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

export default EditProgramField;
