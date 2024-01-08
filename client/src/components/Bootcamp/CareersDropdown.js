import { useState } from "react";
import {
  Stack,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Chip,
  Select,
  FormControl,
  Grid,
} from "@mui/material";
import { PropTypes } from "prop-types";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

import { CAREERS } from "util/constants";

const CareersDropdown = ({ careers, required }) => {
  const [selectedCareers, setselectedCareers] = useState(careers);

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel required={required}>Careers</InputLabel>
        <Select
          required={required}
          multiple
          name="careers"
          value={selectedCareers}
          onChange={(e) => setselectedCareers(e.target.value)}
          input={<OutlinedInput label="careers-select" />}
          renderValue={(selected) => (
            <Stack gap={1} direction="row" flexWrap="wrap">
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() =>
                    setselectedCareers(
                      selectedCareers.filter((item) => item !== value)
                    )
                  }
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                />
              ))}
            </Stack>
          )}
        >
          {CAREERS.map((career) => (
            <MenuItem
              key={career}
              value={career}
              sx={{ justifyContent: "space-between" }}
            >
              {career}
              {selectedCareers.includes(career) ? (
                <CheckIcon color="info" />
              ) : null}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

// const MultiAutocomplete = () => {
//   return (
//     <Grid item xs={12} sm={6}>
//       <Autocomplete
//         fullWidth
//         multiple
//         id="tags-standard"
//         options={careers}
//         getOptionLabel={(option) => option}
//         defaultValue={[careers[0], careers[1]]}
//         disableCloseOnSelect
//         renderOption={(props, option, { selected }) => (
//           <MenuItem
//             key={option}
//             value={option}
//             sx={{ justifyContent: "space-between" }}
//             {...props}
//           >
//             {option}
//             {selected ? <CheckIcon color="info" /> : null}
//           </MenuItem>
//         )}
//         renderInput={(params) => (
//           <TextField {...params} variant="outlined" label="Selected Careers" />
//         )}
//       />
//     </Grid>
//   );
// };

CareersDropdown.propTypes = {
  careers: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
};

CareersDropdown.defaultProps = {
  careers: [],
  required: false,
};

export default CareersDropdown;
