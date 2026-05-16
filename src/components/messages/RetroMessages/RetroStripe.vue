<template>
    <!-- background -->
    <!-- <BgBirthday v-if="showMessage && message.retro?.style === '2018'"/> -->
    <div class="absolute inset-0 bg-neutral-800" v-if="showMessage">
        <video :src="videoAsset" autoplay muted loop playsinline class="w-full h-full object-cover"></video>
    </div>

    <!-- logos -->
    <div class="logo" v-if="showMessage">
        <img :src="logoAsset">
    </div>

    <!-- message contents -->
    <RetroMessageLayout :message="message" v-if="showMessage"/>

    <!-- intro transition -->
    <RetroMessageIntro :year="year"/>
</template>

<script lang="ts" setup>
    import type { MessageData } from '@/types/MessageData';
    import RetroMessageIntro from './RetroMessageIntro.vue';
    import RetroMessageLayout from './RetroMessageLayout.vue';
    import type { Ref } from 'vue';
    import { ref } from 'vue';
    import BgBirthday from './background/BgBirthday.vue';

    const props = defineProps<{
        message:MessageData
    }>();

    // -- get year only from date provided
    const year = props.message.retro?.date.split(" ")[2] as string;

    // -- state manage
    let showMessage:Ref<boolean> = ref(false);
    setTimeout(() => {
        showMessage.value = true;
    }, 2500);

    // -- determine logo to use based on style
    let logoAsset:string;
    switch(props.message.retro?.style) {
        case "2018":
            logoAsset = "/img/retro/logo/mashup_2018_logo.svg";
            break;
        case "2019":
            logoAsset = "/img/retro/logo/mashup_2019_logo.webp";
            break;
        case "2021":
            logoAsset = "/img/retro/logo/mashup_2021_logo.webp";
            break;
    }

    // -- determine background video asset
    let videoAsset:string;
    switch(props.message.retro?.style) {
        case "2018":
            videoAsset = "/img/retro/bg/2018-bg.webm";
            break;
        case "2019":
            videoAsset = "/img/retro/bg/2019-bg.webm";
            break;
        case "2021":
            videoAsset = "/img/retro/bg/2021-bg.webm";
            break;
    }
</script>

<style scoped>
    @reference "#main.css";
    .logo {
        @apply absolute top-24 right-24;
    }
    .logo img {
        @apply w-[500px] rotate-4;
    }
</style>