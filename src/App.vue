<template>
    <!-- create main 1080p canvas -->
    <main class="fixed top-0 left-0 w-[1920px] h-[1080px] outline-2 outline-red-500 bg-cover overflow-hidden">

        <!-- debug: fixed background -->
        <div class="absolute inset-0 pointer-events-none bg-gradient-to-br from-purple-950 to-blue-900"></div>
        
        <!-- Popup Displays: Messages + Avatars. Wrapped in fade transition. These disappear if a full screen message is being displayed  -->
        <div class="absolute inset-0 duration-300" :class="messageDisplay.full ? 'opacity-0' : 'delay-1000'" v-if="showPopups">
            <!-- Popup Messages -->
            <PopupMessageDisplay v-if="showPopups"/>
        </div>

        <!-- Full Screen Messages -->
        <FullMessageDisplay v-if="showFull"/>

        <!-- debug overlay -->
        <DebugDisplay v-if="debugOverlay"/>
    </main>

    <!-- debug overlay -->
    <DebugDisplay v-if="debugOverlay"/>
</template>

<script lang="ts" setup>
    import type { Ref } from 'vue';
    import FullMessageDisplay from './components/handlers/FullMessageDisplay.vue';
    import PopupMessageDisplay from './components/handlers/PopupMessageDisplay.vue';
    import { ref } from 'vue';
    import { useMessageDisplayStore } from './stores/MessageDisplayStore';
    import DebugDisplay from './components/handlers/DebugDisplay.vue';
    import { io } from 'socket.io-client';
    import type { MessageData } from './types/MessageData';

    // import message display store
    const messageDisplay = useMessageDisplayStore();
    
    // -- get URL parameters
    const params = new URLSearchParams(window.location.search);

    // -- determine which views to display
    const showPopups:Ref<boolean> = ref(params.has("show_popup"));
    const showFull:Ref<boolean> = ref(params.has("show_full"));
    const showRetro:Ref<boolean> = ref(params.has("show_retro"));

    // -- check if fake msg mode parameter exists, doesn't matter what its set to
    if (params.get("fakemsg")) {
        // -- enable listening for keyboard events
        window.onkeydown = (e) => {
            switch(e.key) {
                // -- send a full screen event
                case "m":
                    messageDisplay.setDebugFullMessage();
                    break;
                // -- enable random popups
                case "p":
                    messageDisplay.setDebugMode();
                    break;
            } 
        }
    } 
    // -- if fake msg is disabled, make connection to socket server
    else {
        // -- create socket connection
        const socket = io(import.meta.env.VITE_APP_GUARDIAN_SOCKET_URL);
        socket.on("connect", () => {
            messageDisplay.setSocketActive();
        })
        socket.on("disconnect", () => {
            messageDisplay.setSocketInactive();
        })

        // -- listen for message events
        // FULL
        socket.on("MESSAGE_FULL", (message:MessageData) => {
            message.retro ? messageDisplay.setRetro(message) : messageDisplay.setFull(message);
            console.log(`FULL Message Displayed: ${message}`);
        });
        // POPUP
        socket.on("MESSAGE_POPUP", (message) => {
            messageDisplay.setPopup(message);
            console.log(`POPUP Message Displayed: ${message}`);
        });
    }

    // -- check for debug mode overlay param
    const debugOverlay:Ref<boolean> = ref(false);
    if (params.get("debug")) {
        debugOverlay.value = true;
    }
</script>

<style>
    .display-fade-enter-from, .display-fade-leave-to {
        opacity:0;
        transition: opacity .2s ease;
    }
</style>