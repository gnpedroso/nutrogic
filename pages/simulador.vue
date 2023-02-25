<script setup lang="ts">

let text = ref("")
let response = ref("");

function setResponse(resp: string) {
    return response.value = resp;
}

const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const message = text.value
    await useFetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
        .then((res) => {
            const data: any = res.data.value;
            setResponse(data.message)
        })
}
</script>
<template>
    <div>
        <div>
            <form @submit="handleSubmit">
                <textarea v-model="text" class="w-full h-42"></textarea>
                <button type="submit">Submit</button>
            </form>
            <div v-html="response">
            </div>
        </div>
    </div>
</template>
<style>

</style>