<template>
    <div>
            <div class="page-title">
              <h3>История записей</h3>
            </div>

            
            <div class="history-chart">
              <canvas ref="canvas"></canvas>
            </div>

            <loader v-if="loading" />

            <p class="center" v-else-if="!records.length">Записей пока нет.</p>

            <section v-else>
              <history-table :records="items"/>
              
              <Paginate 
                v-model="page"
                :page-count="pageCount"
                :click-handler="pageChangeHandler"
                :prev-text="'Назад'"
                :next-text="'Вперед'"
                :container-class="'pagination'"
                :page-class="'waves-effect'"
              
              
              />
            </section>
          </div>

          
</template>


<script>

import HistoryTable from '@/components/HistoryTable.vue';
import Loader from '@/components/app/Loader.vue';
import paginationMixin from '@/mixins/pagination.mixin.js'

import { Pie } from 'vue-chartjs'

export default {
  name: 'history',
  extends: Pie,
  mixins: [paginationMixin],
  data(){
    return {
      loading: true,
      records:[],
      categories: [],
      
    }
  },
  components: {
    HistoryTable,
    Loader,

    
},
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')

    this.setup()

    this.loading = false
  },

  methods: {
    setup() {
      this.setupPagination(this.records[0].map((record) => {
            return {
                ...record,
                categoryName: this.categories[0].find(c => c.id === record.categoryId).title,
                typeClass: record.type === 'income' ? 'green' : 'red',
                typeText: record.type === 'income' ? 'Доход' : 'Расход',
              }
          }))

          this.renderChart({
                  labels: 
                    this.categories[0].map(c => c.title)
                  ,
                  datasets: [{
                    label: 'Расходы по категориям',
                    data: this.categories[0].map(c => {
                      return this.records[0].reduce((total, r) => {
                        if(r.categoryId === c.id && r.type === 'outcome') {
                          total += +r.amount
                        }
                        return total
                      }, 0)
                    }),
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)',
                      'rgb(255, 166, 132)',
                      'rgb(54, 162, 166)',
                      'rgb(255, 166, 86)',
                      'rgb(166, 166, 86)',
                    ],
                    hoverOffset: 4
                  }]
                })
      }

      
  }
 
}
</script>