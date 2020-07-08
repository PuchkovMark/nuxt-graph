<template>
  <v-layout>
    <v-row danse>
      <v-col cols="12">
        <v-card style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
          <v-card-title>
            Это страница учебника
          </v-card-title>
          <img src="/book_reading.svg" width="20%" style="min-width: 150px;">
          <v-card-text style="color: #000000; text-align: center">
            Здесь будет располагаться вся необходимая теория, для проведения анализа функции
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
    export default {
        name: "textbook"
    }
</script>

<style scoped>

</style>
