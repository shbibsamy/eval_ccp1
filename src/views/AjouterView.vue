<template>
  <div class="ajouter">
    <h2>Ajouter un utilisateur</h2>
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
import createObjectFromTextarea from '@/mixins/createObjectFromTextarea';
export default {
  name: 'AjouterView',
  data: function() {
    return {
      formData: {},
      data: this.$store.state.database,
    }
  },
  mixins: [createObjectFromTextarea],
  methods: {
  ajouterUtilisateur(){
    let formElements = document.getElementById("new_utilisateur").elements;
    this.formData.id = this.$store.state.idCounter+1;
    for(const element of formElements) {
      let attribute = element.getAttribute("id");
      let currentObject;
      // Create object from textareas
      if (attribute === "company" || attribute === "address") {
        this.createObjectFromTextarea(element)
        
        // let currentValue = element.value.replace(/[\n]/gm, ',');
        // let contentFromInput = currentValue.split(",");
        // console.log(contentFromInput);
        // contentFromInput.forEach(value => {
        //   value = value.split(": ");
        // })
        // for (let value of contentFromInput) {
        //   value = value.split(": ");
        // }
        // for (let index = 0; index < contentFromInput.length; index++) {
        //   contentFromInput[index] = contentFromInput[index].split(": ");
        // }
        // const entriesFromInput = new Map(contentFromInput);
        // currentObject = Object.fromEntries(entriesFromInput);
        // this.formData[element.id] = currentObject;
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



// if (attribute === "company") {
//         let companyValue = element.value.replace(/[\n]/gm, ',');
//         let contentFromInput = companyValue.split(",");
//         for (let index = 0; index < contentFromInput.length; index++) {
//           contentFromInput[index] = contentFromInput[index].split(":");
//         }
//         const entriesFromInput = new Map(contentFromInput);
//         companyObject = Object.fromEntries(entriesFromInput);
//         this.formData[element.id] = companyObject;
//         // create object from address text area
//       } else if (attribute === "address") {
//         let addressValue = element.value.replace(/[\n]/gm, ',');
//         let contentFromInput = addressValue.split(",");
//         for (let index = 0; index < contentFromInput.length; index++) {
//           contentFromInput[index] = contentFromInput[index].split(":");
//         }
//         const entriesFromInput = new Map(contentFromInput);
//         addressObject = Object.fromEntries(entriesFromInput);
//         this.formData[element.id] = addressObject;

</script>

<style scoped>

h3 {
  text-transform: uppercase;
  margin-top: 1rem;
}

.ajouter {
  color: black;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

#ajouter {
  max-width: 360px;
}

textarea {
  height: 5rem;
  min-width: 340px;
}

input[type=text]{
  text-align: center;
  min-width: 340px;
}
</style>