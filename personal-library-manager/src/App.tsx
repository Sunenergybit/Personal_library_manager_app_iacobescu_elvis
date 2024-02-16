import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import './App.css';
import BookList from './components/Booklist';
import {Library,Book} from './models/book';
import axios from 'axios';
import { Drawer, Box, IconButton, Snackbar, Alert  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BookForm from './components/BookForm';
import AppHeader from './components/AppHeader';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

// error hadling this is not the onli place where error might apear add a generic error handler 
// we need some validation for the form.
function App() {
  const { data: books, error } = useSWR<Library>('http://localhost:3001/books', fetcher);
  const [snackbarError, setSnackbarError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book>({
    id: null,
    date: null,
    genre:[],
    name: '',
    bookmark: 0,
    read: false,
    author: ''
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarError(null);
  };

  const addNew = () => {
    setSelectedBook({
      id: null,
      date: null,
      genre:[],
      name: '',
      bookmark: 0,
      read: false,
      author: ''
    });
    toggleDrawer();
  }
  
  const deleteBook = (bookId: number | null) => {
    if (bookId) {
      axios.delete(`http://localhost:3001/books/${bookId}`)
        .then(() => {
          mutate('http://localhost:3001/books');
          setSnackbarError(null);
          toggleDrawer();
        })
        .catch(error => {
          setSnackbarError("Failed to delete the book. Please try again.");
        });
    }
    toggleDrawer();
  };
  
  
  const handleFormSubmit = (updatedBook: Book) => {
    if (updatedBook.id) {
      axios.put(`http://localhost:3001/books/${updatedBook.id}`, updatedBook)
        .then(() => {
          mutate('http://localhost:3001/books');
          setSnackbarError(null);
          toggleDrawer();
        })
        .catch(error => {
          setSnackbarError("Failed to update the book. Please try again.");
        });
    } else {
      axios.post('http://localhost:3001/books', updatedBook)
        .then(response => {
          mutate('http://localhost:3001/books');
          setSnackbarError(null);
          toggleDrawer();
        })
        .catch(error => {
          setSnackbarError("Failed to add the book. Please try again.");
        });
    }
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    toggleDrawer();
  };

  return (
    <div className="App">
      <AppHeader addNew={addNew} />
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <Box
          flex={"flex"}
          sx={{ padding: 2 }}
          role="presentation"
        >
         <Box
          flex={"flex"}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
          role="presentation"
          >
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <BookForm initialValues={selectedBook} onSubmit={handleFormSubmit} deleteBook={deleteBook} />
        </Box>
      </Drawer>
       {
        !error && (<BookList books={books} setSelectedBook={handleEditBook} />)
       }
      <Snackbar open={snackbarError !== null} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarError}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
