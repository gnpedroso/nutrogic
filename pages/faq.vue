<script setup lang="ts">
import { ref } from "vue"
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    providerGender: Yup.string()
        .required('Este campo é obrigatório'),
    providerAge: Yup.number()
        .required('Este campo é obrigatório').typeError("Este campo deve ser um número"),
    providerWeight: Yup.number()
        .required('Este campo é obrigatório').typeError("Este campo deve ser um número"),
    providerHeight: Yup.number()
        .required('Este campo é obrigatório').typeError("Este campo deve ser um número"),
    providerActivityLevel: Yup.string()
        .required('Este campo é obrigatório'),
    weightObjective: Yup.string()
        .required('Este campo é obrigatório'),
    dietFrequency: Yup.string()
        .required('Este campo é obrigatório'),
    mealFrequency: Yup.string()
        .required('Este campo é obrigatório')
});

const steps = ref<number>(1)

function onSubmit(values: Object) {
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
}

const myForm = ref(null);

function changeStep(step: number) {
    if (step === 2) {
        const fieldsToValidate = ['providerGender', 'providerAge', 'providerWeight', 'providerHeight'];
        myForm.value?.validate().then((result) => {
            let hasErrors = !result.valid;

            // Iterate over the fieldsToValidate array
            if (hasErrors) {
                for (const field of fieldsToValidate) {
                    // Check if the current field is present in the errors object
                    if (result.errors.hasOwnProperty(field)) {
                        hasErrors = true;
                        break;
                    } else hasErrors = false
                }
            }

            // Proceed to step 2 if there are no errors in step 1
            if (!hasErrors) {
                steps.value = step;
            }
        });
    } else {
        steps.value = step;
    }
}



