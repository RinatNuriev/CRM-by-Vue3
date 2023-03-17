<template>
    <div class="col s12 m6">
            <div>
                    <div class="page-subtitle">
                      <h4>Создать</h4>
                    </div>

                    <form @submit.prevent="submitHandler">
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
                          Создать
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
    data: ()=> ({
        title: '',
        limit: 100
    }),
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
    methods: {
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch();
                return;
            }

            try {
                const category = await this.$store.dispatch('createCategory', {
                    title: this.title,
                    limit: this.limit
                })

                this.title = ''
                this.limit = 100
                this.v$.$reset()

                this.$message('Категория была создана')

                this.$emit('created', category)
            } catch (error) {
                error.message
            }

            
        }
    },
    mounted() {
        M.updateTextFields()
    }
}
</script>