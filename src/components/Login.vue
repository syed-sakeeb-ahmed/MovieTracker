<script setup>
import { ref } from 'vue';
import { Form } from '@primevue/forms';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'
import {getErrorString} from '@/utilites/jsonUtilities';


const router = useRouter()
const errorMessage = ref("")

const initialValues = ref({
    email: '',
    firstName: '',
    password: ''
});


const resolver = ({ values }) => {
    const errors = {};

    if (!values.email) {
        errors.email = [{ message: 'Email is required.' }];
    }

    if (!values.name) {
        errors.firstName = [{ message: 'First name is required.' }];
    }

    if (!values.password) {
        errors.password = [{ message: 'Password is required.' }];
    }

    return {
        errors
    };
};

const onFormSubmit = ({ valid, states }) => {
    if (valid) {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, states.email.value, states.password.value)
  .then((userCredential) => {
    // Signed in 
    // console.log("Logged in")
    router.replace('/list')

    // ...
  })
  .catch((error) => {
        errorMessage.value = getErrorString(error.code)
  });
    }
}
</script>


<template>
    <div class="mt-[75px] flex flex-col rounded-[10px] loginShadow justify-between items-center box-shad bg-white w-[80%] max-w-[483px]">
        <Form class="flex flex-col w-full mt-[75px]" v-slot="$form" :initialValues :resolver :validateOnValueUpdate="false" :validateOnBlur="true" @submit="onFormSubmit" >
            <div class="flex flex-col gap-[10px] items-center">
                <div class="w-[70%]">
                    <div class="text-[24px] font-bold mb-[10px]">Sign in to your account</div>
                    <div class="font-bold">Email</div>
                    <InputText name="email" type="text" fluid/>
                    <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
                </div>
            
            
                <div class="w-[70%]">
                    <div class="font-bold">Password</div>
                    <InputText name="password" type="text" fluid/>
                    <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error.message }}</Message>
                    <Message severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
                    <div class="flex items-center gap-[5px] mt-[10px]">
        <!-- <Checkbox v-model="rememberMe" inputId="remember" name="remember" value="Remember" />
        <label for="remember"> Remember Me </label> -->
    </div>
                    <Button class="mt-[10px]" type="submit" label="Sign in" fluid/>
                </div>
            </div>
        </Form>
        <div class="roundLoginFooter flex items-center justify-center bg-[#f7f9fc] w-full h-[75px] mt-[100px]">
            <span>New to MyMovieIndex? <span class="text-[#E53939]"> <RouterLink to="/register">Create Account</RouterLink></span></span> 
        </div>
    </div>
</template>


