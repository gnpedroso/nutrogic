<script setup lang="ts">
defineProps<{
    dietPlan?: String
}>();
</script>

<template>
    <div class="flex mx-auto items-center flex-col">
        <span class="md:text-xl text-lg text-gray-600">
            Plano de dieta:
        </span>
    </div>
    <div class="flex mx-auto items-center justify-start flex-col w-full h-full max-w-[800px] p-10 bg-gray-50 rounded-lg">
        <div v-html="dietPlan"></div>
    </div>
</template>

<style></style>