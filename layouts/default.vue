<template>
  <v-app>
    <SideBar/>

    <v-content>
      <v-container style="max-width: 1200px;">
        <nuxt />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  import SideBar from "../components/SideBar";

export default {
  components: {SideBar},
  comments: {
    SideBar
  }
}
</script>
