<template>
    <div>
            <div class="page-title">
              <h3>Планирование</h3>
              <h4>{{ currencyFilter(info.bill) }}</h4>
            </div>

            <loader v-if="loading" />
            <p class="center" v-else-if="!categories.length">Категорий пока нет <router-link to="/categories">Добавить категорию</router-link> </p>
            <section v-else>
              <div v-for="cat in categories" :key="cat.id">
                <p>
                  <strong>{{  cat.title + ':' }}</strong>
                  {{ currencyFilter(cat.spend)  }} из {{ currencyFilter(cat.limit) }}
                </p>
                <div class="progress" v-tooltip="cat.tooltip">
                  <div class="determinate" :class="[cat.progressColor]" :style="{width: cat.progressPercent + '%'}"></div>
                </div>
              </div>
            </section>
          </div>
</template>

<script>

import Loader from '@/components/app/Loader.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'planing',
  
 data() {
    return {
      loading: true,
      categories: [],
     
    }
  },

  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')


    this.categories = await categories[0].map(cat => {
      const spend = records[0]
      .filter(r => r.categoryId === cat.id)
      .filter(r => r.type === 'outcome')
      .reduce((total, record) => {
        return total += +record.amount
      }, 0)

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${this.currencyFilter(Math.abs(tooltipValue))}`

      return  {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    // console.log(records[0]);
    // console.log(categories[0]);

    this.loading = false
  },
  components: {
    Loader
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
 
    currencyFilter(value, currency = 'RUB') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency
      }).format(value)
    }
  }
}
</script>