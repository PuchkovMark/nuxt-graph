<template>
  <div>

    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true" style="color: white"></v-app-bar-nav-icon>

      <div style="margin-left: 1rem">
        <v-toolbar-title style="color: silver">Диплом</v-toolbar-title>
        <v-card-subtitle style="padding: unset; color: silver"><small>Марка Пучкова</small></v-card-subtitle>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item>

          <v-list-item to="/textbook">

            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Учебник</v-list-item-title>

          </v-list-item>

          <v-list-item to="/questions">

            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Вопросы</v-list-item-title>

          </v-list-item>

          <v-list-item to="/example">

            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Примеры</v-list-item-title>

          </v-list-item>

          <v-list-item to="/prompt">

            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Подсказка</v-list-item-title>

          </v-list-item>

        </v-list-item-group>
      </v-list>
      <v-footer
        absolute
        class="font-weight-medium"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <v-card-text>
            Created by Mark P&copy; {{ new Date().getFullYear() }}
          </v-card-text>
        </v-col>
      </v-footer>
    </v-navigation-drawer>

  </div>
</template>

<script>
    export default {
        name: "SideBar",
        data: () => ({
            drawer: false,
            links: [
                {title: 'Главная', url: '/', exact: true},
                {title: 'События', url: '/events'},
                {title: 'Участники', url: '/members'},
                {title: 'Календарь', url: '/calendar'}
            ]
        }),
    }
</script>

<style scoped>

</style>
