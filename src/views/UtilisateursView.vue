<template>
  <div class="utilisateurs">
    <div class="mobile" v-for="(utilisateur, index) in this.$store.state.database" :key="index" v-bind:id="index">
      <div v-for="(value, prop) in utilisateur" :key="prop">
        <div v-if="this.$store.state.simpleList.includes(prop)">
          <h3 >
            {{  prop  }}
          </h3>
          <span v-if="prop == 'address'">
            {{ value.city }}
          </span>
          <span v-else-if="prop == 'company'">
            {{ value.name }}
          </span>
          <span v-else>
            {{ value }}
          </span>
        </div>
      </div>
      <input type="button" value="supprimer" @click="effacerUtilisateur(utilisateur.id)">
      <input type="button" value="modifier" @click="goModifier(index, utilisateur)">
    </div>
    <div class="desktop">
      <table>
      <thead>
        <tr>
          <th v-for="titre in this.$store.state.objectStructure">
            {{ titre }}
          </th>
          <th>
          actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(utilisateur, index) in this.$store.state.database" :key="index" v-bind:class="colour()">
          <td v-for="(value, prop) in utilisateur" :key="prop">
            <span v-if="prop == 'address'">
              {{ value.city }}
            </span>
            <span v-else-if="prop == 'company'">
              {{ value.name }}
            </span>
            <span v-else>
              {{ value }}
            </span>
          </td>
          <td>
            <input type="button" value="supprimer" @click="effacerUtilisateur(utilisateur.id)">
            <input type="button" value="modifier" @click="goModifier(index, utilisateur)">
          </td>
        </tr>
      </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UtilisateursView',
  data: function() {
    return {
      colourChoice: false,
    }
  },
  methods: {
    effacerUtilisateur(id) {
      this.$store.commit("EFFACER_UTILISATEUR", id);
      },
    colour() {
      this.colourChoice = !this.colourChoice
      if (this.colourChoice) {
        return "green"
      }
    },
    goModifier (index, utilisateur) {
      let utilisateurString = JSON.stringify(utilisateur);
      this.$router.push({name: 'Modifier', params: { id: utilisateur.id, utilisateur: utilisateurString}})
    }
  }
}
</script>

<style scoped>
/* Structure */
.utilisateurs {
  color: black;
}

.mobile {
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  margin: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  width: 80%;
}

.desktop {
  display: none;
}

/*  */
input {
  width: 50%;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #2c3e50;
  color: #F6F6F6;
  padding: 0.5rem;
}


/* Desktop */
@media (min-width: 1061px){
  .mobile{
    display: none;
  }

  .desktop {
    display: flex;
    margin: 5%;
  }

  /* Table */
  table {
    border: 2px solid black;
    border-collapse: collapse;
    width: 90%;
    margin: auto;
  }

  th, td {
    border: 1px solid black;
  }

  th {
    text-transform: uppercase;
    background-color: #79A6AF;
  }

  .green {
    background-color: #79A6AF;
  }
  
}
</style>
