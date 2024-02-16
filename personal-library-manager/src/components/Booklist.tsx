import React from 'react';
import { CircularProgress, Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import logo from '../imgs/logo.png';
import lib from '../imgs/lib.jpg';
import { Library, Book } from '../models/book';

interface BookListComponentProps {
  books?: Library;
  setSelectedBook: (book: Book ) => void;
}

const BookListComponent: React.FC<BookListComponentProps> = ({books, setSelectedBook}) => {
  return (
    <Box sx={{ flexGrow: 1, 
      paddingX: 2, 
      paddingY: 4,
      minHeight: 'calc(100vh - 125px)',
      backgroundImage: `url(${lib})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',}}>
    <Grid container spacing={2}>
      {!books && <CircularProgress />}
      {books?.map((book) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={1.5} key={book.id} sx={{height: 'calc(100% - 50px)'}}>
          <Card>
            <CardContent sx={{position: 'relative', height: '200px', overflow: 'auto'}}>
              <Box sx={{
                  backgroundImage: `url(${logo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'absolute',
                  opacity: 0.02,
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
              }}  />

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography 
                  variant="h5" 
                  component="div"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '75%',
                    
                  }}
                >
                  {book.name}
                </Typography>
                <IconButton size="small" color="primary" onClick={() => setSelectedBook(book)}>
                  <EditIcon />
                </IconButton>
              </Box>
              <Typography color="text.secondary">Author: {book.author}</Typography>
              <Typography color="text.secondary">Genre:
                {book.genre.length > 0 && book.genre?.map((val,i) => i === book.genre.length - 1 ? val : `${val}, `)}</Typography>
              <Typography color="text.secondary">Bookmark: {book.bookmark}</Typography>
              <Typography color="text.secondary">Read: {book.read ? 'Yes' : 'No'}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
  );
}

export default BookListComponent;
