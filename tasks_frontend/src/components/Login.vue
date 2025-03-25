<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account?</p>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/token/", {
          username: this.username,
          password: this.password,
        });

        if (response && response.data && response.data.access) {
          localStorage.setItem("access_token", response.data.access);
          this.$router.push("/tasks");
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Error logging in:", error.response ? error.response.data : error.message);
      }
    },
  },
};
</script>
