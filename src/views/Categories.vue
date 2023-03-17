<template>
        <div>
            <div class="page-title">
              <h3>Категории</h3>
            </div>
            <section>
              <loader v-if="loading" />
              
              <div class="row" v-else>

                <category-create @created="addNewCategory" />
                <category-edit
                v-if="categories.length"
                :categories="categories"
                :key="categories.length + updateCount"
                @updated="updateCategories"
                />
                <p class="center" v-else>Категорий пока нет</p>

              </div>
            </section>
          </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';
import Loader from '@/components/app/Loader.vue';


export default {
  name: 'categories',
  components: {
    CategoryCreate, CategoryEdit, Loader
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories[0].findIndex(c => c.id === category.id)
      this.categories[0][idx].title = category.title
      this.categories[0][idx].limit = category.limit
      this.updateCount++
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    // console.log(this.categories);
  }
}
</script>