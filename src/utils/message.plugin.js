import M from '../../node_modules/materialize-css/dist/js/materialize.min.js'

export default {
    install(Vue) {
        Vue.config.globalProperties.$message = function(html) {
            M.toast({html})
        }

        Vue.config.globalProperties.$error = function(html) {
            M.toast({html: `[Ошибка]: ${html}`})
        }
    }
}