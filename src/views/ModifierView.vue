<template>
  <div class="modifier">
    <form action="" id="modifier_utilisateur">
      <label v-for="(index, titre) in this.utilisateurObj" :key="titre" v-bind:for="titre">
        <h3>{{ titre }}</h3>
        <div v-if="titre==='address'">    
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
.modifier {
  color: black;
}

textarea {
  height: 4rem;
}
</style>