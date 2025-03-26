<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <div class="input-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <p>Don't have an account?</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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

<style>
body {
  margin: 0;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.login-box {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007fff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.login-button:hover {
  background-color: #0055b5;
}
</style>
