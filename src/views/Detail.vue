<template>
    <div>
            <div>
              <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">История</router-link>
                <a @click.prevent class="breadcrumb">
                  {{ record.type === 'income' ? 'Доход' : 'Расход'  }}
                </a>
              </div>
              <div class="row">
                <div class="col s12 m6">
                  <div class="card" :class="{
                    'red': record.type === 'outcome',
                    'green': record.type === 'income'
                  }">
                    <div class="card-content white-text">
                      <p>Описание: {{ record.description }} </p>
                      <p>Сумма: {{ record.amount }}</p>
                      <p>Категория: {{ record.categoryName }} </p>

                      <small>{{ record.date }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
</template>


<script>
export default {
  name: 'detail',
  data() {
    return {
      record: 'a',
      
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const records = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', records[0].categoryId)

    this.record = {
      ...records[0],
      categoryName: category[0].title
    }

  },


}
</script>