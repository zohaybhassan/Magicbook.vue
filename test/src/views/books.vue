<template>
  <div id="app" class="books-dashboard">
    <!-- Sidebar Toggle Button -->
    <button @click="toggleSidebar" class="fixed top-7 left-5 bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-200 z-50">☰</button>

    <!-- Sidebar -->
    <div :class="['sidebar', { 'hidden': !sidebarOpen }]">
      <div class="p-6 bg-gray-800 text-white h-full">
        <div class="flex items-center justify-center mb-6">
          <img src="@/assets/icon.jpg" alt="Books" class="w-12 h-12 rounded-full">
        </div>
        <div class="flex items-center space-x-4">
          <div>
            <h2 class="text-lg font-semibold">Magic Book Library System</h2>
            <p class="text-sm text-gray-400">Books Dashboard</p>
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

      <!-- Total Books -->
      <div class="total-books-container">
        <h2 class="total-books-title">Total Books</h2>
        <p class="total-books-number">{{ totalBooks }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/main.js';

export default {
  name: 'BooksNumber',
  setup() {
    const store = useStore();
    const router = useRouter();
    const sidebarOpen = ref(true);
    const totalBooks = ref(0);

    const fetchTotalBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'books'));
      totalBooks.value = querySnapshot.size;
    };

    const logout = async () => {
      try {
        await store.dispatch('logout');
        router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };

    onMounted(fetchTotalBooks);

    return {
      sidebarOpen,
      totalBooks,
      toggleSidebar,
      logout,
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

.total-books-container {
  text-align: center;
  margin-top: 50px;
}

.total-books-title {
  font-family: 'Lobster', cursive;
  font-size: 2rem;
  color: #ffffff;
}

.total-books-number {
  font-size: 3rem;
  color: #ffffff;
  font-weight: bold;
}
</style>
