<script setup lang="ts">
import { ref, onMounted } from 'vue';

let currentCuriosity = ref<string>('');

interface CuriosityData {
  curiosities: { id: number, text: string }[];
}

defineProps<{
  loading?: boolean
}>();

function generateCuriosity(data: CuriosityData, index: number) {
  currentCuriosity.value = data.curiosities[index].text;

}
onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const response = await fetch('static/curiosities.json');
  const data = await response.json();
  let randomNumber = Math.floor(Math.random() * 31);
  generateCuriosity(data, randomNumber)

  setInterval(() => {
    randomNumber = Math.floor(Math.random() * 31);
    generateCuriosity(data, randomNumber)
  }, 12000);
})
</script>

<template>
  <div
    class="flex mx-auto items-center justify-start flex-col w-full h-full max-w-[800px] p-20 bg-gray-50 rounded-lg text-gray-600">
    <span class="loader"></span>
    <span class="text-lg pt-3">Carregando...</span>
    <div class="flex mt-12 mx-auto items-center justify-start flex-col">
      <p class="text-xl">Você sabia?</p>
      <p class="text-md">
        {{ currentCuriosity }}
      </p>
    </div>
  </div>
</template>

<style>
.loader {
  margin-top: 20px;
  box-sizing: border-box;
  display: inline-block;
  width: 50px;
  height: 80px;
  border-top: 5px solid #ccc;
  border-bottom: 5px solid #ccc;
  position: relative;
  background: linear-gradient(#77E290 30px, transparent 0) no-repeat;
  background-size: 2px 40px;
  background-position: 50% 0px;
  animation: spinx 5s linear infinite;
}

.loader:before,
.loader:after {
  content: "";
  width: 40px;
  left: 50%;
  height: 35px;
  position: absolute;
  top: 0;
  transform: translatex(-50%);
  background: rgba(207, 206, 206, 0.4);
  border-radius: 0 0 20px 20px;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: 0 0px;
  animation: lqt 5s linear infinite;
}

.loader:after {
  top: auto;
  bottom: 0;
  border-radius: 20px 20px 0 0;
  animation: lqb 5s linear infinite;
}

@keyframes lqt {
  0%,
  100% {
    background-image: linear-gradient(#77E290 40px, transparent 0);
    background-position: 0% 0px;
  }

  50% {
    background-image: linear-gradient(#77E290 40px, transparent 0);
    background-position: 0% 40px;
  }

  50.1% {
    background-image: linear-gradient(#77E290 40px, transparent 0);
    background-position: 0% -40px;
  }
}

@keyframes lqb {
  0% {
    background-image: linear-gradient(#77E290 40px, transparent 0);
    background-position: 0 40px;
  }

  100% {
    background-image: linear-gradient(#77E290 40px, transparent 0);
    background-position: 0 -40px;
  }
}

@keyframes spinx {
  0%,
  49% {
    transform: rotate(0deg);
    background-position: 50% 36px;
  }

  51%,
  98% {
    transform: rotate(180deg);
    background-position: 50% 4px;
  }

  100% {
    transform: rotate(360deg);
    background-position: 50% 36px;
  }
}
</style>