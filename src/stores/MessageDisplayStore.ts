import { defineStore } from "pinia";
import type { MessageData } from "@/types/MessageData";

// -- debug data
import DebugMessages from "../data/DebugMessages.json";

export const useMessageDisplayStore = defineStore("messageDisplay", {
    state:() => ({
        // popup message data
        popup:null as null | MessageData,
        // full screen message data
        full:null as null | MessageData,
        // retro message data
        retro:null as null | MessageData,
        // socket connection state
        socketActive:false as boolean
    }),
    actions:{
        setPopup(message:MessageData) {
            if (this.popup) return;
            this.popup = message;
            setTimeout(() => {
                this.popup = null;
            }, 8000);
        },
        setFull(message:MessageData) {
            if (this.full || this.retro) return;
            this.full = message;
            setTimeout(() => {
                this.full = null;
            }, 8000);
        },
        setRetro(message:MessageData) {
            if (this.retro || this.full) return;
            this.retro = message;
            setTimeout(() => {
                this.retro = null;
            }, 10000);
        },

        // When in debug mode, socket is disabled and random faked events will be sent
        // -- debug mode interval fake events
        setDebugMode() {
            // POPUPS
            // -- every 15 seconds, display random popup message
            setInterval(() => {
                const message = DebugMessages[Math.floor(Math.random()*DebugMessages.length)] as MessageData;
                this.setPopup(message);
            }, 15000);
        },
        // -- on keyboard event, set a random full screen message
        setDebugFullMessage() {
            // -- if there's already a full screen message, don't set new one
            if (this.full) return;

            // -- get random message from debug messages
            const message = DebugMessages[Math.floor(Math.random()*DebugMessages.length)];
            // -- set as full screen message
            this.setFull(message as MessageData);
        },

        // -- set socket connection
        setSocketActive() {
            this.socketActive = true;
        },
        setSocketInactive() {
            this.socketActive = false;
        }
    }
})