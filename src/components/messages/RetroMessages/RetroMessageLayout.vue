<template>
    <div :class="message.content && message.attachment ? 'message-layout-grid' : 'message-layout-single'">

        <!-- polaroid -->
        <div class="polaroid-container" v-if="message.attachment">
            <!-- polaroid main -->
            <div class="polaroid">
                <!-- logo -->
                <img class="logo" :src="logoAsset" v-if="message.content">
                <!-- author if no content -->
                <div class="message-author" v-if="!message.content">
                    <img :src="message.author.avatar">
                    <span>{{ message.author.name }}</span>
                </div>

                <!-- attachment -->
                <div class="attachment">
                    <img :src="message.attachment">
                </div>

                <!-- date -->
                <div class="date">
                    <img :src="dateAsset">
                </div>
            </div>
        </div>

        <!-- message contents container -->
        <div class="contents-container" v-if="message.content" :style="`font-family:${font};`">
            <!-- message content -->
            <p class="message-content-text">{{ formattedContent }}</p>
            <div class="message-author">
                <img :src="message.author.avatar">
                <span>{{ message.author.name }}</span>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" setup>
    import type { MessageData } from '@/types/MessageData';
    import FormatMessageContent from '@/utils/FormatMessageContent';
    import { onMounted } from 'vue';
    
    // -- gsap
    import gsap from "gsap";
    import { SplitText } from "gsap/SplitText";
    gsap.registerPlugin(SplitText);

    // -- import message data
    const props = defineProps<{
        message:MessageData
    }>();

    // -- format message content with emotes
    const formattedContent = FormatMessageContent(props.message.content, 36, 290);
    
    onMounted(() => {
        // -- create split text from text contents and animate in
        const splitContent = SplitText.create(".message-content-text", {type:"lines"});
        gsap.from(splitContent.lines, {
            duration:0.5,
            delay:1,
            x:-20,
            autoAlpha:0,
            stagger:0.1,
            animationTimingFunction:"cubic-bezier(0.680, -0.550, 0.265, 1.550)"
        });
    })

    // -- determine logo to use for polaroid
    let logoAsset:string;
    switch(props.message.retro?.style) {
        case "2018":
            logoAsset = "/img/retro/icons/v2-logo.webp";
            break;
        case "2019":
            logoAsset = "/img/retro/icons/v3-logo.webp";
            break;
        case "2021":
            logoAsset = "/img/retro/icons/v4-logo.webp";
            break;
    }

    // -- determine date to use for polaroid
    let dateAsset:string;
    switch(props.message.retro?.date) {
        case "13 July 2018":
            dateAsset = "/img/retro/dates/date-2018.svg";
            break;
        case "13 July 2019":
            dateAsset = "/img/retro/dates/date-2019.svg";
            break;
        case "11 July 2020":
            dateAsset = "/img/retro/dates/date-2020.svg";
            break;
        case "11 July 2021":
            dateAsset = "/img/retro/dates/date-2021.svg";
            break;
        case "09 July 2022":
            dateAsset = "/img/retro/dates/date-2022.svg";
            break;
        case "08 July 2023":
            dateAsset = "/img/retro/dates/date-2023.svg";
            break;
        default:
            dateAsset = "/img/retro/dates/date-2018.svg";
    }

    // -- determine font to use
    let font:string;
    switch(props.message.retro?.style) {
        case "2018":
            font = "UniNeue";
            break;
        case "2019":
            font = "Roboto";
            break;
        default:
            font = "Satoshi";
    }
</script>

<style scoped>
    @reference "#main.css";

    /* message display layout */
    .message-layout-grid {
        /* positioning */
        @apply absolute inset-0;
        /* grid */
        @apply grid grid-cols-[2fr_3fr] gap-10;
        /* padding */
        @apply p-20 pt-40;
    }
    .message-layout-single {
        /* positioning */
        @apply absolute inset-0;
        /* flex */
        @apply flex items-center justify-center;
        /* padding */
        @apply p-20 pt-40;
    }

    /* polaroid container */
    .polaroid-container {
        /* centering */
        @apply flex items-center justify-center;
    }
    .polaroid {
        /* background */
        background-position:center;
        background-size:350%;
        background-image:url(/img/retro/polaroid-pattern.svg);

        /* border */
        @apply rounded-xl;

        /* shading */
        box-shadow:
            /* inner */
            inset 0px 0px 12px 3px #00000040,
            /* outer */
            0px 0px 20px #00000040;

        /* flex */
        @apply flex flex-col gap-5 items-center;
        /* padding */
        @apply p-5;
        /* rotation */
        @apply -rotate-3;

        /* animation */
        transform:scale(1.1) translateX(-50px);
        opacity:0;
        animation:polaroid-anim 1s 0.3s cubic-bezier(0.680, -0.550, 0.265, 1.550) forwards;
    }
    @keyframes polaroid-anim {
        to {
            transform:scale(1) translateX(0px);
            opacity:1;
        }
    }
    .polaroid .logo {
        @apply w-14 rounded-xl shadow-xl;
    }
    .polaroid .attachment {
        /* positioning */
        @apply relative;
        /* overflow */
        @apply overflow-hidden;
        /* rounded border */
        @apply rounded-xl;
        /* shading */
        box-shadow:0px 0px 2px 2px #000000;
    }
    .polaroid img {
        /* sizing */
        @apply max-h-[600px] max-w-[500px];
    }
    .polaroid .attachment::after {
        content:"";
        /* positioning */
        @apply absolute inset-0;
        /* shading */
        box-shadow:
            /* inner */
            inset 0px 0px 12px 3px #00000080;
    }
    .polaroid .message-author {
        /* flex */
        @apply flex items-center gap-3 drop-shadow-[0px_2px_4px_#00000040];
    }
    .polaroid .message-author img {
        @apply w-14 rounded-full;
    }
    .polaroid .message-author span {
        @apply text-2xl font-medium;
    }

    /* message contents container */
    .contents-container {
        /* flex */
        @apply flex flex-col justify-center gap-14;

        /* text styling */
        @apply text-white drop-shadow-[0px_2px_4px_#00000050];
    }
    /* body text styling */
    .contents-container p {
        /* text styling */
        @apply text-5xl font-black;
        /* sizing */
        @apply max-w-4xl;
    }
    /* author styling */
    .contents-container .message-author {
        /* flex */
        @apply flex items-center gap-5;
        /* animation */
        transform:translateY(-30px);
        opacity:0;
        animation:contents-author-anim 1s 1.5s forwards cubic-bezier(0.680, -0.550, 0.265, 1.550);
    }
    @keyframes contents-author-anim {
        to {
            transform:translateY(0px);
            opacity:1;
        }
    }
    .contents-container .message-author span {
        @apply text-4xl;
    }
    .contents-container .message-author img {
        @apply w-18 rounded-full;
    }
</style>