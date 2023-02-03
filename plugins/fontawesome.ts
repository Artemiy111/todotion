import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPlus, faXmark, faBrush, faDownload } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion, faMoon } from '@fortawesome/free-regular-svg-icons'

import { faGithub } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false
library.add(faPlus, faXmark, faBrush, faMoon, faCircleQuestion, faDownload, faGithub)

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
