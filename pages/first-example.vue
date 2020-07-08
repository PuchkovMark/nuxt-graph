<template>
  <v-layout @click="">
    <v-row danse>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Исследуйте функцию и постройте её график:
          </v-card-title>
          <v-card-text style="color: #000000">
            <katex-expression
              expression='y = \dfrac{(x+1)(x+8)}{x}'
              katex-options='{ "displayMode": true , "throwOnError": true }'>
            </katex-expression>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" style="margin-top: 20px;">


        <v-stepper v-model="e6" vertical>
          <v-card-title>Решение:</v-card-title>
          <v-stepper-step :complete="e6 > 1" step="1">Область определения</v-stepper-step>

          <v-stepper-content step="1">

            <v-col v-if="show" class="buttons_panel">
              <v-btn
                fab
                small
                style="font-size: 2em;"
                @click="addTextAtCaret('rangeInput', '≠')"
              >
                ≠
              </v-btn>
              <v-btn
                fab
                small
                style="font-size: 2em;"
                @click="addTextAtCaret('rangeInput', '→')"
              >
                →
              </v-btn>
              <v-btn
                fab
                small
                style="font-size: 2em;"
                @click="addTextAtCaret('rangeInput', '∈')"
              >
                ∈
              </v-btn>
              <v-btn
                fab
                small
                style="font-size: 2.3em;"
                @click="addTextAtCaret('rangeInput', '∞')"
              >
                ∞
              </v-btn>
              <v-btn
                fab
                small
                style="font-size: 2em;"
                @click="addTextAtCaret('rangeInput', '⋃')"
              >
                ⋃
              </v-btn>
            </v-col>

            <v-col cols="12">
              <v-text-field
                id="rangeInput"
                ref="typeBox"
                v-model="range"
                color="indigo"
                label="введите область определения:"
                filled
                :rules="[rules.required, rangeInputHandler]"
              ></v-text-field>
            </v-col>

            <v-btn color="primary" :disabled="success1" @click="e6 = 2">Продолжить</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2">Четность, нечетность</v-stepper-step>

          <v-stepper-content step="2">
            <v-col cols="12">
              <v-radio-group
                :error="error"
                :success="success"
              >
                <v-radio label="Четная" color="indigo darken-3" @change="radioChangeHandler('1')"></v-radio>
                <v-radio label="Нечетная" color="indigo darken-3" @change="radioChangeHandler('2')"></v-radio>
                <v-radio label="Ни четная, ни нечетная" color="indigo darken-3"
                         @change="radioChangeHandler('3')"></v-radio>
              </v-radio-group>
            </v-col>
            <v-btn color="primary" :disabled="success2" @click="e6 = 3">Продолжить</v-btn>
            <v-btn @click="e6 = 1" text>Назад</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3">Нули функции</v-stepper-step>

          <v-stepper-content step="3">

            <div style="display: flex; justify-content: space-between;">
              <h3 style="align-items: center; justify-content: center; margin: 1rem; flex-direction: column;">x =</h3>

              <v-text-field
                label="введите значение"
                v-model="funcNum1"
                :rules="[rules.required, forNullHandler1]"
              ></v-text-field>

            </div>
            <div style="display: flex; justify-content: space-between;">
              <h3 style="align-items: center; justify-content: center; margin: 1rem; flex-direction: column;">x =</h3>

              <v-text-field
                label="введите значение"
                v-model="funcNum2"
                :rules="[rules.required, forNullHandler2]"
              ></v-text-field>

            </div>
            <v-btn color="primary" :disabled="success3" @click="e6 = 4">Продолжить</v-btn>
            <v-btn @click="e6 = 2" text>Назад</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 4" step="4">Промежутки знакопостоянства</v-stepper-step>
          <v-stepper-content step="4">
            <div class="intervals_wrap">
              <v-row no-gutters>
                <v-col>
                  <v-card-text style="display: flex; justify-content: center; font-size: 30px; padding: unset;">
                    <v-btn fab small class="" style="font-size: 30px;" @click="plusMinus = !plusMinus">
                      {{ btnText }}
                    </v-btn>
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text class="" style="display: flex; justify-content: space-between; padding: unset;">
                    <v-btn fab small style="margin-left: 5%; font-size: 30px;" @click="plusMinus1 = !plusMinus1">
                      {{ btnText1 }}
                    </v-btn>
                    <v-btn fab small style="margin-right: 5%; font-size: 30px;" @click="plusMinus2 = !plusMinus2">
                      {{ btnText2 }}
                    </v-btn>
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text style="display: flex; justify-content: center; font-size: 30px; padding: unset;">
                    <v-btn fab small class="" style="font-size: 30px;" @click="plusMinus3 = !plusMinus3">
                      {{ btnText3 }}
                    </v-btn>
                  </v-card-text>
                </v-col>
              </v-row>
              <v-col style="margin: unset; padding: unset;">
                <img src="/intervals.svg" width="100%" alt="image description">
              </v-col>
              <v-row no-gutters>
                <v-col>
                  <v-card-text style="display: flex; justify-content: flex-end; font-size: 30px; padding: unset; text-align: center; padding-right: 18%;">
                    -8
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text class="" style="display: flex; justify-content: center; font-size: 30px; padding: unset; text-align: center">
                    -1
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text style="display: flex; justify-content: flex-start; font-size: 30px; padding: unset; text-align: center; padding-left: 18%;">
                    0
                  </v-card-text>
                </v-col>
              </v-row>
            </div>
            <v-btn color="primary" :disabled="success4" @click="e6 = 5">Продолжить</v-btn>
            <v-btn @click="e6 = 3" text>Назад</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 5" step="5">Возрастание, убывание</v-stepper-step>
          <v-stepper-content step="5">
            <div style="display: flex; justify-content: space-between;">
              <h3 style="align-items: center; justify-content: center; margin: 1rem; flex-direction: column;">
                <katex-expression
                  expression= 'y^{\prime} = \left(\frac{x^2+9x+8}{x}\right)^{\prime} = '
                  katex-options='{ "displayMode": true , "throwOnError": true }'>
                </katex-expression>
              </h3>

              <v-text-field style="display: flex; align-items: center; justify-content: center;"
                            label="введите ответ"
                            v-model="derivative1"
                            :rules="[rules.required, forDerivative]"
              ></v-text-field>

            </div>
            <v-card-text>
              Показать на плоскости:
            </v-card-text>
            <div class="intervals_wrap">
              <v-row no-gutters>
                <v-col>
                  <v-card-text style="display: flex; justify-content: center; font-size: 30px; padding: unset;">
                    <v-btn fab small class="" style="font-size: 30px;" @click="ascendingDescending1 = !ascendingDescending1">
                      {{ btnTextDerivative }}
                    </v-btn>
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text class="" style="display: flex; justify-content: space-between; padding: unset;">
                    <v-btn fab small style="margin-left: 5%; font-size: 30px;" @click="ascendingDescending2 = !ascendingDescending2">
                      {{ btnTextDerivative1 }}
                    </v-btn>
                    <v-btn fab small style="margin-right: 5%; font-size: 30px;" @click="ascendingDescending3 = !ascendingDescending3">
                      {{ btnTextDerivative2 }}
                    </v-btn>
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text style="display: flex; justify-content: center; font-size: 30px; padding: unset;">
                    <v-btn fab small class="" style="font-size: 30px;" @click="ascendingDescending4 = !ascendingDescending4">
                      {{ btnTextDerivative3 }}
                    </v-btn>
                  </v-card-text>
                </v-col>
              </v-row>
              <v-col style="margin: unset; padding: unset;">
                <img src="/intervals1.svg" width="100%" alt="image description">
              </v-col>
              <v-row no-gutters>
                <v-col>
                  <v-card-text style="display: flex; justify-content: flex-end; font-size: 24px; padding: unset; text-align: center; padding-right: 18%; margin-top: -10%">
                    <katex-expression
                      expression='-2 \sqrt{\smash[b]{2}}'
                      katex-options='{ "displayMode": true , "throwOnError": true }'>
                    </katex-expression>
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text class="" style="display: flex; justify-content: center; font-size: 30px; padding: unset; text-align: center">
                    0
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-text style="display: flex; justify-content: flex-start; font-size: 24px; padding: unset; text-align: center; padding-left: 18%; margin-top: -10%">
                    <katex-expression
                      expression='2 \sqrt{\smash[b]{2}}'
                      katex-options='{ "displayMode": true , "throwOnError": true }'>
                    </katex-expression>
                  </v-card-text>
                </v-col>
              </v-row>
            </div>
            <v-btn color="primary" :disabled="success5" @click="e6 = 6">Продолжить</v-btn>
            <v-btn @click="e6 = 4" text>Назад</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 6" step="6">Выпуклость, вогнутость</v-stepper-step>
          <v-stepper-content step="6">
            <div style="display: flex; justify-content: space-between;">
              <h3 style="align-items: center; justify-content: center; margin: 1rem; flex-direction: column;">
                <katex-expression
                  expression= 'y^{\prime\prime} = \left(\frac{x^2 - 8}{x^2}\right)^{\prime} = '
                  katex-options='{ "displayMode": true , "throwOnError": true }'>
                </katex-expression>
              </h3>

              <v-text-field style="display: flex; align-items: center; justify-content: center;"
                            label="введите ответ"
                            v-model="convex"
                            :rules="[rules.required, forConvex]"
              ></v-text-field>
            </div>
            <v-row no-gutters>
              <v-col>
                <v-card-text style="display: flex; justify-content: center; font-size: 30px; padding: unset;">
                  <v-btn fab small class="" style="font-size: 30px;" @click="convex1 = !convex1">
                    {{ btnTextConvex1 }}
                  </v-btn>
                </v-card-text>
              </v-col>
              <v-col>
                <v-card-text style="display: flex; justify-content: center; font-size: 30px; padding: unset;">
                  <v-btn fab small class="" style="font-size: 30px;" @click="convex2 = !convex2">
                    {{ btnTextConvex2 }}
                  </v-btn>
                </v-card-text>
              </v-col>
            </v-row>
            <v-col style="margin: unset; padding: unset;">
              <img src="/nulls.svg" width="100%" height="60px" alt="image description">
            </v-col>
            <v-col style="padding: unset; margin: unset; text-align: center;font-size: 30px;">
              0
            </v-col>
            <v-btn color="primary" :disabled="success6" @click="e6 = 7">Продолжить</v-btn>
            <v-btn @click="e6 = 5" text>Назад</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 7" step="7">Наклонные асимптоты</v-stepper-step>
          <v-stepper-content step="7">
            <v-card-text>
              Асиптота имеет вид:
              <katex-expression
                expression= 'y = a + bx'
                katex-options='{ "displayMode": true , "throwOnError": true }'>
              </katex-expression>
            </v-card-text>

            <div style="display: flex; justify-content: space-between;">
              <h3 style="align-items: center; justify-content: center; margin: 1rem; flex-direction: column;">a =</h3>

              <v-text-field
                label="введите значение"
                v-model="asimptoticNum1"
                :rules="[rules.required, forAsimptotic1]"
              ></v-text-field>

            </div>
            <div style="display: flex; justify-content: space-between;">
              <h3 style="align-items: center; justify-content: center; margin: 1rem; flex-direction: column;">b =</h3>

              <v-text-field
                label="введите значение"
                v-model="asimptoticNum2"
                :rules="[rules.required, forAsimptotic2]"
              ></v-text-field>
            </div>
            <v-card-text>
              Получили: y = {{`${asimptoticNum1} + ${asimptoticNum2}x`}}
            </v-card-text>
            <v-btn color="primary" :disabled="success7" @click="e6 = 8">Продолжить</v-btn>
            <v-btn @click="e6 = 6" text>Назад</v-btn>
          </v-stepper-content>

          <v-stepper-step step="8">График функции</v-stepper-step>
          <v-stepper-content step="8">
            <v-row no-gutters>
              <v-col>
                Положительные значения X
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                    <tr>
                      <th class="text-left">X</th>
                      <th class="text-left">Y</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="tableCell in tableCells">
                      <td style="padding: unset"><v-text-field
                        type="number"
                        label=""
                        solo
                        hide-details="auto"
                        ref="plusX"
                      ></v-text-field></td>
                      <td style="padding: unset"><v-text-field
                        type="number"
                        label=""
                        solo
                        hide-details="auto"
                        ref="plusY"
                      ></v-text-field></td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-card style="margin-top: 2rem">
                  <v-btn
                    color="deep-purple"
                    dark
                    small
                    absolute
                    bottom
                    center
                    fab
                    @click="addTableCell"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col>

              </v-col>
              <v-col>
                Отрицательные значения X
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                    <tr>
                      <th class="text-left">X</th>
                      <th class="text-left">Y</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="tableCell in tableCells1">
                      <td style="padding: unset"><v-text-field
                        type="number"
                        label=""
                        solo
                        hide-details="auto"
                        ref="minusX"
                      ></v-text-field></td>
                      <td style="padding: unset"><v-text-field
                        type="number"
                        label=""
                        solo
                        hide-details="auto"
                        ref="minusY"
                      ></v-text-field></td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-card style="margin-top: 2rem">
                  <v-btn
                    color="deep-purple"
                    dark
                    small
                    absolute
                    bottom
                    center
                    fab
                    @click="addTableCell1"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
            <v-col cols="12" style="text-align: end">
              <v-btn color="deep-purple" style="color: white; margin-top: 2rem" @click="Draw">Построить</v-btn>
            </v-col>

            <v-col class="wrapPlot" style="display: none">

              <div id="tester" style="width:100%;height:300px;"></div>

            </v-col>


            <v-btn color="primary" @click="e6 = 1">Завершить</v-btn>
            <v-btn @click="e6 = 7" text>Назад</v-btn>
          </v-stepper-content>
        </v-stepper>

      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
  export default {
    name: "first-example",
    data: () => ({
      tableCells: [
        { x: '', y: '' }
      ],
      tableCells1: [
        { x: '', y: '' }
      ],
      show: true,
      e6: 1,
      range: '',
      funcNum1: '',
      funcNum2: '',
      funcNumCount1: false,
      funcNumCount2: false,
      error: false,
      success: false,
      success1: true,
      success2: true,
      success3: true,
      success4: true,
      success5: true,
      success6: true,
      success7: true,
      focusInput: false,
      plusMinus: false,
      plusMinus1: false,
      plusMinus2: false,
      plusMinus3: false,
      ascendingDescending1: false,
      ascendingDescending2: false,
      ascendingDescending3: false,
      ascendingDescending4: false,
      ascendingDescendingFlag: false,
      showPlot: false,
      derivative1: '',
      derivative2: '',
      convex: '',
      minusX: '',
      plusX: '',
      asimptoticNum1: '',
      asimptoticNum2: '',
      convex1: false,
      convex2: false,
      convexFlag: false,
      rules: {
        required: value => !!value || 'Обязательное поле.',
        emailMatch: value => {
          if (value !== 'x≠0→x∈(-∞;0)⋃(0;+∞)') {
            return 'Ответ неверный'
          } else {
            return true
          }
        },
      },
    }),
    computed: {
      btnText() {
        if (this.plusMinus) {
          return '+'
        }
        if (!this.plusMinus && this.plusMinus1 && !this.plusMinus2 && this.plusMinus3) {
          this.success4 = false
        } else {
          this.success4 = true
        }

        return '-'
      },
      btnText1() {
        if (this.plusMinus1) {
          return '+'
        }
        if (!this.plusMinus && this.plusMinus1 && !this.plusMinus2 && this.plusMinus3) {
          this.success4 = false
        } else {
          this.success4 = true
        }

        return '-'
      },
      btnText2() {
        if (this.plusMinus2) {
          return '+'
        }
        if (!this.plusMinus && this.plusMinus1 && !this.plusMinus2 && this.plusMinus3) {
          this.success4 = false
        } else {
          this.success4 = true
        }

        return '-'
      },
      btnText3() {
        if (this.plusMinus3) {
          return '+'
        }
        if (!this.plusMinus && this.plusMinus1 && !this.plusMinus2 && this.plusMinus3) {
          this.success4 = false
        } else {
          this.success4 = true
        }

        return '-'
      },
      btnTextDerivative() {
        if (this.ascendingDescending1) {
          return '+'
        }
        if (this.ascendingDescending1 && !this.ascendingDescending2 && !this.ascendingDescending3 && this.ascendingDescending4) {
          if (this.ascendingDescendingFlag) {
            this.success5 = false
          }
        } else {
          this.success5 = true
        }

        return '-'
      },
      btnTextDerivative1() {
        if (this.ascendingDescending2) {
          return '+'
        }
        if (this.ascendingDescending1 && !this.ascendingDescending2 && !this.ascendingDescending3 && this.ascendingDescending4) {
          if (this.ascendingDescendingFlag) {
            this.success5 = false
          }
        } else {
          this.success5 = true
        }

        return '-'
      },
      btnTextDerivative2() {
        if (this.ascendingDescending3) {
          return '+'
        }
        if (this.ascendingDescending1 && !this.ascendingDescending2 && !this.ascendingDescending3 && this.ascendingDescending4) {
          if (this.ascendingDescendingFlag) {
            this.success5 = false
          }
        } else {
          this.success5 = true
        }

        return '-'
      },
      btnTextDerivative3() {
        if (this.ascendingDescending4) {
          return '+'
        }
        if (this.ascendingDescending1 && !this.ascendingDescending2 && !this.ascendingDescending3 && this.ascendingDescending4) {
          if (this.ascendingDescendingFlag) {
            this.success5 = false
          }
        } else {
          this.success5 = true
        }

        return '-'
      },
      btnTextConvex1() {
        if (this.convex1) {
          return '+'
        }
        if (!this.convex1 && this.convex2) {
          if (this.convexFlag) {
            this.success6 = false
          }
        } else {
          this.success6 = true
        }

        return '-'
      },
      btnTextConvex2() {
        if (this.convex2) {
          return '+'
        }
        if (!this.convex1 && this.convex2) {
          if (this.convexFlag) {
            this.success6 = false
          }
        } else {
          this.success6 = true
        }
        return '-'
      },
    },
    methods: {
      addTableCell() {
        this.tableCells.push({x: '', y: ''});
      },
      addTableCell1() {
        this.tableCells1.push({x: '', y: ''});
      },
      Draw() {
        const arrayPlusXDirty = this.$refs.plusX
        const arrayPlusYDirty = this.$refs.plusY
        const arrayMinusXDirty = this.$refs.minusX
        const arrayMinusYDirty = this.$refs.minusY

        const arrayPlusX = []
        const arrayPlusY = []
        const arrayMinusX = []
        const arrayMinusY = []

        arrayPlusXDirty.forEach(e => {
          arrayPlusX.push(e.$refs.input.valueAsNumber)
        })
        arrayPlusYDirty.forEach(e => {
          arrayPlusY.push(e.$refs.input.valueAsNumber)
        })
        arrayMinusXDirty.forEach(e => {
          arrayMinusX.push(e.$refs.input.valueAsNumber)
        })
        arrayMinusYDirty.forEach(e => {
          arrayMinusY.push(e.$refs.input.valueAsNumber)
        })
        let trace1 = {
          x: arrayPlusX,
          y: arrayPlusY,
          type: 'scatter'
        }
        let trace2 = {
          x: arrayMinusX,
          y: arrayMinusY,
          type: 'scatter'
        }
        const wrapPlot = document.querySelector('.wrapPlot')
        if (this.showPlot) {
          wrapPlot.style.display = "none"
          document.getElementById('tester').remove()
          const createDiv = document.createElement('div')
          createDiv.id = 'tester'
          createDiv.style.width = "100%"
          createDiv.style.height = "300px"
          wrapPlot.append(createDiv)
          this.showPlot = false
        }
        wrapPlot.style.display = "block"
        let TESTER = document.getElementById('tester')
        let data = [trace1, trace2]
        Plotly.plot( TESTER, data, {
          margin: { t: 0 } }, {displayModeBar: false} )
        this.showPlot = true
      },
      addTextAtCaret(textAreaId, text) {
        function addTextAtCursorPosition(textArea, cursorPosition, text) {
          let front = (textArea.value).substring(0, cursorPosition);
          let back = (textArea.value).substring(cursorPosition, textArea.value.length);
          textArea.value = front + text + back;
          return textArea.value
        }

        function updateCursorPosition(cursorPosition, text, textArea) {
          cursorPosition = cursorPosition + text.length;
          textArea.selectionStart = cursorPosition;
          textArea.selectionEnd = cursorPosition++;
          textArea.focus()
        }

        let textArea = document.getElementById(textAreaId);
        let cursorPosition = textArea.selectionStart;
        this.range = addTextAtCursorPosition(textArea, cursorPosition, text);
        updateCursorPosition(cursorPosition, text, textArea);
      },
      rangeInputHandler() {
        let range = this.range.toString().replace(/\s+/g, '').trim()
        if (range !== 'x≠0→x∈(-∞;0)⋃(0;+∞)' && range !== '(-∞;0)⋃(0;+∞)') {
          this.success1 = true
          return 'Ответ неверный'
        } else {
          this.success1 = false
          return true
        }
      },
      forDerivative() {
        let expression = this.derivative1.toString().replace(/\s+/g, '').trim()
        if (expression !== '((x^2)-8)/x^2' && expression !== '((x-2sqrt(2)(x-2sqrt(2))))/x^2' && expression !== '((x-2√2)(x-2√2))/x^2' && expression !== '(x^2-8)/x^2)') {
          this.success5 = true
          return 'Ответ неверный'
        } else {
          this.ascendingDescendingFlag = true
          if (this.ascendingDescending1 && !this.ascendingDescending2 && !this.ascendingDescending3 && this.ascendingDescending4) {
            this.success5 = false
          } else {
            this.success5 = true
          }
          return true
        }
      },
      forConvex() {
        let expression = this.convex.toString().replace(/\s+/g, '').trim()
        if (expression !== '16/x^3') {
          this.success6 = true
          return 'Ответ неверный'
        } else {
          this.convexFlag = true
          if (this.convex1 && !this.convex2) {
            this.success6 = false
          } else {
            this.success6 = true
          }
          return true
        }
      },
      forAsimptotic1() {
        if (this.asimptoticNum1.toString().trim() === '9') {
          this.success7 = true
          if (this.asimptoticNum2.toString().trim() === '1') {
            this.success7 = false
          }
          return true
        }
        this.success7 = true
        return 'ответ не верный'
      },
      forAsimptotic2() {
        if (this.asimptoticNum2.toString().trim() === '1') {
          this.success7 = true
          if (this.asimptoticNum1.toString().trim() === '9') {
            this.success7 = false
          }
          return true
        }
        this.success7 = true
        return 'ответ не верный'
      },
      forNullHandler1() {
        if ((this.funcNum1 === '-1') || (this.funcNum1 === '-8')) {
          if (this.funcNum1 === '-1') {
            if (this.funcNumCount1 === true) {
              return 'нули не должны совпадать'
            } else {
              this.funcNumCount1 = true
              if (this.funcNumCount1 === true && this.funcNumCount2 === true) {
                this.success3 = false
              }
              return true
            }
          }
          if (this.funcNum1 === '-8') {
            if (this.funcNumCount2 === true) {
              return 'нули не должны совпадать'
            } else {
              this.funcNumCount2 = true
              if (this.funcNumCount1 === true && this.funcNumCount2 === true) {
                this.success3 = false
              }
              return true
            }
          }
        }
        if ((this.funcNum1 !== '-1') && (this.funcNum1 !== '-8')) {
          if (this.funcNum1 === '') {
            return true
          } else {
            if (this.funcNum2 !== '-1') {
              this.funcNumCount1 = false
            }
            if (this.funcNum2 !== '-8') {
              this.funcNumCount2 = false
            }
            this.success3 = true
            return 'не верно'
          }
        }
        return false
      },
      forNullHandler2() {
        if ((this.funcNum2 === '-1') || (this.funcNum2 === '-8')) {
          if (this.funcNum2 === '-1') {
            if (this.funcNumCount1 === true) {
              return 'нули не должны совпадать'
            } else {
              this.funcNumCount1 = true
              if (this.funcNumCount1 === true && this.funcNumCount2 === true) {
                this.success3 = false
              }
              return true
            }
          }
          if (this.funcNum2 === '-8') {
            if (this.funcNumCount2 === true) {
              return 'нули не должны совпадать'
            } else {
              this.funcNumCount2 = true
              if (this.funcNumCount1 === true && this.funcNumCount2 === true) {
                this.success3 = false
              }
              return true
            }
          }
        }
        if ((this.funcNum2 !== '-1') && (this.funcNum2 !== '-8')) {
          if (this.funcNum2 === '') {
            return true
          } else {
            if (this.funcNum1 !== '-1') {
              this.funcNumCount1 = false
            }
            if (this.funcNum1 !== '-8') {
              this.funcNumCount2 = false
            }
            this.success3 = true
            return 'не верно'
          }
        }
        return false
      },
      radioChangeHandler(index) {
        switch (index) {
          case '1': {
            this.error = true
            this.success = false
            this.success2 = true
            break
          }
          case '2': {
            this.error = true
            this.success = false
            this.success2 = true
            break
          }
          case '3': {
            this.error = false
            this.success = true
            this.success2 = false
            break
          }
          default: {
            return this.error = true
          }
        }
      },
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

  .intervals_wrap {
    margin: 1rem;
  }
</style>
