import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default defineNuxtPlugin((nuxtApp) => {
  library.add(fab, fas)
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
