import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './index.css'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

import PrimeVue from 'primevue/config';
import Slider from 'primevue/slider';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import DatePicker from 'primevue/datepicker';
import Popover from 'primevue/popover';
import Button from "primevue/button"


import Aura from '@primeuix/themes/aura';


/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add([faMagnifyingGlass, faPlus])

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('Slider', Slider);
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);
app.component('DatePicker', DatePicker);
app.component('Popover', Popover);
app.component('Button', Button);






app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
