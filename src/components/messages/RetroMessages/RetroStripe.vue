<template>
    <RetroMessageIntro :year="year"/>
</template>

<script lang="ts" setup>
    import type { MessageData } from '@/types/MessageData';
    import FormatMessageContent from '@/utils/FormatMessageContent';

    import RetroMessageIntro from './RetroMessageIntro.vue';

    const props = defineProps<{
        message:MessageData
    }>();

    // -- format message content with emotes
    const formattedContent = FormatMessageContent(props.message.content, 36, 350);

    // -- get year only from date provided
    const year = props.message.retro?.date.split(" ")[2] as string;
</script>