import './assets/main.css'

import { createApp } from 'vue'
import VueSplide from '@splidejs/vue-splide';
import App from './App.vue'
import router from './router/index.js'
import './index.css'
import {initializeApp} from "@firebase/app";
import { getAuth } from 'firebase/auth';


//Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

//Firebase configuration

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase)


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
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Tooltip from 'primevue/tooltip';
import Image from 'primevue/image';
import Message from 'primevue/message';
import Checkbox from 'primevue/checkbox';
import CheckboxGroup from 'primevue/checkboxgroup';
import Paginator from 'primevue/paginator';
import ProgressSpinner from 'primevue/progressspinner';








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
    },
    components: {
        progressspinner: {
            colorScheme: {
                light: {
                    root: {
                        color: {
                            one: '{rose.500}',
                            two: '{rose.500}',
                            three: '{rose.500}',
                            four: '{rose.500}'
                        }
                    }
                },
                dark: {
                    root: {
                        color: {
                            one: '{rose.500}',
                            two: '{rose.500}',
                            three: '{rose.500}',
                            four: '{rose.500}'
                        }
                    }
                }
            }
        }
    }
    
});


//Nav guards for login

import { myUserStore} from '@/authStore'

router.beforeEach((to, from) => {
    const userFromStorage = myUserStore()

    if (userFromStorage.user && (to.name === 'login' || to.name === 'register')) {
        return {name: 'list'}
    }
})


//Pinia
app.use(pinia)


//PrimeVue

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
app.component("IconField", IconField)
app.component("InputIcon", InputIcon)
app.component("InputText", InputText)
app.component("Image", Image)
app.component("Message", Message)
app.component("Checkbox", Checkbox)
app.component("CheckboxGroup", CheckboxGroup)
app.component("Paginator", Paginator)
app.component("ProgressSpinner", ProgressSpinner)



app.directive('tooltip', Tooltip);


app.use( VueSplide );



app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
