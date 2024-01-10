import { Container, Paper, Typography } from "@mui/material";
import Loading from "common/Loading";
import BootcampForm from "components/Bootcamp/Create/BootcampForm";
import Modal from "modal/Modal";
import { useEffect, useState } from "react";
import {
  redirect,
  useActionData,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import { updateBootcamp } from "service";
import { useAuth } from "store/AuthProvider";
import { useBootcamp } from "store/BootcampProvider";
import { splitAddress } from "util/helpers";

const EditBootcamp = () => {
  const { bootcamp, setBootcamp } = useBootcamp();
  const submit = useSubmit();
  const navigate = useNavigate();
  const { bootcampId } = useParams();

  console.log(bootcampId);

  const actionData = useActionData();
  const [displayModal, setDisplayModal] = useState(false);

  const { token } = useAuth();

  if (!bootcamp.street) {
    const { street, city, state, zipcode, country } = splitAddress(
      bootcamp.address
    );
    bootcamp.street = street;
    bootcamp.city = city;
    bootcamp.state = state;
    bootcamp.zipcode = zipcode;
    bootcamp.country = country;
  }

  useEffect(() => {
    if (actionData?.error) {
      setDisplayModal(false);
    }
  }, [actionData]);

  const handleModalClose = () => {
    setDisplayModal(false);
  };

  const onCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (modifiedBootcamp) => {
    console.log(modifiedBootcamp);
    setBootcamp(modifiedBootcamp);
    setDisplayModal(true);
    const formData = new FormData();
    formData.append("bootcamp", JSON.stringify(modifiedBootcamp));
    formData.append("token", token);
    submit(formData, { method: "PUT" });
  };

  const renderUploadingModal = () => {
    if (displayModal) {
      return (
        <Modal open={displayModal} onClose={handleModalClose}>
          <Typography variant="h5" align="center" mb="0.5em">
            Saving Changes
          </Typography>
          <Loading />
        </Modal>
      );
    }
    return null;
  };

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <BootcampForm
            onCancel={onCancel}
            onBootcampFormSubmit={handleSubmit}
            bootcamp={bootcamp}
            error={actionData?.error}
            rightBtnText="Save"
          />
        </Paper>
      </Container>
      {renderUploadingModal()}
    </>
  );
};

export const action = async ({ request, params }) => {
  const bootcampId = params.bootcampId;
  const formData = await request.formData();
  const bootcamp = JSON.parse(formData.get("bootcamp"));
  const token = formData.get("token");

  try {
    await updateBootcamp(bootcamp, bootcampId, token);
  } catch (error) {
    console.log(error);

    if (error.response.status === 400) {
      return error.response.data;
    }

    return {
      error: "Something went wrong. Please try again later.",
    };
  }

  return redirect(`/bootcamps/${bootcampId}`);
};

export default EditBootcamp;
