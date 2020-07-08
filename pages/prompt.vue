<template>
  <v-layout>
    <v-row danse>
      <v-col cols="12">
        <v-card>
          <v-card-title>Здесь можно провести анализ функции</v-card-title>
          <v-card-text>
            <v-col cols="12" xs="font-size: 1rem;" class="form">
              <div class="form-left">y(x) =</div>
              <v-text-field v-model="eq" label="Например: x^2+2x+3" required @keypress.enter="Draw"></v-text-field>
            </v-col>
            <v-row class="mb=6">
              <v-col cols="12" style="text-align: end">
                <v-btn color="deep-purple" style="color: white" @click="Draw">Построить</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card style="margin-top: 20px;">
          <v-card-title>Результат:</v-card-title>

          <v-skeleton-loader
            v-if="loading"
            height="100"
            type="list-item"
          >
          </v-skeleton-loader>

          <v-card-text v-show="show">
            <v-row no-gutters>
              <v-col cols="12" v-model="Input" v-show="Input !== ''">
                <v-col cols="12">
                  Введено:
                </v-col>
                <v-col cols="12">
                  <img :src="this.Input" alt="" style="margin-left: 1rem;">
                </v-col>
              </v-col>
              <v-col cols="12" v-model="Domain" v-show="Domain !== ''">
                <v-col cols="12">
                  Область определения (D(f)):
                </v-col>
                <v-col cols="12">
                  <img :src="this.Domain" alt="" style="margin-left: 1rem">
                </v-col>
              </v-col>
              <v-col cols="12" v-model="Range" v-show="Range !== ''">
                <v-col cols="12">
                  Область значений (E(f)):
                </v-col>
                <v-col cols="12">
                  <img :src="this.Range" alt="" style="margin-left: 1rem;">
                </v-col>
              </v-col>
              <v-col cols="12" v-model="Root" v-show="Root.length !== 0">
                <v-col cols="12">
                  Пересечение с осью OX:
                </v-col>
                <v-col cols="12">
                  <ul style="margin-left: 0; padding-left: 0;">
                    <li v-for="(item, index) in Root" :key="index" style="list-style-type: none;">
                      <img :src="item" alt="" style="margin-left: 1rem;">
                    </li>
                  </ul>
                </v-col>
              </v-col>
              <v-col cols="12" v-model="Minima" v-show="Domain !== ''">
                <v-col cols="12">
                  Точки минимума:
                </v-col>
                <v-col cols="12">
                  <ul style="margin-left: 0; padding-left: 0;">
                    <li v-if="Minima.length === 0" style="list-style-type: none;">
                      <b>Infinity</b>
                    </li>
                    <li v-else v-for="(item, index) in Minima" :key="index" style="list-style-type: none;">
                      <img :src="item" alt="" style="margin-left: 1rem;">
                    </li>
                  </ul>
                </v-col>
              </v-col>
              <v-col cols="12" v-model="Maxima" v-show="Domain !== ''">
                <v-col cols="12">
                  Точки максимума:
                </v-col>
                <v-col cols="12">
                  <ul style="margin-left: 0; padding-left: 0;">
                    <li v-if="Maxima.length === 0" style="list-style-type: none;">
                      <b>Infinity</b>
                    </li>
                    <li v-else v-for="(item, index) in Maxima" :key="index" style="list-style-type: none;">
                      <img :src="item" alt="" style="margin-left: 1rem;">
                    </li>
                  </ul>
                </v-col>
              </v-col>
              <v-col cols="12" v-model="Plot" v-show="Input !== ''">
                <v-col cols="12">
                  График:
                </v-col>
                <v-col cols="12">
                  <ul style="margin-left: 0; padding-left: 0;">
                    <li v-for="(item, index) in Plot" :key="index" style="list-style-type: none;">
                      <img :src="item" alt="" style="margin-left: 1rem;">
                    </li>
                  </ul>
                </v-col>
              </v-col>
            </v-row>
          </v-card-text>
          <div id="plot"></div>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>

  export default {
    name: "questions",
    data: () => ({
      items: ['Обычный y(x)', 'Заданный параметрически: x(t) и y(t)', 'В полярной системе координат', 'По точкам (по значениям)'],
      eq: '',
      y_min: -10,
      y_max: 10,
      x_min: -100,
      x_max: 100,
      loading: false,
      Input: '',
      Domain: '',
      Range: '',
      Plot: [],
      Root: [],
      Minima: [],
      Maxima: [],
      show: false
    }),
    components: {},
    methods: {
      async Draw() {
        this.show = false
        const expression = this.eq
        const properties = 'Properties as a real function'
        const domain = 'Domain'
        const range = 'Range'
        const roots = 'Roots'
        const root = 'Root'
        const plot = 'Plot'
        const plots = 'Plots'
        const input = 'Input'
        const glob_min = 'Global minima'
        const global_min = 'Global minimum'
        const glob_max = 'Global maxima'
        const global_max = 'Global maximum'
        const InputInter = 'Input interpretation'
        const Implicit = 'Implicit plot'

        try {
          this.loading = true
          const myData = {expression}
          const opt = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(myData)
          }
          const res = await fetch('/api', opt)
          const json = await res.json()
          console.log(json)
          //const arr = json.data.pods

          this.Domain = ''
          this.Range = ''
          this.Root = []
          this.Plot = []
          this.Minima = []
          this.Maxima = []
          this.Input = ''

          json.data.find((el) => {
            if ((el.title === input) || (el.title === InputInter)) {
              el.subpods.find(el6 => {
                this.Input = el6.img.src
              })
            }
            if ((el.title === plot) || (el.title === plots) || (el.title === Implicit)) {
              el.subpods.forEach(el5 => {
                this.Plot.push(el5.img.src)
              })
            }
            if (el.title === properties) {
              el.subpods.find(el2 => {
                if (el2.title === domain) {
                  this.Domain = el2.img.src
                }
                if (el2.title === range) {
                  this.Range = el2.img.src
                }
              })
            }
            if ((el.title === root) || (el.title === roots)) {
              el.subpods.forEach(el3 => {
                this.Root.push(el3.img.src)
              })
            }
            if ((el.title === glob_min) || (el.title === global_min)) {
              el.subpods.forEach(el4 => {
                this.Minima.push(el4.img.src)
              })
            }
            if ((el.title === glob_max) || (el.title === global_max)) {
              el.subpods.forEach(el5 => {
                this.Maxima.push(el5.img.src)
              })
            }
            return;
          })
          this.show = true
        } catch (err) {
          console.error(err)
          alert(err)
        }
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-left {
    margin-right: 10px;
    font-size: 1.5rem;
  }

  @media screen and (max-width: 600px) {
    .form-left {
      font-size: 1rem;
    }
  }
</style>
