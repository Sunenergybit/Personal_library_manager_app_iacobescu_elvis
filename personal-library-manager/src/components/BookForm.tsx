import React from 'react';
import { Formik, Form, Field, FieldProps, FormikProps } from 'formik';
import { BookFormProps } from '../models/book';
import { genreOptions } from '../utils/common';
import { Grid, Button, Box, TextField, FormControl, FormControlLabel, Checkbox, InputLabel, Select, OutlinedInput, Chip, MenuItem, FormHelperText } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Book } from '../models/book';

interface BookValidationErrors {
    name?: string;
    author?: string;
    genre?: string;
  }

const BookForm: React.FC<BookFormProps> = ({ initialValues, onSubmit, deleteBook }) => {
    const validate = (values: Book) => {
        const errors: BookValidationErrors = {};
        if (!values.name) {
            errors.name = 'This field is required';
        }
        
        if (!values.author) {
          errors.author = 'This field is required';
        } else if (values.author.length < 3) {
         errors.author = 'This field needs to be at least 3 characters long';
        }

        if (values.genre.length === 0) {
            errors.genre = 'At least one genre must be selected';
          }
        return errors;
    };
      
  return (
<Box>
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, { setSubmitting }) => {
      if (onSubmit) {
        onSubmit(values);
      }
      setSubmitting(false);
    }}
  >
    {(formikProps: FormikProps<Book>) => (
          <Form>
            <Field name="name">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Book Name"
                  fullWidth
                  margin="normal"
                  error={Boolean(formikProps.touched.name && formikProps.errors.name)}
                  helperText={formikProps.touched.name && formikProps.errors.name}
                />
              )}
            </Field>
            <Field name="author">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Author"
                  fullWidth
                  margin="normal"
                  error={Boolean(formikProps.touched.author && formikProps.errors.author)}
                  helperText={formikProps.touched.author && formikProps.errors.author}
                />
              )}
            </Field>
            <Field name="bookmark" type="number" as={TextField} label="Bookmark" fullWidth margin="normal" />
            <FormControl fullWidth margin="normal" error={Boolean(formikProps.touched.genre && formikProps.errors.genre)}>
                <InputLabel>Genre</InputLabel>
                <Field name="genre">
                    {({ field }: FieldProps) => (
                    <Select
                        {...field}
                        multiple
                        input={<OutlinedInput label="Genre" />}
                        value={formikProps.values.genre}
                        onChange={(event) => {
                        formikProps.setFieldValue("genre", event.target.value);
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
                {formikProps.touched.genre && formikProps.errors.genre && (
                    <FormHelperText>{formikProps.errors.genre}</FormHelperText>
                )}
            </FormControl>
            <FormControlLabel
            control={
                <Field
                name="read"
                type="checkbox"
                as={Checkbox}
                checked={formikProps.values.read}
                onChange={() => formikProps.setFieldValue("read", !formikProps.values.read)}
                />
            }
            label="Read"
            />
            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                <Grid item>
                <Button type="submit" variant="contained" color="primary" disabled={formikProps.isSubmitting} startIcon={<SaveIcon />}>
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