<template>
  <div class="ajouter">
    <h2>Ajouter</h2>
    <form action="" id="new_utilisateur">
      <label v-for="titre in this.$store.state.objectStructure"  v-bind:for="titre">
        <div v-if="this.$store.state.simpleList.includes(titre)">
          <h3>{{ titre }}</h3>
          <div v-if="titre==='address'">    
            <textarea name="" v-bind:id="titre"></textarea>
          </div>
          <div v-else-if="titre==='company'">    
            <textarea name="" v-bind:id="titre"></textarea>
          </div>
          <div v-else>    
            <input type="text" v-bind:id="titre">
          </div>
        </div>

      </label>
      <input type="button" value="Ajouter" @click="ajouterUtilisateur()" id="ajouter">
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'AjouterView',
  data: function() {
    return {
      formData: {},
      data: this.$store.state.database,
    }
  },
  methods: {
  ajouterUtilisateur(){
    let formElements = document.getElementById("new_utilisateur").elements;
    this.formData.id = this.$store.state.idCounter+1;
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
        console.log(companyObject)
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
        console.log(addressObject)
        this.formData[element.id] = addressObject;
      } else if (attribute !== "ajouter"){
        this.formData[element.id] = element.value;
      }
    }
    this.$store.commit("AJOUTER_UTILISATEUR", this.formData);
    this.$router.push({ path: "/Utilisateurs" })
    }
  },
  mounted () {
    let addressText = document.getElementById("address");
    addressText.value = "city: "+'\r\n'+"street: "+'\r\n'+"zipcode: ";
    let companyText = document.getElementById("company");
    companyText.value = "name: "+'\r\n'+"catchPhrase: "+'\r\n'+"bs: ";
  }
}
</script>

<style scoped>

h2 {
  color: black;
  margin: 1rem;
}

h3 {
  color: black;
}
.ajouter {
  display:flex;
  flex-direction: column;
  width:  80%;
  margin: auto;
}

input {
  width: 70%;
  margin: auto;
  margin-bottom: 1rem;
}

textarea {
  height: 4rem;
}

</style>