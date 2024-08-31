import { redirect } from 'react-router-dom';
import {
  createBootcamp,
  createCourse,
  getSignedUrl,
  uploadPhotoToGS,
} from 'service';
import { GS_BUCKET_NAME } from 'util/constants';
import { generateGsPublicUrl } from 'util/helpers';
import { queryClient } from 'queryClient';

const newProgram = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData.entries());
  const program = JSON.parse(data.program);
  program.careers = program.careers.split(',');
  program.jobGuarantee = program.jobGuarantee === 'on';
  program.jobAssistance = program.jobAssistance === 'on';

  const photo = data.photo;
  const courses = JSON.parse(data.courses);
  const token = data.token;

  const photoFilename = encodeURI(`${new Date().toISOString()}-${photo.name}`);

  try {
    // getSignedUrl from the backend
    const signedUrl = await getSignedUrl({
      action: 'write',
      fileName: photoFilename,
      fileType: photo.type,
      token,
    }).then(({ data }) => data.url);

    await uploadPhotoToGS(photo, signedUrl);

    // construct public url of the resource
    const photoUrl = generateGsPublicUrl(GS_BUCKET_NAME, photoFilename);
    program.photo = photoUrl;

    // create bootcamp
    let response = await createBootcamp(program, token);
    const bootcampId = response.data.data._id;

    // create courses
    const promises = [];
    courses.forEach((course) => {
      // delete temporary id before sending request
      delete course._id;
      promises.push(createCourse(course, bootcampId, token));
    });
    await Promise.all(promises);

    // re-fetch bootcamps
    queryClient.invalidateQueries({ queryKey: ['bootcamps'] });
    return redirect(`/programs#${bootcampId}`);
  } catch (error) {
    console.log(error);

    // delete bootcamp if courses were not added?

    return 'Error creating program.';
  }
};

export default newProgram;
