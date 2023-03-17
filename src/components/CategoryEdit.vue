<template>
    <div class="col s12 m6">
                  <div>
                    <div class="page-subtitle">
                      <h4>Редактировать</h4>
                    </div>

                    <form @submit.prevent="submitHandler">
                      <div class="input-field">
                        <select ref="select" v-model="current">
                          <option
                            v-for="c of categories[0]"
                            :key="c.id"
                            :value="c.id"
                          >{{ c.title }}</option>

                          

                        </select>
                        <label>Выберите категорию</label>
                      </div>

                      <div class="input-field">
                          <input 
                          id="name" 
                          type="text"
                          v-model="title"
                          :class="{
                            invalid:
                            v$.title.dirty && !v$.title.required
                          }"
                          >
                          <label for="name">Название</label>
                          <span class="helper-text invalid"
                          v-for="error of v$.title.$errors"
                                :key="error.$uid">
              
                                {{ error.$message }}
                        </span>
                        </div>

                        <div class="input-field">
                          <input 
                          id="limit"
                          type="number"
                          v-model.number="limit"
                          :class="{
                            invalid:
                            v$.title.dirty && !v$.title.minValue
                          }"
                          
                          >
                          <label for="limit">Лимит</label>
                          <span class="helper-text invalid"
                          v-for="error of v$.limit.$errors"
                                :key="error.$uid">
              
                                {{ error.$message }}</span>
                        </div>

                      <button class="btn waves-effect waves-light" type="submit">
                        Обновить
                        <i class="material-icons right">send</i>
                      </button>
                    </form>
                  </div>
                </div>
</template>


<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers } from "@vuelidate/validators";

import M from '../../node_modules/materialize-css/dist/js/materialize.min.js'
export default {
  setup: () => {
    return { v$: useVuelidate() };
    },
  data() {
    return {
      select: 'A',
      title: '',
      limit: 100,
      current: null
    }
  },
  validations: {
        title: {required: helpers.withMessage('Введите название категории', required)},
        limit: {
            required: helpers.withMessage("Укажите сумму", required),
            minValue: helpers.withMessage(
          ({ $params }) =>
            `Минимальная величина - ${$params.min}`,
          minValue(100)
        )}
    },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
   mounted() {
    M.updateTextFields()
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select, {})
    }, 0);
    
  },
  unmounted() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories[0].find(c => c.id === catId)
      this.title = title
      this.limit = limit

    }
  },
  created() {
    const {id, title, limit } = this.categories[0][0]
    this.current = id
    this.title = title
    this.limit = limit

  },
  methods: {
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch();
                return;
            }

            try {
                const categoryData = {
                  id: this.current,
                  title: this.title,
                  limit: this.limit
                }

                await this.$store.dispatch('updateCategory', categoryData)
                this.$message('Категория обновлена')

                this.$emit('updated', categoryData)

            } catch (error) {
                error.message
            }

            
        }
    },
}
</script>