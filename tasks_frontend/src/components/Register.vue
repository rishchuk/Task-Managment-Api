<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <div>
        <label for="password2">Confirm Password:</label>
        <input type="password" v-model="password2" id="password2" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login here</router-link></p>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/register/", {
          username: this.username,
          email: this.email,
          password: this.password,
          password2: this.password2,
        });
        this.$router.push("/login");
      } catch (error) {
        console.error("Error registering user:", error.response.data);
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
  align-items: center;
  height: 100vh;
}

.register {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

h2 {
  margin-bottom: 20px;
}

form div {
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

button {
  width: 100%;
  padding: 10px;
  background-color: #007fff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #0055b5;
}
</style>