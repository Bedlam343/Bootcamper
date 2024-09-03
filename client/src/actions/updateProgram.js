import { updateBootcamp } from 'service';

const updateProgram = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const program = JSON.parse(data.program);
  const token = data.token;

  try {
    await updateBootcamp(program, program.id, token);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};

export default updateProgram;
