<template>
    <div id="app" class="book-categories">
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
                <router-link to="/bookscat" class="text-gray-300 hover:text-white active-sidebar-item">Book Categories</router-link>
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
            <h1 class="categories-heading">Book Categories</h1>
          </div>
          <button @click="logout" class="logout-button">Logout</button>
        </div>
  
        <!-- Categories List -->
        <div class="categories-list">
          <div 
            v-for="(category, index) in genres" 
            :key="index" 
            class="category-card"
          >
            <div class="tooltip">{{ categoryDescriptions[category] }}</div>
            <h2 class="category-title">{{ category }}</h2>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  name: 'BookCategories',
  setup() {
    const store = useStore();
    const router = useRouter();
    const sidebarOpen = ref(true);

    // List of genres and their descriptions
    const genres = ref([
      'Fantasy', 'Adventure', 'Romance', 'Contemporary', 'Dystopian', 
      'Mystery', 'Horror', 'Thriller', 'Paranormal', 'Historical fiction', 
      'Science Fiction', 'Children’s', 'Memoir', 'Cookbook', 'Art', 
      'Self-help', 'Personal Development', 'Motivational', 'Health', 
      'History', 'Travel', 'Guide / How-to', 'Families & Relationships', 
      'Humor'
    ]);

    const categoryDescriptions = {
      'Fantasy': 'Immerse yourself in magical worlds and adventures, often involving mythical creatures and epic quests.',
      'Adventure': 'Experience thrilling journeys and daring exploits, often set in exotic or unexplored locations.',
      'Romance': 'Explore stories centered around romantic relationships and the emotional journey of love.',
      'Contemporary': 'Dive into stories set in modern times, reflecting current social and cultural issues.',
      'Dystopian': 'Read about futures where society has gone awry, often focusing on themes of oppression and rebellion.',
      'Mystery': 'Solve puzzles and uncover secrets in narratives filled with suspense and intrigue.',
      'Horror': 'Face your fears with stories designed to scare and unsettle, often involving supernatural elements.',
      'Thriller': 'Enjoy fast-paced, suspenseful stories that keep you on the edge of your seat with unexpected twists.',
      'Paranormal': 'Encounter elements beyond the natural world, including ghosts, vampires, and other supernatural beings.',
      'Historical fiction': 'Delve into past eras with stories that combine historical events with fictional characters and plots.',
      'Science Fiction': 'Explore futuristic worlds and technologies, often dealing with advanced science and speculative ideas.',
      'Children’s': 'Find age-appropriate stories for younger readers, designed to entertain and educate.',
      'Memoir': 'Read personal accounts and reflections from individuals about their own lives and experiences.',
      'Cookbook': 'Discover recipes and cooking techniques through instructional and culinary-focused books.',
      'Art': 'Appreciate visual and performing arts through books focused on artistic techniques and historical perspectives.',
      'Self-help': 'Improve your life with advice and strategies aimed at personal development and problem-solving.',
      'Personal Development': 'Focus on growth and self-improvement in various aspects of life, including career and relationships.',
      'Motivational': 'Get inspired with stories and advice designed to boost motivation and encourage positive thinking.',
      'Health': 'Learn about physical and mental health topics, including wellness, nutrition, and medical conditions.',
      'History': 'Study past events and figures to understand how they shape the present and future.',
      'Travel': 'Explore different cultures and destinations through travel guides and personal experiences.',
      'Guide / How-to': 'Find practical advice and step-by-step instructions for various tasks and skills.',
      'Families & Relationships': 'Understand family dynamics and relationship building through informative and narrative texts.',
      'Humor': 'Enjoy books that use comedy and wit to entertain and make you laugh.'
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

    return {
      sidebarOpen,
      genres,
      categoryDescriptions,
      toggleSidebar,
      logout,
    };
  },
};
</script>


<style scoped>
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

.categories-heading {
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

.categories-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.category-card {
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  color: #ffffff;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.category-title {
  font-size: 1.5rem;
  font-family: 'Lobster', cursive;
}

/* Tooltip Styles */
.tooltip {
 
  position: absolute;
  bottom: 110%; /* Move it above the element */
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  padding: 10px 20px; /* Adjust padding for a wider look */
  border-radius: 25px; /* Increase border radius for a pill shape */
  font-size: 0.9rem; /* Slightly reduce font size */
  font-family: 'Arial', sans-serif;
  white-space: nowrap; /* Keep text in one line */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  text-align: center;
  border: 2px solid #ffffff;
  z-index: 1000; /* Ensure it's above other elements */

  line-height: 1.2;
  max-width: none; /* Remove max-width constraint */
  width: auto; /* Allow width to adjust to content */
}


.category-card:hover .tooltip {
  opacity: 1;
  visibility: visible;
}
</style>

