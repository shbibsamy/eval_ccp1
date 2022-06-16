<template>
  <div class="utilisateurs">
    <h2>Liste des utilisateurs</h2>
    <div class="mobile" v-for="(utilisateur, index) in this.$store.state.database" :key="index" v-bind:id="index" v-bind:class="colour(utilisateur, index)">
      <div v-for="(value, prop) in utilisateur" :key="prop">
        <div v-if="this.$store.state.simpleList.includes(prop)">
          <h3>
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
      <input type="button" value="supprimer" @click="afficherModal(utilisateur.id, utilisateur.username)" class="supprimer">
      <input type="button" value="modifier" @click="goModifier(utilisateur)">
      <Teleport to="body">
        <modal :show="showModal" :userId="activeUserId" :userName="activeUserName" @show="showModal = false">
        </modal>
      </Teleport>
    </div>
    <div class="desktop">
      <table>
      <thead>
        <tr>
          <th v-for="titre in this.$store.state.objectStructure">
            {{ titre }}
          </th>
          <th id="actions">
          actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(utilisateur, index) in this.$store.state.database" :key="index" v-bind:class="[ colour(utilisateur, index), `row${utilisateur.id}` ]">
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
            <input type="button" value="supprimer" @click="afficherModal(utilisateur.id, utilisateur.username)" class="supprimer">
            <input type="button" value="modifier" @click="goModifier(utilisateur)">
            <Teleport to="body">
              <modal :show="showModal" :userId="activeUserId" :userName="activeUserName" @show="showModal = false">
              </modal>
            </Teleport>
          </td>
        </tr>
      </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
export default {
  name: 'UtilisateursView',
  data: function() {
    return {
      showModal: false,
      activeUserId: 0,
      activeUserName: "",
    }
  },
  components: {
    Modal
  },
  methods: {
    afficherModal: function (idUser, usernameUser) {
      this.activeUserId = idUser;
      this.activeUserName = usernameUser;
      this.showModal = true;
    },
    colour(utilisateur, index) {
      let emptyData = false;
      // check if ever empty; if empty = red
      for (const value of Object.values(utilisateur)){
        if (typeof value === "string") {
          if (value == "") {
            emptyData = true;
          }
        } else {
          if (value ==="address" ) {
            for (const addressValues of Object.values(value)) {
              if (addressValues == "") {
              emptyData = true;
              }
            }
          } else if (value === "company)") {
            for (const companyValues of Object.values(value)) {
              if (companyValues == "") {
              emptyData = true;
              }
            }
          }
        }
      }
      if (emptyData === false ) {
        if (index %2 === 0) {
        return "white"
        }
        else {
          return "green"
        }
      } else {
        return "red"
      }
    },
    goModifier ( utilisateur) {
      let name = utilisateur.name;
      if (name === "") {
        name = "undefined user";
      }
      let utilisateurString = JSON.stringify(utilisateur);
      this.$router.push({name: 'Modifier', params: { id: name, utilisateur: utilisateurString}})
    },
  },
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
  border: 4px solid #1D585E;
  padding: 1rem;
  margin: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  width: 80%;
  max-width: 500px;
}

h3 {
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-top: 1rem;
}

.green {
  background-color: #79A6AF;
}

.red {
  background-color: #aa6b6f;
  }

.desktop {
  display: none;
}

/* Desktop */
@media (min-width: 1061px){
  .mobile{
    display: none;
  }

  .desktop {
    display: flex;
    margin: 2%;
  }

  /* Table */
  table {
    border: 1px solid black;
    width: 95%;
    margin: auto;
    border-spacing: 0px;
  }

  th, td {
    border: 1px solid black;
    padding: 1px;
  }

  th {
    text-transform: uppercase;
    background-color: #79A6AF;
  }

  td span{
    font-size: 1vw;
  }

  #actions {
    min-width: 12rem;
  }
  .green {
    background-color: #79A6AF;
  }

  .red {
  background-color: #aa6b6f;
  }

  input {
  width: 50%;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #2c3e50;
  color: #F6F6F6;
  padding: 0.7vw;
  }
}
</style>
