<template>
    <div class="flex flex-col min-h-screen">
        <header class="shadow-sm bg-white">
            <nav class="container mx-auto p-4 flex justify-between">
                <NuxtLink to="/" class="font-bold">
                    <img src="/nutrogic-logo-orig.svg" alt="my-logo" class="w-48" />
                </NuxtLink>
                <ul class="flex items-center justify-center space-x-4 md:space-x-10 top-12 right-10">
                    <li class="hover:text-emerald-500">
                        <NuxtLink to="/">Home</NuxtLink>
                    </li>
                    <li class="hover:text-emerald-500">
                        <NuxtLink to="/sobre">Sobre</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/simulador" class="btn">Iniciar</NuxtLink>
                    </li>
                </ul>
            </nav>
        </header>
        <div class="flex-grow">
            <slot />
        </div>
        <footer class="h-16 mt-auto">
            <LayoutFooter />
        </footer>

    </div>
</template>