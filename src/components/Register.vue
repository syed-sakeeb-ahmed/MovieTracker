<script setup>
import { ref, reactive } from 'vue';
import { Form } from '@primevue/forms';
import { supabase } from '../supabase.js'
import {useRouter} from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const initialValues = reactive({
    email: '',
    username: '',
    password: ''
});

const router = useRouter()

const validatedValues = reactive({
    email: '',
    password: '',
})

const resolver = async ({ values }) => {
    const errors = {};

    if (!values.email) {
        errors.email = [{ message: 'Email is required.' }];
    }

    // if (!values.username) {
    //     errors.username = [{ message: 'Username is required.' }];
    // }

    if (!values.password) {
        errors.password = [{ message: 'Password is required.' }];
    }


    return {
        errors
    };
};

const onFormSubmit = async ({ valid, states }) => {
    if (valid) {
        const auth = getAuth();
createUserWithEmailAndPassword(auth, states.email.value, states.password.value)
  .then((userCredential) => {
    router.replace('/list')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw error
    // ..
  });
    
    }
}
</script>


<template>
    <div class="mt-[75px] flex flex-col rounded-[10px] loginShadow justify-between items-center box-shad bg-white w-[80%] max-w-[483px]">
        <Form class="flex flex-col w-full mt-[75px]" v-slot="$form" :initialValues :resolver :validateOnValueUpdate="false" :validateOnBlur="true" @submit="onFormSubmit" >
            <div class="flex flex-col gap-[10px] items-center">
                <div class="w-[70%]">
                    <div class="text-[24px] font-bold mb-[10px]">Create your account</div>
                    <div class="font-bold">Email</div>
                    <InputText name="email" type="text" fluid/>
                    <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
                </div>

                <!-- <div class="w-[70%]">
                    <div class="font-bold">Username</div>
                    <InputText name="username" type="text" fluid/>
                    <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
                </div> -->
            
            
                <div class="w-[70%]">
                    <div class="font-bold">Password</div>
                    <InputText name="password" type="text" fluid/>
                    <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error.message }}</Message>
                    <div class="flex items-center gap-[5px] mt-[10px]">
        <Checkbox v-model="rememberMe" inputId="remember" name="remember" value="Remember" />
        <label for="remember"> Remember Me </label>
    </div>
                    <Button class="mt-[10px]" type="submit" label="Create Account" fluid/>
                </div>
            </div>
        </Form>
        <div class="roundLoginFooter flex items-center justify-center bg-[#f7f9fc] w-full h-[75px] mt-[100px]">
            <span>Already have an account? <span class="text-[#E53939]"> <RouterLink to="/login">Sign in</RouterLink></span></span> 
        </div>
    </div>
</template>


