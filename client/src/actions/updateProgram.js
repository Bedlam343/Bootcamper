import {
  createCourse,
  deleteCourse,
  updateBootcamp,
  updateCourse,
} from 'service';

const updateProgram = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const action = data.action;
  const token = data.token;

  try {
    if (action === 'update-program') {
      const program = JSON.parse(data.program);
      await updateBootcamp(program, program.id, token);
    } else if (action === 'update-unit') {
      const unit = JSON.parse(data.unit);
      await updateCourse(unit, token);
    } else if (action === 'delete-unit') {
      const unitId = data.unitId;
      await deleteCourse(unitId, token);
    } else if (action === 'add-unit') {
      const unit = JSON.parse(data.unit);
      const bootcampId = data.bootcampId;
      await createCourse(unit, bootcampId, token);
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};

export default updateProgram;
