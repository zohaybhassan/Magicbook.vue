import { auth, db } from '../main'; // Import the Firebase instances
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';

const ADMIN_EMAIL = 'admin@zohaib.com';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('16951', 10);

// Fetch all books from Firestore
export const fetchBooks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'books'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};

// Create a new book in Firestore
export const createBook = async (book) => {
  const bookData = {
    author: book.author,
    title: book.title,
    year: book.year
  };
  try {
    const docRef = await addDoc(collection(db, 'books'), bookData);
    return { id: docRef.id, ...bookData };
  } catch (error) {
    console.error('Error creating book:', error);
    throw new Error('Failed to create book');
  }
};

// Update an existing book in Firestore
export const updateBook = async (book) => {
  const bookData = {
    author: book.author,
    title: book.title,
    year: book.year
  };
  try {
    const bookRef = doc(db, 'books', book.id);
    await updateDoc(bookRef, bookData);
    return { id: book.id, ...bookData };
  } catch (error) {
    console.error('Error updating book:', error);
    throw new Error('Failed to update book');
  }
};

// Delete a book from Firestore
export const deleteBook = async (bookId) => {
  try {
    await deleteDoc(doc(db, 'books', bookId));
    return bookId;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw new Error('Failed to delete book');
  }
};

// Login function, checking for admin or regular user
export const login = async ({ email, password }) => {
  if (email === ADMIN_EMAIL && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
    return { email, isAdmin: true };
  } else {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { email: userCredential.user.email, uid: userCredential.user.uid };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Failed to login');
    }
  }
};

// Register a new user
export const registerUser = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { email: userCredential.user.email, uid: userCredential.user.uid };
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error('Failed to sign up');
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to logout');
  }
};