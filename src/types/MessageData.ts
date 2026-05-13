export type MessageData = {
    id:string;
    type:"FULL"|"POPUP";
    author:{
        name:string;
        avatar:string;
    };
    content?:string;
    attachment?:string;
    retro?:{
        date:string;
        style:NinetyFiveLiveRetroStyles;
        queueMessageId:string;
    }
}

// -- retro era styles
export type NinetyFiveLiveRetroStyles =
"2018"|
"2019"|
"2021"