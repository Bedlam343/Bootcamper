import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { v4 as uuidv4 } from 'uuid';

const Form = ({ onSubmit, onCancel }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data._id = data._id || uuidv4();
    onSubmit(data);
  };

  return (
    <Grid
      onSubmit={handleSubmit}
      component="form"
      id="bootcamp-form"
      container
      spacing={3}
    >
      <Grid item xs={12}>
        <TextField
          required
          id="title"
          name="title"
          label="Title"
          fullWidth
          variant="standard"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="description"
          name="description"
          label="Description"
          fullWidth
          variant="standard"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="weeks"
          name="weeks"
          label="Duration"
          fullWidth
          type="number"
          variant="standard"
          InputProps={{
            inputProps: { min: 1, max: 52 },
            endAdornment: <InputAdornment position="end">Weeks</InputAdornment>,
          }}
          InputLabelProps={{ shrink: true }}
          placeholder="[1-52]"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="tuition"
          name="tuition"
          label="Tuition"
          fullWidth
          type="number"
          variant="standard"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl required fullWidth variant="standard">
          <InputLabel shrink>Skill Level</InputLabel>
          <Select
            name="minimumSkill"
            defaultValue=""
            required
            label="Skill Level"
          >
            <MenuItem hidden value="">
              Select Skill Level
            </MenuItem>
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="scholarshipsAvailable" value={true} />}
          label={
            <Typography fontSize="15px">Scholarships Available</Typography>
          }
        />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
};

export default Form;
