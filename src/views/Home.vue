<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <liste :data="listes[0]" />
  </div>
</template>

<script>
// @ is an alias to /src
import Liste from '@/components/Liste.vue'

export default {
  name: 'home',
  components: {
    Liste
  },

  data: () => ({
    listes: [
      {
        title: 'Ma liste de course',
        items: [
          {
            name: 'banane',
            checked: false,
            price: 1.89
          },
          {
            name: 'choco',
            checked: false,
            price: 2.99
          },
          {
            name: 'Lait',
            checked: false,
            price: 1
          }
        ]
      }
    ]
  }),

  watch: {
    listes: {
      handler () {
        localStorage.setItem('listes', JSON.stringify(this.listes))
      },
      deep: true
    }
  }
}

</script>
