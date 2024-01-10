import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";

import BootcampDetails from "components/Bootcamp/Create/BootcampForm";
import AddCourses from "components/Bootcamp/Create/AddCourses";
import Review from "components/Bootcamp/Create/Review";
import Loading from "common/Loading";
import Modal from "modal/Modal";
import { useAuth } from "store/AuthProvider";

const steps = ["Bootcamp Details", "Bootcamp Courses", "Review & Publish"];

// const d = {
//   bootcamp: {
//     name: "Code Breakers",
//     description:
//       "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
//     website: "codemasters.com",
//     phone: "(333) 333-3333",
//     email: "enroll@codemasters.com",
//     address: "85 South Prospect Street Burlington VT 05405",
//     city: "Burlington",
//     state: "Vermont",
//     zipcode: "05405",
//     country: "USA",
//     street: "85 South Prospect Street",
//     careers: ["Web Development", "Data Science", "Business"],
//     housing: false,
//     jobAssistance: false,
//     jobGuarantee: false,
//     acceptGi: false,
//   },
//   courses: [
//     {
//       title: "Front End Web Development",
//       description:
//         "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
//       weeks: 8,
//       tuition: 8000,
//       minimumSkill: "beginner",
//       scholarshipsAvailable: true,
//     },
//     {
//       title: "Full Stack Web Development",
//       description:
//         "In this course you will learn full stack web development, first learning all about the frontend with HTML/CSS/JS/Vue and then the backend with Node.js/Express/MongoDB",
//       weeks: 12,
//       tuition: 10000,
//       minimumSkill: "intermediate",
//       scholarshipsAvailable: true,
//     },
//     {
//       title: "IOS Development",
//       description:
//         "Get started building mobile applications for IOS using Swift and other tools",
//       weeks: 8,
//       tuition: 6000,
//       minimumSkill: "intermediate",
//       scholarshipsAvailable: false,
//     },
//   ],
// };

const getStepContent = (step, props) => {
  const {
    nextStep,
    previousStep,
    discardBootcamp,
    publishBootcamp,
    onBootcampFormSubmit,
    bootcamp,
    error,
    courses,
    addCourse,
  } = props;

  switch (step) {
    case 0:
      return (
        <BootcampDetails
          bootcamp={bootcamp}
          onCancel={discardBootcamp}
          onBootcampFormSubmit={onBootcampFormSubmit}
          error={error}
          rightBtnText="Next"
        />
      );
    case 1:
      return (
        <AddCourses
          courses={courses}
          onNext={nextStep}
          onBack={previousStep}
          onAddCourse={addCourse}
        />
      );
    case 2:
      return (
        <Review
          bootcamp={bootcamp}
          courses={courses}
          onBack={previousStep}
          onNext={publishBootcamp}
        />
      );
    default:
      throw new Error("Invalid step");
  }
};

const CreateBootcamp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({
    bootcamp: {},
    courses: [],
  });
  const [displayModal, setDisplayModal] = useState(false);
  const [error, setError] = useState("");

  const { token } = useAuth();

  const submit = useSubmit();
  const navigate = useNavigate();
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.error) {
      setDisplayModal(false);
      setError(actionData.error);
      setActiveStep(0);
    }
  }, [actionData]);

  const { bootcamp, courses } = data;

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const previousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const discardBootcamp = () => {
    navigate(-1);
  };

  const publishBootcamp = () => {
    setError("");
    setDisplayModal(true);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("token", token);
    submit(formData, { method: "POST" });
  };

  const onBootcampFormSubmit = (data) => {
    setData((prevData) => {
      return {
        ...prevData,
        bootcamp: data,
      };
    });
    nextStep();
  };

  const addCourse = (data) => {
    setData((prevData) => {
      return {
        ...prevData,
        courses: [...prevData.courses, data],
      };
    });
  };

  const handleModalClose = () => {
    setDisplayModal(false);
  };

  const renderUploadingModal = () => {
    if (displayModal) {
      return (
        <Modal open={displayModal} onClose={handleModalClose}>
          <Typography variant="h5" align="center" mb="0.5em">
            Publishing
          </Typography>
          <Loading />
        </Modal>
      );
    }
    return null;
  };

  const stepProps = {
    onBootcampFormSubmit,
    nextStep,
    previousStep,
    discardBootcamp,
    publishBootcamp,
    addCourse,
    error,
    bootcamp,
    courses,
  };

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Create Bootcamp
          </Typography>

          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep, stepProps)}
        </Paper>
      </Container>
      {renderUploadingModal()}
    </>
  );
};

export default CreateBootcamp;
