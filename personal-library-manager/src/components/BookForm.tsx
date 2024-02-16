import React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { BookFormProps } from '../models/book';
import { genreOptions } from '../common/common';
import { Grid, Button, Box, TextField, FormControl, FormControlLabel, Checkbox, InputLabel, Select, OutlinedInput, Chip, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const BookForm: React.FC<BookFormProps> = ({ initialValues, onSubmit, deleteBook }) => {
  return (
<Box>
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      // Invoke the passed onSubmit function if available
      if (onSubmit) {
        onSubmit(values);
      }
      setSubmitting(false);
    }}
  >
    {({ values, handleChange, setFieldValue, isSubmitting }) => (
      <Form>
        <Field name="name" as={TextField} label="Book Name" fullWidth margin="normal" />
        <Field name="author" as={TextField} label="Author" fullWidth margin="normal" />
        <Field name="bookmark" type="number" as={TextField} label="Bookmark" fullWidth margin="normal" />
        <FormControl fullWidth margin="normal">
          <InputLabel>Genre</InputLabel>
          <Field name="genre">
            {({ field }: FieldProps) => (
              <Select
                {...field}
                multiple
                input={<OutlinedInput label="Genre" />}
                value={values.genre}
                onChange={(event) => {
                  setFieldValue("genre", event.target.value);
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {genreOptions.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Field>
        </FormControl>
        <FormControlLabel
        control={
          <Field
            name="read"
            type="checkbox"
            as={Checkbox}
            checked={values.read}
            onChange={() => setFieldValue("read", !values.read)}
          />
        }
        label="Read"
      />
        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} startIcon={<SaveIcon />}>
              {initialValues.id ? 'Update' : 'save'}
            </Button>
          </Grid>
          {initialValues.id && (
            <Grid item>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => {
                if (deleteBook) {
                  deleteBook(initialValues.id);
                }
              }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
          )}
        </Grid>
      </Form>
    )}
  </Formik>
</Box>

  );
};

export default BookForm;
