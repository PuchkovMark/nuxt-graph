<template>
  <v-layout>

    <v-row danse>
      <v-col cols="12">
        <v-card style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
          <v-card-title>
            Обучающая программа на тему "Построение графиков функций"
          </v-card-title>
          <img src="/hire.svg" width="20%" style="min-width: 150px;">
          <v-card-text style="color: #000000; text-align: center">
            Выберите карточку, чтобы начать задание
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto" max-width="344" to="/first-example">
          <v-img height="200px" style="display: flex;align-items: center;justify-content: center;">
            <katex-expression
              expression='y = \dfrac{(x+1)(x+8)}{x}'
              katex-options='{ "displayMode": true , "throwOnError": true }'>
            </katex-expression>
          </v-img>

          <v-card-title>
            Пример №1
          </v-card-title>

          <v-card-subtitle>
            Исследовать функцию средствами дифференциального исчисления и построить ее график.
          </v-card-subtitle>

          <v-card-actions>
          </v-card-actions>

        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto" max-width="344" to="/second-example">
          <v-img height="200px" style="display: flex;align-items: center;justify-content: center;">
            <katex-expression
              expression='y = \dfrac{1}{9}x(x-4)^3'
              katex-options='{ "displayMode": true , "throwOnError": true }'>
            </katex-expression>
          </v-img>

          <v-card-title>
            Пример №2
          </v-card-title>

          <v-card-subtitle>
            Исследовать функцию средствами дифференциального исчисления и построить ее график.
          </v-card-subtitle>

          <v-card-actions>
          </v-card-actions>

        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto" max-width="344" to="/third-example">
          <v-img height="200px" style="display: flex;align-items: center;justify-content: center;">
            <katex-expression
              expression='y = (x-1)(x^2 - 5x + 4)'
              katex-options='{ "displayMode": true , "throwOnError": true }'>
            </katex-expression>
          </v-img>

          <v-card-title>
            Пример №3
          </v-card-title>

          <v-card-subtitle>
            Исследовать функцию средствами дифференциального исчисления и построить ее график.
          </v-card-subtitle>

          <v-card-actions>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>

  </v-layout>
</template>

<script>
  export default {
    name: "index",
    data: () => ({

    }),
    computed: {

    },
    methods: {

    },
    created() {
    },
    mounted() {
    }
  }

</script>

<style scoped>
  span {
    margin: 10px;
  }
</style>
