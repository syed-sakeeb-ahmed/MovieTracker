import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './index.css'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import Slider from 'primevue/slider';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import DatePicker from 'primevue/datepicker';
import Popover from 'primevue/popover';
import Button from "primevue/button"
import MultiSelect from 'primevue/multiselect';
import AutoComplete from 'primevue/autocomplete';
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';
import Fieldset from 'primevue/fieldset';

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';






import Aura from '@primeuix/themes/aura';


/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add([faMagnifyingGlass, faPlus])

const app = createApp(App)

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{rose.50}',
            100: '{rose.100}',
            200: '{rose.200}',
            300: '{rose.300}',
            400: '{rose.400}',
            500: '{rose.500}',
            600: '{rose.600}',
            700: '{rose.700}',
            800: '{rose.800}',
            900: '{rose.900}',
            950: '{rose.950}'
        }
    }
});


app.use(PrimeVue, {
    theme: {
        preset: MyPreset
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
app.component('MultiSelect', MultiSelect);
app.component('AutoComplete', AutoComplete);
app.component('Select', Select);
app.component('InputNumber', InputNumber);
app.component("Fieldset", Fieldset)
app.component("Accordion", Accordion)
app.component("AccordionHeader", AccordionHeader)
app.component("AccordionPanel", AccordionPanel)
app.component("AccordionContent", AccordionContent)






app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
