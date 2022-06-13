<template>
  <div class="home">
    {{  this.$store.state.database  }}
  </div>
</template>

<script>
export default {
  name: 'UtilisateursView',
  data: function() {
    return {
      
    }
  }
}
</script>

<style>
.home {
  color: black;
}
</style>
