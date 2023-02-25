<script></script>
<template>
    <footer class="bg-neutral-900 text-white">
        <div class="container mx-auto pt-12 px-5 pb-10">
            <div class="flex flex-col justify-between space-y-12 md:flex-row md:space-y-0">
                <!-- Phone -->
                <div class="space-y-6">
                    <div class="flex items-center space-x-3">
                        <div class="w-6">
                            <img src="/images/icon-email.svg" alt="" class="scale-10" />
                        </div>
                        <div>email@nutrogic.com.br</div>
                    </div>
                </div>

                <!-- Menus -->
                <div class="flex flex-col space-y-10 text-xl md:text-base md:space-x-20 md:space-y-0 md:flex-row">
                    <div class="flex flex-col space-y-3">
                        <NuxtLink to="sobre">Sobre</NuxtLink>
                        <NuxtLink to="blog">Blog</NuxtLink>
                    </div>
                    <div class="flex flex-col space-y-3">
                        <NuxtLink to="contato">Sobre</NuxtLink>
                        <NuxtLink to="termos">Termos de uso</NuxtLink>
                        <NuxtLink to="faq">FAQ</NuxtLink>
                    </div>
                </div>

                <!-- Social -->
                <div class="flex justify-center pb-10 space-x-3">
                    <div>
                        <a href="#">
                            <img src="/images/facebook.svg" alt="" class="p-2 bg-mainColor rounded-full ficon" />
                        </a>
                    </div>
                    <div>
                        <a href="#">
                            <img src="/images/twitter.svg" alt="" class="p-2 bg-mainColor rounded-full ficon" />
                        </a>
                    </div>
                    <div>
                        <a href="#">
                            <img src="/images/instagram.svg" alt="" class="p-2 bg-mainColor rounded-full ficon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<style>

</style>