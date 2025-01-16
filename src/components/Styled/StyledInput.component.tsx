import { styled, TextField } from "@mui/material";

export const StyledInput = styled(TextField)({
  input: {
      color: '#E0E3E7'
  },
  '& label.Mui-focused': {
      color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
  },
  '.MuiFormLabel-root': {
      color: '#E0E3E7'
  },
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
          borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
          borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
          borderColor: '#6F7E8C',
      },
  },
});
