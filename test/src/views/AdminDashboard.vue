<template>
  <div id="app" class="admin-dashboard">
    <!-- Sidebar Toggle Button -->
    <button @click="toggleSidebar" class="fixed top-7 left-5 bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-200 z-50">☰</button>

    <!-- Sidebar -->
    <div :class="['sidebar', { 'hidden': !sidebarOpen }]">
      <div class="p-6 bg-gray-800 text-white h-full">
        <div class="flex items-center justify-center mb-6">
          <img src="@/assets/icon.jpg" alt="User" class="w-12 h-12 rounded-full">
        </div>
        <div class="flex items-center space-x-4">
          <div>
            <h2 class="text-lg font-semibold">Magic Book Library System</h2>
            <p class="text-sm text-gray-400">Admin Dashboard</p>
          </div>
        </div>
        <nav class="mt-6">
          <ul class="space-y-4">
            <li class="px-6">
              <router-link to="/admin" class="text-gray-300 hover:text-white">Dashboard</router-link>
            </li>
            <li class="px-6">
              <router-link to="/bookscat" class="text-gray-300 hover:text-white">Book Categories</router-link>
            </li>
            <li class="px-6">
              <router-link to="/books" class="text-gray-300 hover:text-white">Books</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div :class="['main-content', { 'expanded': !sidebarOpen }]">
      <!-- Header -->
      <div class="header flex items-center justify-between">
        <div class="flex-grow flex items-center justify-center">
          <h1 class="book-details-heading">Book Details</h1>
        </div>
        <button @click="logout" class="logout-button">Logout</button>
      </div>

      <!-- Add Book Button -->
      <div class="mb-6">
        <button @click="showAddBookModal = true" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200">+ Add New Book</button>
      </div>

      <!-- Books Table -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Year</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in books" :key="book.id">
              <td>{{ book.title }}</td>
              <td>{{ book.year }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.borrowed ? 'Borrowed' : 'Available' }}</td>
              <td>
                <button @click="editBook(book)" class="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition duration-200">Edit</button>
                <button @click="deleteBook(book.id)" class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition duration-200 ml-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add Book Modal -->
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-smoke-light" v-if="showAddBookModal">
        <div class="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold mb-4 text-indigo-700">Add New Book</h3>
          <form @submit.prevent="createBook">
            <div class="mb-4">
              <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" id="title" v-model="newBook.title" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div class="mb-4">
              <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
              <input type="text" id="author" v-model="newBook.author" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div class="mb-4">
              <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
              <input type="number" id="year" v-model="newBook.year" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">Add Book</button>
          </form>
          <button @click="showAddBookModal = false" class="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200">Close</button>
        </div>
      </div>

      <!-- Edit Book Modal -->
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-smoke-light" v-if="editBookData.id">
        <div class="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold mb-4 text-indigo-700">Edit Book</h3>
          <form @submit.prevent="updateBook">
            <div class="mb-4">
              <label for="editTitle" class="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" id="editTitle" v-model="editBookData.title" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div class="mb-4">
              <label for="editAuthor" class="block text-sm font-medium text-gray-700">Author</label>
              <input type="text" id="editAuthor" v-model="editBookData.author" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div class="mb-4">
              <label for="editYear" class="block text-sm font-medium text-gray-700">Year</label>
              <input type="number" id="editYear" v-model="editBookData.year" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">Save Changes</button>
          </form>
          <button @click="editBookData = {}" class="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { interpret } from 'xstate';
import { bookMachine } from '../state/bookMachine'; // Ensure the correct path

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter();
    const bookService = interpret(bookMachine).start();
    const sidebarOpen = ref(true);
    const newBook = ref({ title: '', author: '', year: '' });
    const editBookData = ref({ id: '', title: '', author: '', year: '' });
    const showAddBookModal = ref(false);
    const books = ref([]);

    // Fetch books on startup
    bookService.send({ type: 'FETCH_BOOKS' });

    bookService.onTransition((state) => {
      if (state.matches('authenticated')) {
        books.value = state.context.books;
      } else if (state.matches('error')) {
        Swal.fire('Error', state.context.error, 'error');
      }
    });

    const createBook = async () => {
      if (newBook.value.title && newBook.value.author && newBook.value.year) {
        try {
          bookService.send({ type: 'CREATE_BOOK', data: newBook.value });
          newBook.value = { title: '', author: '', year: '' };
          showAddBookModal.value = false;
          await Swal.fire({
            title: 'Added!',
            text: 'The book has been added successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
            timer: 2000,
          });
        } catch (error) {
          Swal.fire('Error', 'Failed to add the book. Please try again.', 'error');
        }
      } else {
        Swal.fire('Error', 'Please fill all fields', 'error');
      }
    };

    const editBook = (book) => {
      editBookData.value = { ...book };
    };

    const updateBook = async () => {
      if (editBookData.value.title && editBookData.value.author && editBookData.value.year) {
        try {
          bookService.send({ type: 'UPDATE_BOOK', data: editBookData.value });
          editBookData.value = { id: '', title: '', author: '', year: '' };
          await Swal.fire({
            title: 'Updated!',
            text: 'The book details have been updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
            timer: 2000,
          });
        } catch (error) {
          Swal.fire('Error', 'Failed to update the book. Please try again.', 'error');
        }
      } else {
        Swal.fire('Error', 'Please fill all fields', 'error');
      }
    };

    const deleteBook = async (id) => {
      try {
        bookService.send({ type: 'DELETE_BOOK', data: id });
        await Swal.fire({
          title: 'Deleted!',
          text: 'The book has been deleted successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          timer: 2000,
        });
      } catch (error) {
        Swal.fire('Error', 'Failed to delete the book. Please try again.', 'error');
      }
    };

    const logout = () => {
      bookService.send({ type: 'LOGOUT' });
      router.push('/login');
    };

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };

    onMounted(() => {
      bookService.send({ type: 'FETCH_BOOKS' });
    });

    return {
      books,
      newBook,
      editBookData,
      showAddBookModal,
      createBook,
      editBook,
      updateBook,
      deleteBook,
      logout,
      toggleSidebar,
      sidebarOpen,
    };
  },
};
</script>


<style scoped>
.sidebar::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

.sidebar {
  background-color: #1F2937;
  color: #fff;
  height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 40;
  overflow-y: auto;
}

.sidebar.hidden {
  transform: translateX(-100%);
}

.main-content {
  margin-left: 250px;
  padding: 20px;
  transition: margin-left 0.3s ease-in-out;
  position: relative;
  z-index: 1;
  overflow-y: auto;
  min-height: 100vh;
  width: calc(100% - 250px);
}

.main-content.expanded {
  margin-left: 0;
  width: 100%;
}

.main-content::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-image: url(@/assets/adminbg.jpg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 1;
  filter: brightness(50%);
  z-index: -1;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.book-details-heading {
  font-family: 'Lobster', cursive;
  font-size: 2rem;
  color: #ffffff;
  text-align: center;
  border: 2px solid #ffffff;
  border-radius: 8px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.3);
}

.logout-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e53e3e;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.logout-button:hover {
  background-color: #c53030;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  color: #333;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

button:focus {
  outline: none;
}

.bg-smoke-light {
  background-color: rgba(0, 0, 0, 0.5);
}

.active-sidebar-item {
  border-left: 4px solid #6366F1;
  background-color: rgba(99, 102, 241, 0.1);
}

a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>