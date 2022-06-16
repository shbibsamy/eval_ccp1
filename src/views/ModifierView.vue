<template>
  <div class="modifier">
    <div class="title-box">
    <h2>Modifier l'utilisateur</h2>
    <h3 id="username_titre">{{ utilisateurObj.name }} </h3>
    </div>
    <form action="" id="modifier_utilisateur">
      <label v-for="(index, titre) in this.utilisateurObj" :key="titre" v-bind:for="titre">
        <h3>{{ titre }}</h3>
        <div v-if="titre==='id'">    
          <input type="text" name="" v-bind:id="titre" disabled v-bind:value="index">
        </div>
        <div v-else-if="titre==='address'">    
          <textarea name="" v-bind:id="titre"></textarea>
        </div>
        <div v-else-if="titre==='company'">    
          <textarea name="" v-bind:id="titre"></textarea>
        </div>
        <div v-else>
          <input type="text" v-bind:id="titre" v-bind:value="index">
        </div>
      </label>
      <input type="button" value="Modifier" @click="modifierUtilisateur()" id="modifier">
    </form>
  </div>
</template>

<script>
export default {
  name: 'ModifierView',
  components: {
  },
  data: function () {
    return {
      utilisateurObj: {},
      formData: {},
    }
  },
  props: {
    utilisateur: {
      type: String
    },
  },
  methods: {
  modifierUtilisateur(){
    let formElements = document.getElementById("modifier_utilisateur").elements;
    for(const element of formElements) {
      let attribute = element.getAttribute("id");
      let companyObject;
      let addressObject;
      // Create object from company text area
      if (attribute === "company") {
        let companyValue = element.value.replace(/[\n]/gm, ',');
        let contentFromInput = companyValue.split(",");
        for (let index = 0; index < contentFromInput.length; index++) {
          contentFromInput[index] = contentFromInput[index].split(":");
        }
        const entriesFromInput = new Map(contentFromInput);
        companyObject = Object.fromEntries(entriesFromInput);
        this.formData[element.id] = companyObject;
        // create object from address text area
      } else if (attribute === "address") {
        let addressValue = element.value.replace(/[\n]/gm, ',');
        let contentFromInput = addressValue.split(",");
        for (let index = 0; index < contentFromInput.length; index++) {
          contentFromInput[index] = contentFromInput[index].split(":");
        }
        const entriesFromInput = new Map(contentFromInput);
        addressObject = Object.fromEntries(entriesFromInput);
        this.formData[element.id] = addressObject;
      } else if (attribute !== "modifier"){
        this.formData[element.id] = element.value;
      }
    }
    this.$store.commit("MODIFIER_UTILISATEUR", this.formData);
    this.$router.push({ path: "/Utilisateurs" })
    }
  },
  created () {
    this.utilisateurObj = JSON.parse(this.utilisateur);
  },
  mounted () {
    let address = this.utilisateurObj.address;
    let company = this.utilisateurObj.company;
    let addressText = document.getElementById("address");
    addressText.value = "city: "+address.city+'\r\n'+"street: "+address.street+'\r\n'+"zipcode: "+address.zipcode;
    let companyText = document.getElementById("company");
    companyText.value =  "name: "+company.name+'\r\n'+"catchPhrase: "+company.catchPhrase+'\r\n'+"bs: "+company.bs;
  }
}
</script>

<style scoped>
.title-box {
  background-color: #2c3e50;
  padding: 1rem;
  border-radius: 1rem;
  width: 70%;
  margin: auto;
  max-width: 360px;
}

h2 {
  color: #F6F6F6;
  margin: auto;
  border-radius: 0;
  margin: auto;
  width: 100%;
  max-width: 360px;
  padding: 0;
}

h3 {
  text-transform: uppercase;
  margin-top: 1rem;
}

#username_titre {
  background-color: #FBC522;
  height: 50%;
  border-radius: 10px;
  max-width: 200px;
  margin: auto;
  margin-top: 1rem;
}
.modifier {
  color: black;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

textarea {
  height: 5rem;
  min-width: 340px;
}

input[type=text] {
  text-align: center;
  min-width: 340px;
}

#modifier {
  min-width: 160px;
  background-color: #2c3e50;
  color: #F6F6F6;
  padding: 0.5rem;
}

#modifier {
  max-width: 360px;
}

</style>