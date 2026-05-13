<template>
    <!-- message styles -->
    <!-- 2019 -->
    <RetroStripe :message="messageDisplayStore.retro" v-if="messageDisplayStore.retro && messageDisplayStore.retro.retro?.style === '2019'"/>
    
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