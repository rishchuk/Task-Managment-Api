<template>
  <nav class="navbar">
    <router-link to="/">About</router-link>
    <div class="right" v-if="!isAuthPage">
      <span v-if="user">Hello, {{ user.username }}</span>
      <button @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  computed: {
    isAuthPage() {
      return this.$route.path === "/login" || this.$route.path === "/register";
    },
  },
  created() {
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
    }
  },
  watch: {
    '$route.path'() {
      const userData = localStorage.getItem("user");
      this.user = userData ? JSON.parse(userData) : null;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      this.user = null;
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navbar {
  top: 0;
  left: 0;
  right: 0;
  color: white;
  position: fixed;
  height: 50px;
  background-color: #007fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

button {
  background: white;
  color: #007fff;
  border: none;
  padding: 0.5rem 1.1rem;
  border-radius: 5px;
  cursor: pointer;
}
</style>
