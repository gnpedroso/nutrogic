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
        .required('Este campo é obrigatório').typeError("Este campo deve ser um número")
        .test('no-comma-or-period', 'Este campo não pode conter pontos', value => {
            if (typeof value !== 'number') {
                return false; // let Yup handle the type error message
            }
            const strValue = String(value);
            return !strValue.includes(',') && !strValue.includes('.');
        }),
    providerHeight: Yup.number()
        .required('Este campo é obrigatório')
        .typeError("Este campo deve ser um número")
        .test('no-comma-or-period', 'Este campo não pode conter pontos', value => {
            if (typeof value !== 'number') {
                return false; // let Yup handle the type error message
            }
            const strValue = String(value);
            return !strValue.includes(',') && !strValue.includes('.');
        }),
    providerActivityLevel: Yup.string()
        .required('Este campo é obrigatório'),
    weightObjective: Yup.string()
        .required('Este campo é obrigatório'),
    dietFrequency: Yup.number()
        .required('Este campo é obrigatório')
        .max(7, 'O valor máximo permitido é 7'),
    mealFrequency: Yup.number()
        .required('Este campo é obrigatório')
        .max(6, 'O valor máximo permitido é 6'),
});

const dietPlan = ref<string>('')


function setResponse(resp: string) {
    return dietPlan.value = resp;
}

const handleSubmit = async (values: Object) => {
    await useFetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: values
    })
        .then((res) => {
            debugger;
            const data: any = res.data.value;
            setResponse(data.message)
        })
}

</script>
<template>
    <div class="p-12">
        <div class="flex mx-auto items-center flex-col">
            <span class="md:text-xl text-lg text-gray-600">
                Preencha as suas informações pessoais e objetivos
            </span>
        </div>
        <div
            class="flex mx-auto items-center justify-start flex-col w-full h-full max-w-[800px] p-10 bg-gray-50 rounded-lg">
            <Form ref="myForm" class="relative w-full" @submit="handleSubmit" :validation-schema="schema"
                v-slot="{ errors }">
                <div class="flex flex-col">
                    <label class="_sub-title" for="weightObjective">Gênero:</label>

                    <div class="relative mb-4">
                        <i class="arrow"></i>
                        <Field as="select" class="_input m-0" name="providerGender" id="gender"
                            :class="{ 'border-red-600': errors.providerGender }">
                            <option disabled selected value="">Gênero</option>
                            <option value="homen">Homem</option>
                            <option value="mulher">Mulher</option>
                        </Field>
                        <div class="text-sm text-red-600">{{ errors.providerGender }}</div>
                    </div>
                    <div class="mb-4">
                        <label class="_sub-title" for="weightObjective">Idade:</label>
                        <Field name="providerAge" type="text" class="_input m-0"
                            :class="{ 'border-red-600': errors.providerAge }" placeholder="Idade" />
                        <div class="text-sm text-red-600">{{ errors.providerAge }}</div>
                    </div>

                    <div class="mb-4">
                        <label class="_sub-title" for="weightObjective">Peso:</label>
                        <div class="flex relative">
                            <Field name="providerWeight" class="_input m-0" type="text"
                                :class="{ 'border-red-600': errors.providerWeight }" placeholder="Peso (kg)" />
                            <span class="text-gray-400 text-sm absolute top-3 right-3">kg</span>
                        </div>
                        <div class="text-sm text-red-600">{{ errors.providerWeight }}</div>
                    </div>

                    <div class="mb-4">
                        <label class="_sub-title" for="weightObjective">Altura:</label>

                        <div class="flex relative">
                            <Field name="providerHeight" class="_input m-0" type="text"
                                :class="{ 'border-red-600': errors.providerHeight }" placeholder="Altura (cm)" />
                            <span class="text-gray-400 text-sm absolute top-3 right-3">cm</span>
                        </div>
                        <div class="text-sm text-red-600">{{ errors.providerHeight }}</div>
                    </div>

                    <div class="relative mb-4">
                        <label class="_sub-title" for="weightObjective">Nível de atividade física:</label>

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
                </div>
                <div class="flex flex-col">
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

            </Form>
        </div>
        <div>
            <div v-html="dietPlan"></div>
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
