<template>
    <!-- message styles -->
    <!-- 2019 -->
    <Transition name="fade-out">
        <div class="absolute inset-0" v-if="messageDisplayStore.retro">
            <RetroStripe :message="messageDisplayStore.retro" v-if="messageDisplayStore.retro"/>
        </div>
    </Transition>
    
    <!-- debug component -->
    <!-- 2019 -->
    <!-- <RetroStripe :message="debugMessage"/> -->
</template>

<script lang="ts" setup>
    import { useMessageDisplayStore } from '@/stores/MessageDisplayStore';
    import DebugMessages from "@/data/DebugMessages.json";
    import type { MessageData } from '@/types/MessageData';
    
    // -- styles
    // retro stripe (2019)
    import RetroStripe from '../messages/RetroMessages/RetroStripe.vue';

    // -- import message display store
    const messageDisplayStore = useMessageDisplayStore();
    // -- import debug message data
    const debugMessage = DebugMessages[10] as MessageData;
</script>

<style scoped>
    .fade-out-leave-to {
        opacity:0;
        transition-duration:.4s;
    }
</style>