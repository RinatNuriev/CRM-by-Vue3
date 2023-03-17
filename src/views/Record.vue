<template>
    <div>
            <div class="page-title">
              <h3>Новая запись</h3>
            </div>

            <loader v-if="loading" />

            <p class="center" v-else-if="!categories.length">Категорий пока нет <router-link to="/categories">Добавить категорию</router-link> </p>

            <form class="form" v-else @submit.prevent="submitHandler">
              <div class="input-field">
                <select ref="select" v-model="category">
                  <option 
                    v-for="cat in categories[0]"
                    :key="cat.id"
                    :value="cat.id"
                  >{{ cat.title }}</option>
                </select>
                <label>Выберите категорию</label>
              </div>

              <p>
                <label>
                  <input class="with-gap" name="type" type="radio" value="income" v-model="type"/>
                  <span>Доход</span>
                </label>
              </p>

              <p>
                <label>
                  <input class="with-gap" name="type" type="radio" value="outcome" v-model="type"/>
                  <span>Расход</span>
                </label>
              </p>

              <div class="input-field">
                <input id="amount" type="number" v-model.number="amount"
                :class="{
                            invalid:
                            v$.amount.dirty && !v$.amount.minValue
                            
                          }"
                >
                <label for="amount">Сумма</label>
                <span class="helper-text invalid"
                v-for="error of v$.amount.$errors"
                                :key="error.$uid">
              
                                {{ error.$message }}
                
                </span>
              </div>

              <div class="input-field">
                <input id="description" type="text" v-model="description"
                :class="{
                            invalid:
                            v$.description.dirty && !v$.description.required
                          }"
                >
                <label for="description">Описание</label>
                <span class="helper-text invalid" v-for="error of v$.description.$errors"
                                :key="error.$uid">
              
                                {{ error.$message }}</span> 
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers } from "@vuelidate/validators";

import M from '../../node_modules/materialize-css/dist/js/materialize.min.js'
import Loader from '@/components/app/Loader.vue';

import { mapGetters } from 'vuex'


export default {
  name: 'record',
  data(){
    return {
      loading: true,
      select: null,
      categories: [],
      type: 'outcome',
      amount: 1,
      description: '',
      category: null
    }
  },
  setup: () => {
    return { v$: useVuelidate() };
    },
  validations: {
        description: {required: helpers.withMessage('Введите название', required)},
        amount: {
            required: helpers.withMessage("Укажите сумму", required),
            minValue: helpers.withMessage(
          ({ $params }) =>
            `Минимальная величина - ${$params.min}`,
          minValue(1)
        )}
    },
  
  async mounted() {
   
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if(this.categories.length) {
      this.category = this.categories[0][0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select, {})
      M.updateTextFields()
    }, 0);
    
  },
  unmounted() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  components: {
    Loader
  },
  methods: {
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch();
                return;
            }

            if(this.canCreateRecord) {
              try {
                await this.$store.dispatch('createRecord', {
                    categoryId: this.category,
                    amount: this.amount,
                    description: this.description,
                    type: this.type,
                    date: new Date().toJSON()
              })

                const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
              
                await this.$store.dispatch('unpdateInfo', {bill})
                this.$message('Запись успешно добавлена')
                this.v$.$reset()
                this.amount = 1
                this.description = ''

              } catch (error) {
                error.message
              }

            } else {
              this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
            }

            
        }
    },
    computed: {
       ...mapGetters(['info']),

       canCreateRecord () {
        if(this.type === 'income') {
          return true
        }

        return this.info.bill >= this.amount
      }
    },
    
}
</script>