</script>
<template>
    <div class="p-12">
        <div
            class="flex mx-auto items-center justify-start flex-col w-full h-full max-w-[400px] p-10 bg-gray-50 rounded-lg">
            <Transition name="fade" mode="out-in">
                <div v-show="steps == 1 || steps == 2" class="w-full mb-4">
                    <h1 class="_title">Preencha o formulário:</h1>
                    <div
                        class="flex items-center justify-between [&>p]:text-xs [&>p]:pb-1 [&>p]:font-semibold [&>p]:w-full [&>p]:cursor-pointer [&>p]:border-b-[5px] [&>p]:flex [&>p]:items-center [&>p]:justify-between">
                        <p class="mr-2" @click="changeStep(1)"
                            :class="[steps == 1 ? 'text-gray-700 border-gray-700' : 'border-green-400 text-green-400']">
                            1. Informações pessoais
                        </p>
                        <p @click="changeStep(2)"
                            :class="steps == 1 ? 'border-b-gray-400 text-gray-400' : 'text-gray-700 border-gray-700'">
                            2. Objetivos
                        </p>
                    </div>
                </div>
            </Transition>
            <Form ref="myForm" class="relative w-full" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
                <Transition name="fade" mode="out-in">
                    <!-- Step 1 -->
                    <div class="flex flex-col" v-if="steps == 1">
                        <p class="_sub-title">Informações pessoais</p>
                        <div class="relative mb-3">
                            <i class="arrow"></i>
                            <Field as="select" class="_input m-0" name="providerGender" id="gender"
                                :class="{ 'border-red-600': errors.providerGender }">
                                <option disabled selected value="">Gênero</option>
                                <option value="homen">Homem</option>
                                <option value="mulher">Mulher</option>
                            </Field>
                            <div class="text-sm text-red-600">{{ errors.providerGender }}</div>
                        </div>
                        <div class="mb-3">
                            <Field name="providerAge" type="text" class="_input m-0"
                                :class="{ 'border-red-600': errors.providerAge }" placeholder="Idade" />
                            <div class="text-sm text-red-600">{{ errors.providerAge }}</div>
                        </div>

                        <div class="mb-3">
                            <div class="flex relative">
                                <Field name="providerWeight" class="_input m-0" type="text"
                                    :class="{ 'border-red-600': errors.providerWeight }" placeholder="Peso (kg)" />
                                <span class="text-gray-400 text-sm absolute top-3 right-3">kg</span>
                            </div>
                            <div class="text-sm text-red-600">{{ errors.providerWeight }}</div>
                        </div>

                        <div class="mb-3">
                            <div class="flex relative">
                                <Field name="providerHeight" class="_input m-0" type="text"
                                    :class="{ 'border-red-600': errors.providerHeight }" placeholder="Altura (cm)" />
                                <span class="text-gray-400 text-sm absolute top-3 right-3">cm</span>
                            </div>
                            <div class="text-sm text-red-600">{{ errors.providerHeight }}</div>
                        </div>

                        <div class="relative mb-3">
                            <i class="arrow"></i>
                            <Field as="select" class="_input m-0" name="providerActivityLevel" id="activity-level"
                                :class="{ 'border-red-600': errors.providerActivityLevel }">
                                <option disabled selected value="">Nível de atividade Física</option>
                                <option value="sedentario">Sedentário</option>
                                <option value="levemento ativo">Levemente Ativo</option>
                                <option value="ativo">Ativo</option>
                                <option value="muito ativo">Muito Ativo</option>
                            </Field>
                            <div class="text-sm text-red-600">{{ errors.providerActivityLevel }}</div>
                        </div>
                        <p @click="changeStep(2)" class="_btn-bordered">
                            Próximo passo</p>
                    </div>
                    <!-- Step 1-end -->

                    <!-- Step 2 -->
                    <div class="flex flex-col" v-else-if="steps == 2">
                        <div>
                            <label class="_sub-title" for="weightObjective">Qual seu objetivo com este plano de
                                dieta?</label>
                            <div class="relative">
                                <i class="arrow"></i>
                                <Field as="select" class="_input m-0" name="weightObjective" id="activity-level"
                                    :class="{ 'border-red-600': errors.weightObjective }">
                                    <option disabled selected value="">Objetivo</option>
                                    <option value="perda de peso">Perda de peso</option>
                                    <option value="ganho de peso">Ganho de peso</option>
                                </Field>
                                <div class="text-sm text-red-600">{{ errors.weightObjective }}</div>
                            </div>

                        </div>
                        <div class="py-3">
                            <label class="_sub-title" for="dietFrequency">Plano para quantos dias por semana?</label>
                            <div class="relative">
                                <Field name="dietFrequency" class="_input m-0" type="text" placeholder="Frequência da dieta"
                                    :class="{ 'border-red-600': errors.dietFrequency }" />
                                <span class="text-gray-400 text-sm absolute top-3 right-3">dias/semana</span>
                            </div>
                            <div class="text-sm text-red-600">{{ errors.dietFrequency }}</div>

                        </div>

                        <div class="py-3">
                            <label class="_sub-title" for="mealFrequency">Quantas refeições por dia?</label>
                            <div class="relative">
                                <Field name="mealFrequency" class="_input m-0" type="text" placeholder="Refeições por dia"
                                    :class="{ 'border-red-600': errors.mealFrequency }" />
                                <span class="text-gray-400 text-sm absolute top-3 right-3">refeições/dia</span>
                            </div>
                            <div class="text-sm text-red-600">{{ errors.mealFrequency }}</div>
                        </div>

                        <div class="flex items-center justify-between">
                            <button type="submit" class="_btn-bordered">
                                <p class="font-medium">Finalizar</p>
                            </button>
                        </div>
                    </div>
                    <!-- Step 2-end -->

                    <!-- Step 3 / Show thank you text if response status 200 -->
                    <div v-else-if="steps == 3" class="flex items-center justify-center flex-col">
                        <h3 class="text-gray-500 font-bold text-2xl">Loading</h3>
                        <p class="text-gray-400 text-md">Estamos processando sua dieta</p>
                        <!-- Step 3-end -->
                    </div>

                    <!-- Step 3 / Show thank you text if response status 200 -->
                    <div v-else-if="steps == 4" class="flex items-center justify-center flex-col">
                        <p>DIETA</p>
                    </div>
                </Transition>
            </Form>
        </div>
    </div>
</template>

<!-- This css changes default arrow of select and color of disabled option -->
<style scoped>
select {
    appearance: none;
}

.arrow {
    display: inline-block;
    position: absolute;
    padding: 2px;
    right: 15px;
    z-index: 10;
    top: 17px;
    border: solid #9ca3af;
    border-width: 0 1.5px 1.5px 0;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}

select:required:invalid {
    color: #9ca3af;
}
</style>
