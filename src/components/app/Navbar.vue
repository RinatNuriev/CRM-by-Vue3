<template>
    <nav class="navbar orange lighten-1">
        <div class="nav-wrapper">
          <div class="navbar-left">
            <a href="#">
              <i class="material-icons black-text" @click.prevent="$emit('clicker')">dehaze</i>
            </a>
            <span class="black-text">{{ date }}</span>
          </div>

          <ul class="right hide-on-small-and-down">
            <li>
              <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">
                {{ name }}
                <i class="material-icons right">arrow_drop_down</i>
              </a>

              <ul id='dropdown' class='dropdown-content'>
                <li>
                  <router-link to="/profile" class="black-text">
                    <i class="material-icons">account_circle</i>Профиль
                  </router-link>
                </li>
                <li class="divider" tabindex="-1"></li>
                <li>
                  <a href="#" class="black-text" v-on:click.self.prevent="logout">
                    <i class="material-icons">assignment_return</i>Выйти
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
</template>

<script>
    import M from '../../../node_modules/materialize-css/dist/js/materialize.min.js'

    export default {
        data: () => ({
            date: '',
            interval: null,
            dropdown: null,
        }),
        computed: {
          name() {
            return this.$store.getters.info.name
          }
        },

        methods: {
            async logout() {
                await this.$store.dispatch('logout')
                this.$router.push('/login?message=logout')
            },
        },
        mounted() {
            this.interval = setInterval(() => {
                this.date = new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
            }, 1000)
            this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
                constrainWidth: true
            })
        },
        beforeUnmount() {
            clearInterval(this.interval)
            if(this.dropdown && this.dropdown.destroy) {
                this.dropdown.destroy()
            }
        },
        
    }
</script>