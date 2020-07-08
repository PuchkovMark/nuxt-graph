<template>
  <v-layout>
    <v-row danse>
      <v-col cols="12">
        <v-card style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
          <v-card-title>
            Это страница вопросов
          </v-card-title>
          <img src="/questions.svg" width="20%" style="min-width: 150px;">
          <v-card-text style="color: #000000; text-align: center">
            Здесь будут располагаться ответы на возможные вопросы пользователей
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
  export default {
    name: "questions"
  }
</script>

<style scoped>

</style>

