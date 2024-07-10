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
              <a href="#" class="text-gray-300 hover:text-white active-sidebar-item">Dashboard</a>
            </li>
            <li class="px-6">
              <a href="#" class="text-gray-300 hover:text-white">Books Category</a>
            </li>
            <li class="px-6">
              <a href="#" class="text-gray-300 hover:text-white">Manage Sales</a>
            </li>
            <li class="px-6">
              <a href="#" class="text-gray-300 hover:text-white">Books Section</a>
            </li>
            <li class="px-6">
              <a href="#" class="text-gray-300 hover:text-white">User Management</a>
            </li>
            <li class="px-6">
              <a href="#" class="text-gray-300 hover:text-white">Transaction History</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div :class="['main-content', { 'expanded': sidebarOpen }]">
      <!-- Header -->
      <div class="header flex items-center justify-between w-full mb-6">
        <h1 class="text-4xl font-bold text-gray-800">Book Details</h1>
        <button @click="logout" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200">Logout</button>
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
              <th>#</th>
              <th>Book Title</th>
              <th>Year</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in books" :key="book.id">
              <td>{{ index + 1 }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.year }}</td>
              <td>{{ book.author }}</td>
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
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      sidebarOpen: false,
      showAddBookModal: false,
      books: JSON.parse(localStorage.getItem('books') || '[]'),
      newBook: { title: '', year: '', author: '' },
      editBookData: {}
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    
    const logout = async () => {
      await store.dispatch('logout');
      router.push('/login'); // Navigate to the login page
    };

    return {
      logout
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    createBook() {
      this.books.push({ ...this.newBook, id: Date.now() });
      localStorage.setItem('books', JSON.stringify(this.books));
      this.newBook = { title: '', year: '', author: '' };
      this.showAddBookModal = false;
    },
    editBook(book) {
      this.editBookData = { ...book };
    },
    updateBook() {
      const index = this.books.findIndex(book => book.id === this.editBookData.id);
      if (index !== -1) {
        this.books.splice(index, 1, { ...this.editBookData });
        localStorage.setItem('books', JSON.stringify(this.books));
        this.editBookData = {};
      }
    },
    deleteBook(bookId) {
      this.books = this.books.filter(book => book.id !== bookId);
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  }
};
</script>

<style scoped>
/* Custom scrollbar styles */
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
  height: 100%;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 40; /* Ensuring the sidebar is on top */
  overflow-y: auto; /* Allow scrolling if content overflows */
}

.sidebar.hidden {
  transform: translateX(-100%);
}

.main-content {
  padding: 20px;
  transition: margin-left 0.3s ease-in-out;
  z-index: 40; /* Ensuring the main content is below the sidebar */
  background-image: url(@/assets/bg.jpg); /* Replace with your actual image path */
  background-size: cover; /* Ensure the background covers the entire content area */
  background-position: center; /* Center the background image */
}

.main-content.expanded {
  margin-left: 250px; /* Shifts content to the right when sidebar is open */
}

.header {
  margin-bottom: 20px;
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
h1{
color: #f0f0f0

}
.bg-smoke-light {
  background-color: rgba(0, 0, 0, 0.5);
}

.active-sidebar-item {
  border-left: 4px solid #6366F1; /* Indicating the active state */
  background-color: rgba(99, 102, 241, 0.1); /* Light background for active item */
}

a:hover {
  background-color: rgba(255, 255, 255, 0.1); /* Changing color on hover */
}
</style>
