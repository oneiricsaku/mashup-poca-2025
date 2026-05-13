<template>
    <div class="fixed top-5 left-5 right-1/2 font-mono text-white drop-shadow-[1px_1px_0px_#000000]">
        <p><b>socket:</b> {{ messageDisplayStore.socketActive ? 'connected' : 'disconnected' }}</p>
        <p><b>full:</b> {{ messageDisplayStore.full || "unset" }}</p>
        <p><b>popup:</b> {{ messageDisplayStore.popup || "unset" }}</p>
        <p><b>retro:</b> {{ messageDisplayStore.retro || "unset"}}</p>
    </div>
</template>

<script lang="ts" setup>
    import { useMessageDisplayStore } from '@/stores/MessageDisplayStore';
    const messageDisplayStore = useMessageDisplayStore();
</script>