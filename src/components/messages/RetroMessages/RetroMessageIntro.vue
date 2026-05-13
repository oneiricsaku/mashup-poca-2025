<template>
    <div class="absolute inset-0 fade-out-anim">
        <!-- white gradient background -->
        <div class="white-gradient-background"></div>
        <!-- white glow anim -->
        <div class="absolute inset-0 flex items-center justify-center">
            <div class="white-glow"></div>
        </div>

        <!-- icon anims -->
        <!-- v4 logo -->
        <div class="icon-anim-container" style="animation-delay:100ms">
            <div class="absolute top-20 left-40 icon-anim">
                <img src="/img/retro/icons/v4-logo.webp">
            </div>
        </div>

        <!-- guardian -->
        <div class="icon-anim-container" style="animation-delay:200ms">
            <div class="absolute top-30 right-30 icon-anim">
                <img src="/img/retro/icons/guardian-v4.webp">
            </div>
        </div>

        <!-- v3 logo -->
        <div class="icon-anim-container" style="animation-delay:300ms">
            <div class="absolute bottom-40 left-32 icon-anim">
                <img src="/img/retro/icons/v3-logo.webp">
            </div>
        </div>

        <!-- guardian v2 -->
        <div class="icon-anim-container" style="animation-delay:400ms">
            <div class="absolute bottom-40 right-32 icon-anim">
                <img src="/img/retro/icons/guardian_v2.webp">
            </div>
        </div>

        <!-- v2 logo -->
        <div class="icon-anim-container" style="animation-delay:500ms">
            <div class="absolute top-50 right-32 icon-anim">
                <img src="/img/retro/icons/v2-logo.webp">
            </div>
        </div>

        <!-- podcast -->
        <div class="icon-anim-container" style="animation-delay:600ms">
            <div class="absolute top-50 left-24 icon-anim">
                <img src="/img/retro/icons/podcast.webp">
            </div>
        </div>

        <!-- v1 logo -->
        <div class="icon-anim-container" style="animation-delay:700ms">
            <div class="absolute bottom-40 right-24 icon-anim">
                <img src="/img/retro/icons/v1-logo.webp">
            </div>
        </div>

        <!-- spinning rewind symbol -->
        <div class="spin-rewind">
            <img src="/img/retro/retro-rewind.svg">
        </div>

        <!-- year reveal -->
        <div class="year-reveal">
            <span style="animation-delay:800ms;">{{ yearChr[0] }}</span>
            <span style="animation-delay:900ms;">{{ yearChr[1] }}</span>
            <span style="animation-delay:1000ms;">{{ yearChr[2] }}</span>
            <span style="animation-delay:1100ms;">{{ yearChr[3] }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        year:string;
    }>();

    // split year characters
    const yearChr = props.year.split("");
</script>

<style scoped>
    @reference "#main.css";

    /* white glow anim */
    .white-glow {
        /* sizing */
        @apply aspect-square w-[1000px];

        /* radial */
        @apply bg-radial from-white via-white via-10% to-transparent to-70%;

        /* grow animation defaults */
        transform:scale(0);
        /* opacity:0; */
        animation:white-glow 1s ease-in-out forwards;
    }
    @keyframes white-glow {
        50% {
            transform:scale(12);
            opacity:1;
        }
        60% {
            opacity:1;
        }
        100% {
            opacity:0;
        }
    }

    /* white gradient background */
    .white-gradient-background {
        /* sizing */
        @apply absolute inset-0;
        /* gradient */
        @apply bg-radial from-neutral-300 to-neutral-50;

        /* animation defaults */
        opacity:0;
        animation:white-gradient-background 0s 0.5s forwards;
    }
    @keyframes white-gradient-background {
        to {
            opacity:1;
        }
    }

    /* spin rewind anim */
    .spin-rewind {
        /* positioning */
        @apply absolute inset-0;
        @apply flex items-center justify-center;

        /* animation */
        opacity:0;
        transform:scale(0);
        animation:spin-rewind 1s 0.3s forwards;
    }
    @keyframes spin-rewind {
        50% {
            opacity:1;
            transform:scale(1.5);
        }
        70% {
            opacity:1;
            transform:scale(1.4);
        }
        100% {
            opacity:0;
            transform:scale(2.5);
        }
    }
    /* spin rewind symbol */
    .spin-rewind img {
        /* sizing */
        @apply w-96 h-96;

        /* animation */
        animation:spin-rewind-symbol 0.8s linear infinite;
    }
    @keyframes spin-rewind-symbol {
        to {
            transform:rotate(-360deg);
        }
    }

    /* year reveal */
    .year-reveal {
        /* positioning */
        @apply absolute inset-0;
        /* flex */
        @apply flex items-center justify-center gap-10;
        /* shadowing */
        @apply drop-shadow-[0px_10px_20px_#00000050];
    }
    .year-reveal span {
        /* text styling */
        @apply text-[35rem] font-black text-[#202020];

        /* animation */
        opacity:0;
        transform:scale(0.7);
        animation:year-reveal-chr 0.8s forwards cubic-bezier(0.680, -0.550, 0.265, 1.550);
    }
    @keyframes year-reveal-chr {
        to {
            opacity:1;
            transform:scale(1);
        }
    }

    /* icon anims */
    .icon-anim-container {
        /* positioning */
        @apply absolute inset-0;

        /* animations */
        opacity:0;
        transform:scale(0.3);
        animation:icon-anim-container 0.7s linear forwards;
    }
    @keyframes icon-anim-container {
        50% {
            opacity:1;
        }
        100% {
            opacity:0;
            transform:scale(1);
        }
    }

    .icon-anim img {
        /* image styling */
        @apply rounded-3xl shadow-xl w-40;
    }

    /* final fade out */
    .fade-out-anim {
        /* animation */
        animation:fade-out-anim 1s 2.5s cubic-bezier(0.680, -0.550, 0.265, 1.550) forwards;
    }
    @keyframes fade-out-anim {
        to {
            opacity:0;
        }
    }
</style>