// src/store/index.js
import { createStore } from 'vuex';
import axios from 'axios';


export default createStore({
  state: {
    user: null,
    books: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      sessionStorage.setItem('user', JSON.stringify(user)); // Persist user data
    },
    setBooks(state, books) {
      state.books = books;
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
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          commit('setUser', { email, isAdmin: true });
          return true;
        }
        
        const response = await axios.get('http://localhost:3000/users', {
          params: { email, password }
        });
        if (response.data.length > 0) {
          commit('setUser', response.data[0]);
          return true;
        } else {
          console.error('Login failed: Invalid credentials');
          return false;
        }
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },
    async registerUser({ commit }, { email, password }) {
      try {
        const existingUserResponse = await axios.get('http://localhost:3000/users', {
          params: { email }
        });

        if (existingUserResponse.data.length > 0) {
          console.error('Signup error: Email already registered');
          return false;
        }

        const user = { email, password };
        const response = await axios.post('http://localhost:3000/users', user);
        commit('setUser', response.data);
        return true;
      } catch (error) {
        console.error('Signup error:', error);
        return false;
      }
    },
    logout({ commit }) {
      commit('setUser', null);
      sessionStorage.removeItem('user'); // Clear user data from local storage
    },
    autoLogin({ commit }) {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      if (userData) {
        commit('setUser', userData);
      }
    },
    async fetchBooks({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/books');
        commit('setBooks', response.data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    },
    async createBook({ commit }, book) {
      try {
        const response = await axios.post('http://localhost:3000/books', book);
        commit('addBook', response.data);
      } catch (error) {
        console.error('Failed to create book:', error);
      }
    },
    async updateBook({ commit }, book) {
      try {
        const response = await axios.put(`http://localhost:3000/books/${book.id}`, book);
        commit('updateBook', response.data);
      } catch (error) {
        console.error('Failed to update book:', error);
      }
    },
    async deleteBook({ commit }, bookId) {
      try {
        await axios.delete(`http://localhost:3000/books/${bookId}`);
        commit('deleteBook', bookId);
      } catch (error) {
        console.error('Failed to delete book:', error);
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
    }
  }
});
