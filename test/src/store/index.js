import { createStore } from 'vuex';
import bcrypt from 'bcryptjs';
import persistState from './persist';
import { auth } from '../main';
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, where, query } from 'firebase/firestore';
import { db } from '../main';

const ADMIN_EMAIL = 'admin@zohaib.com';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('16951', 10);

export default createStore({
  plugins: [persistState(500)],
  state: {
    user: null,
    books: [],
    borrowedBooks: [],
    genres: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 'Biography', 'Other']
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBooks(state, books) {
      state.books = books;
    },
    setBorrowedBooks(state, borrowedBooks) {
      state.borrowedBooks = borrowedBooks;
    },
    addBook(state, book) {
      state.books.push(book);
    },
    updateBook(state, updatedBook) {
      const index = state.books.findIndex(book => book.id === updatedBook.id);
      if (index !== -1) {
        state.books.splice(index, 1, updatedBook);
      }
    },
    deleteBook(state, bookId) {
      state.books = state.books.filter(book => book.id !== bookId);
    },
    borrowBook(state, borrowedBook) {
      state.borrowedBooks.push(borrowedBook);
    },
    returnBook(state, borrowedBookId) {
      state.borrowedBooks = state.borrowedBooks.filter(book => book.id !== borrowedBookId);
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      if (email === ADMIN_EMAIL && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
        commit('setUser', { email, isAdmin: true });
        return true;
      } else {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          commit('setUser', { email: userCredential.user.email, uid: userCredential.user.uid });
          sessionStorage.setItem('vuex-state', JSON.stringify({ user: { email: userCredential.user.email, uid: userCredential.user.uid } }));
          return true;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      }
    },
    async registerUser({ commit }, { email, password, confirmPassword }) {
      if (password !== confirmPassword) {
        console.error('Signup error: Passwords do not match');
        return false;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        commit('setUser', { email: userCredential.user.email, uid: userCredential.user.uid });
        sessionStorage.setItem('vuex-state', JSON.stringify({ user: { email: userCredential.user.email, uid: userCredential.user.uid } }));
        return true;
      } catch (error) {
        console.error('Signup error:', error);
        return false;
      }
    },
    async logout({ commit }) {
      try {
        await signOut(auth);
        commit('setUser', null);
        sessionStorage.removeItem('vuex-state');
        return true;
      } catch (error) {
        console.error('Logout error:', error);
        return false;
      }
    },
    autoLogin({ commit }) {
      const userData = JSON.parse(sessionStorage.getItem('vuex-state'));
      if (userData && userData.user) {
        commit('setUser', userData.user);
      }
    },
    async fetchBooks({ commit }) {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const books = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        commit('setBooks', books);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    },
    async fetchBorrowedBooks({ commit, state }) {
      if (!state.user || !state.user.uid) {
        console.error('User not authenticated');
        return;
      }

      try {
        const q = query(collection(db, 'borrowedBooks'), where('uid', '==', state.user.uid));
        const querySnapshot = await getDocs(q);
        const borrowedBooks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        commit('setBorrowedBooks', borrowedBooks);
      } catch (error) {
        console.error('Failed to fetch borrowed books:', error);
      }
    },
    async createBook({ commit }, book) {
      const bookData = {
        author: book.author,
        title: book.title,
        year: book.year,
      };
      try {
        const docRef = await addDoc(collection(db, 'books'), bookData);
        const newBook = { id: docRef.id, ...bookData };
        commit('addBook', newBook);
      } catch (error) {
        console.error('Failed to create book:', error);
      }
    },
    async updateBook({ commit }, book) {
      try {
        const bookRef = doc(db, 'books', book.id);
        await updateDoc(bookRef, book);
        commit('updateBook', book);
      } catch (error) {
        console.error('Failed to update book:', error);
      }
    },
    async deleteBook({ commit }, bookId) {
      try {
        await deleteDoc(doc(db, 'books', bookId));
        commit('deleteBook', bookId);
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    },
    async borrowBook({ commit, state }, bookId) {
      if (!state.user || !state.user.uid) {
        console.error('User not authenticated');
        return;
      }

      const borrowedBookData = {
        uid: state.user.uid,
        bookId,
        borrowDate: new Date().toISOString(),
      };

      try {
        const docRef = await addDoc(collection(db, 'borrowedBooks'), borrowedBookData);
        const borrowedBook = { id: docRef.id, ...borrowedBookData };
        commit('borrowBook', borrowedBook);
      } catch (error) {
        console.error('Failed to borrow book:', error);
      }
    },
    async returnBook({ commit }, borrowedBookId) {
      try {
        await deleteDoc(doc(db, 'borrowedBooks', borrowedBookId));
        commit('returnBook', borrowedBookId);
      } catch (error) {
        console.error('Failed to return book:', error);
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    currentUser(state) {
      return state.user;
    },
    allBooks(state) {
      return state.books;
    },
    allGenres(state) {
      return state.genres;
    },
    allBorrowedBooks(state) {
      return state.borrowedBooks;
    }
  }
});
