<script setup lang="ts">

const dietPlan = ref<string>('');
const formState = reactive({
    isSubmitting: false,
    responseReceived: false,
    error: null,
});

const handleSubmit = async (values: Object) => {

    formState.isSubmitting = true;

    await useFetch('https://nutrogic-server.herokuapp.com/diet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: values
    })
        .then((res) => {
            const data: any = res.data.value;
            setResponse(data.message.content)
        })
        .catch(error => {
            formState.error = error.message;
            formState.isSubmitting = false;
        })
}
function setResponse(resp: string) {
    formState.responseReceived = true;
    return dietPlan.value = resp;
}
</script>
a
<template>
    <div class="p-12">
        <ProviderForm v-if="!formState.isSubmitting && !formState.responseReceived && !formState.error" @submit="handleSubmit" />
        <Loader v-if="formState.isSubmitting && !formState.responseReceived" />
        <DietPlan v-if="formState.responseReceived" :dietPlan="dietPlan" />
        <div v-if="formState.error">Error: {{ formState.error }}</div>
    </div>
</template>