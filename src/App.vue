<template>
  <header class="header">
    <img alt="Vue logo" src="@/assets/logo-Id-Formation.png">
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/Utilisateurs">Utilisateurs</router-link>
      <router-link to="/Ajouter">Ajouter</router-link>
    </nav>
  </header>
  <main class="main">
    <router-view/>
  </main>
  <footer class="footer">
    <Footer></Footer>
  </footer>
</template>

<script>
import Footer from "@/components/Footer.vue"
export default {
  name: 'App',
  components: {
    Footer,
  },
  data: function() {
    return {
      database: [],
    }
  },
  beforeMount() {
    fetch('https://jsonplaceholder.typicode.com/users/')
      .then(response => response.json())
      .then(json => {
      this.database = json;
      for(const user of this.database) {
        delete user.address.geo;
        delete user.address.suite;
      };
      this.$store.commit("UPDATE_DATABASE", this.database);
      this.$store.commit("CREATE_FORM_STRUCTURE", this.database[0]);
      // console.log(this.$store.state.database)
      console.log(this.$store.state.objectStructure)
      }
    )},
}
</script>

<style>
/* Reset */
*,
::before,
::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 16px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  color: #F6F6F6;
  height: 100vh;
}

/* Structure */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
  background-color: #79A6AF;
  padding: 1rem;
}

/* .main {
  height: 73vh;
} */

.footer {
  justify-self: flex-end;
  height: 10vh;
}

/* header styles */
.header img {
  border-radius: 50%;
  height: 70%;
}

nav {
  display: flex;
  justify-content: space-around;
  padding: 1vw;
  width: 90vw;
}

nav a {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #F6F6F6;
  background-color: #1D585E;
  padding: 1vw;
  border-radius: 10%;
  width: 25vw;
  height: 5vh;
  font-size: 2.5vw;
  box-shadow: 4px 4px 4px darkslategrey;
}

nav a.router-link-exact-active {
  color: #FBC522;
}

@media (min-width: 1061px) {
  nav{
    width: 50%;
  }
  
nav a {
  font-size: 1.5rem;
  width: 30%;
}
}

</style>
