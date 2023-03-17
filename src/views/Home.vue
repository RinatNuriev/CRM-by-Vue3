<template>
  <div>
            <div class="page-title">
              <h3>Счет</h3>

              <button class="btn waves-effect waves-light btn-small" @click="refresh">
                <i class="material-icons">refresh</i>
              </button>
            </div>

            <loader v-if="loading" />

            <div class="row" v-else>
              <home-bill
                :rates="currency.rates"
              />
              <home-currency
                :rates="currency.rates"
                :date="currency.date"
              
              />

            </div>
          </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';
import Loader from '@/components/app/Loader.vue';

export default {
  name: 'Home',
  data: ()=> ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = {
      base: "EUR",
      date: "2023-03-17",
      rates: {EUR: 1, RUB: 82.417123, USD: 1.067851},
      success: true,
      timestamp: 1679079783
    }
    // await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  components: {
    HomeBill, HomeCurrency,
    Loader
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = {
      base: "EUR",
      date: "2023-03-17",
      rates: {EUR: 1, RUB: 82.417123, USD: 1.067851},
      success: true,
      timestamp: 1679079783
    }
      // 
      this.loading = false
    }
  }
}
</script>


<!-- base
: 
"EUR"
date
: 
"2023-03-17"
rates
: 
{EUR: 1, RUB: 82.417123, USD: 1.067851}
success
: 
true
timestamp
: 
1679079783 -->
