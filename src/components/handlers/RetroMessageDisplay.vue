<template>
    <!-- debug component -->
    
</template>

<script lang="ts" setup>
    import { useMessageDisplayStore } from '@/stores/MessageDisplayStore';
    import DebugMessages from "@/data/DebugMessages.json";

    // -- import message display store
    const messageDisplayStore = useMessageDisplayStore();
    // -- import debug message data
    const debugMessage = DebugMessages[10];
</script>