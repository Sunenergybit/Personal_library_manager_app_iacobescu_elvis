import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import './App.css';
import BookList from './components/Booklist';
import { Library, Book } from './models/book';
import axios from 'axios';
import { Drawer, Box, IconButton, Snackbar, Alert  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BookForm from './components/BookForm';
import AppHeader from './components/AppHeader';
import { apiLocation} from './utils/common';
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

function App() {
  const { data: books, error } = useSWR<Library>(`${apiLocation}/books`, fetcher);
  const [snackbarError, setSnackbarError] = useState<string | null>(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);
  
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

  const handleDeleteClick = (bookId: number | null) => {
    if(bookId){
      setOpenDeleteConfirm(true);
      setBookToDelete(bookId);
    }
  };
  
  const handleConfirmDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete);
    }
    setOpenDeleteConfirm(false);
  };
  
  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };
  
  const deleteBook = (bookId: number | null) => {
    if (bookId) {
      axios.delete(`${apiLocation}/books/${bookId}`)
        .then(() => {
          mutate(`${apiLocation}/books`);
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
    console.log(updatedBook.id);
    
    if (updatedBook.id) {
      axios.put(`${apiLocation}/books/${updatedBook.id}`, updatedBook)
        .then(() => {
          mutate(`${apiLocation}/books`);
          setSnackbarError(null);
          toggleDrawer();
        })
        .catch(error => {
          setSnackbarError("Failed to update the book. Please try again.");
        });
    } else {
      axios.post(`${apiLocation}/books`, updatedBook)
        .then(response => {
          mutate(`${apiLocation}/books`);
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
          <BookForm initialValues={selectedBook} onSubmit={handleFormSubmit} deleteBook={handleDeleteClick} />
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
     
      <ConfirmDeleteDialog
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default App;
