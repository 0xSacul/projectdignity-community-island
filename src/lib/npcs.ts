import { questModalManager } from "../Components/QuestModal";
import ExternalScene from "../Scene";

export type CustomNPC = {
  id: string;
  x: number;
  y: number;
  name?: string;
  isAnimated: boolean;
  spritesheet: string;
  sheet: {
    frames?: {
      start: number;
      end: number;
      rate: number;
    };
    width: number;
    height: number;
  };
  modal?: {
    type: string;
    messages: {
      text: string;
      actions?: {
        text: string;
        cb: () => void;
      }[];
    }[];
  };
  onClick?: () => void;
};

export const CustomNPCs: CustomNPC[] = [
  // ===================== QUEST NPCS =====================

  {
    id: "vp",
    x: 957,
    y: 73,
    name: "VP",
    isAnimated: true,
    spritesheet: "assets/npc/VP.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("VP");
    },
  },
  {
    id: "tiff",
    x: 530,
    y: 480,
    name: "Tiff",
    isAnimated: true,
    spritesheet: "assets/npc/Tiff.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("Tiff");
    },
  },
  {
    id: "shykun",
    x: 67,
    y: 90,
    name: "Shykun",
    isAnimated: true,
    spritesheet: "assets/npc/Shykun.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("Shykun");
    },
  },
  {
    id: "paluras",
    x: 1045,
    y: 626,
    name: "Paluras",
    isAnimated: true,
    spritesheet: "assets/npc/Paluras.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("Paluras");
    },
  },
  {
    id: "dee",
    x: 775,
    y: 361,
    name: "Dee",
    isAnimated: true,
    spritesheet: "assets/npc/Dee.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("Dee");
    },
  },
  {
    id: "ded",
    x: 62,
    y: 618,
    name: "Ded",
    isAnimated: true,
    spritesheet: "assets/npc/Ded.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("Ded");
    },
  },
  {
    id: "sacul",
    x: 350,
    y: 590,
    name: "Sacul",
    isAnimated: true,
    spritesheet: "assets/npc/Sacul.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("Sacul");
    },
  },

  // ===================== CUSTOM NPCS =====================

  {
    id: "granty",
    x: 790,
    y: 500,
    name: "GranTY",
    isAnimated: true,
    spritesheet: "assets/npc/Granty.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Howdy farmer, I'm Tiffanydys but you can call me Tiff, I'm the Co-Founder of Project Dignity. Feel free to check us out!",
          actions: [
            {
              text: "Visit Project Dignity",
              cb: () => {
                window.open("https://dignity-games.com/", "_blank");
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: "cloud",
    x: 850,
    y: 500,
    name: "Cloud",
    isAnimated: true,
    spritesheet: "assets/npc/Cloud.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Howdy farmer, I'm Tiffanydys but you can call me Tiff, I'm the Co-Founder of Project Dignity. Feel free to check us out!",
          actions: [
            {
              text: "Visit Project Dignity",
              cb: () => {
                window.open("https://dignity-games.com/", "_blank");
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: "boden",
    x: 540,
    y: 760,
    name: "Boden",
    isAnimated: true,
    spritesheet: "assets/npc/Boden.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Howdy unknown traveler, I'm Boden, welcome on our island!",
        },
        {
          text: "I'm just a simple villager, if you need help you should talk to Tiff!",
        },
        {
          text: "But since you seems friendly, I can show you around if you want! Our Island is pretty big and you can get lost easily!",
          actions: [
            {
              text: "Sure! Show me around!",
              cb: () => {
                new ExternalScene().DiscoverIsland();
              },
            },
            {
              text: "No thanks, I'll find my own way.",
              cb: () => {
                window.closeModal();
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: "aeon",
    x: 890,
    y: 500,
    name: "Aeon",
    isAnimated: true,
    spritesheet: "assets/npc/Aeon.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Howdy farmer, I'm Tiffanydys but you can call me Tiff, I'm the Co-Founder of Project Dignity. Feel free to check us out!",
          actions: [
            {
              text: "Visit Project Dignity",
              cb: () => {
                window.open("https://dignity-games.com/", "_blank");
              },
            },
          ],
        },
      ],
    },
  },
];
