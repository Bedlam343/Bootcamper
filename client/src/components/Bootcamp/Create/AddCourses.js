import { Box, Button, Typography } from "@mui/material";
import Modal from "modal/Modal";
import { PropTypes } from "prop-types";
import { useState } from "react";
import CourseForm from "components/Course/Form";
import CoursesList from "components/Course/List";

const AddCourses = ({ courses, onAddCourse, onNext, onBack }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (data) => {
    onAddCourse(data);
    handleClose();
  };

  console.log(courses);

  const renderModal = () => {
    if (open) {
      return (
        <Modal open={open} onClose={handleClose}>
          <Typography variant="h5" align="center" mb="0.5em">
            New Course
          </Typography>
          <CourseForm onSubmit={handleFormSubmit} onCancel={handleClose} />
        </Modal>
      );
    }
    return null;
  };

  const renderCoursesList = () => {
    if (courses.length > 0) {
      return (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="stretch"
          mt={3}
          gap={2}
        >
          <CoursesList courses={courses} evenWidth />
        </Box>
      );
    }
    return (
      <Typography sx={{ mt: 2 }} fontStyle="italic" align="center">
        No courses added.
      </Typography>
    );
  };

  return (
    <>
      <Typography variant="h6">Add Courses for Bootcamp</Typography>
      <Button onClick={handleOpen} variant="contained" sx={{ mt: 2 }}>
        Add Course
      </Button>

      {renderCoursesList()}

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={onBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>
        <Button
          onClick={onNext}
          type="submit"
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
        >
          Next
        </Button>
      </Box>
      {renderModal()}
    </>
  );
};

AddCourses.propTypes = {
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  coursesFormData: PropTypes.arrayOf(PropTypes.shape()),
};

AddCourses.defaultProps = {
  onNext: () => {},
  onBack: () => {},
  coursesFormData: [],
};

export default AddCourses;
