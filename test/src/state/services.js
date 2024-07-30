import { auth, db } from '../main';
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';



// Fetch all books from Firestore
export const fetchBooks = async () => {
  console.log('fetching books service')
  const querySnapshot = await getDocs(collection(db, 'books'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Create a new book in Firestore
export const createBook = async (book) => {
  console.log(book);
  const bookData = {
    author: book.author,
    title: book.title,
    year: book.year,
    coverPath: book.coverPath,
    coverUrl: book.coverUrl,
    pdfPath: book.pdfPath,
    pdfUrl: book.pdfUrl,
    userId: book.userId // Ensure that userId is included
  };
  const docRef = await addDoc(collection(db, 'books'), bookData);
  return { id: docRef.id, ...bookData };
};

// Update an existing book in Firestore
export const updateBook = async (book) => {
  console.log(book);
  const bookData = {
    author: book.author,
    title: book.title,
    year: book.year,
    coverPath: book.coverPath,
    coverUrl: book.coverUrl,
    pdfPath: book.pdfPath,
    pdfUrl: book.pdfUrl,
    userId: book.userId // Ensure that userId is included
  };
  const bookRef = doc(db, 'books', book.id);
  await updateDoc(bookRef, bookData);
  return { id: book.id, ...bookData };
};

// Delete a book from Firestore
export const deleteBook = async (bookId) => {
  await deleteDoc(doc(db, 'books', bookId));
  return bookId;
};

// Login function, checking for admin or regular user
export const login = async ({ email, password }) => {
  const ADMIN_EMAIL = 'admin@example.com';
  const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123', 10); // Example password hash

  if (email === ADMIN_EMAIL && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
    return { email, isAdmin: true };
  } else {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { email: userCredential.user.email, uid: userCredential.user.uid };
  }
};

// Register a new user
export const registerUser = async ({ email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return { email: userCredential.user.email, uid: userCredential.user.uid };
};

// Logout function
export const logout = async () => {
  await signOut(auth);
};
