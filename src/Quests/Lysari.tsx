import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../Components/SpeakingModal";
import { CommunityAPI } from "../Scene";

interface Props {
  onClose: () => void;
  scene: any;
}
export const QuestLysari: React.FC<Props> = ({ onClose, scene }) => {
  const [step, setStep] = useState<number>(0);
  const [canBurn, setCanBurn] = useState<boolean>(false);

  const playerInventory = CommunityAPI.game.inventory;

  useEffect(() => {
    const player_quests = scene.currentPlayer.db_data.quests || {};

    if (player_quests.lysari === "waiting") setStep(2);
    if (player_quests.lysari === "done") setStep(3.1);

    const wood = Number(playerInventory["Wood"] || 0);
    const iron = Number(playerInventory["Iron"] || 0);

    if (wood >= 50 && iron >= 3) {
      setCanBurn(true);
    }
  }, []);

  return (
    <>
      {step === 0 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Greetings, envoy. Lysari ships are in dire need of repair. Could you collect 50 pieces of wood and 20 pieces of iron for us? In return, we'll give you a Nautical Gear component for the Arcadian Mechanism.",
              actions: [
                {
                  text: "Sure, I'll get right on it.",
                  cb: () => {
                    setStep(1);
                    scene.sendQuestUpdate("lysari", "waiting");
                  },
                },
                {
                  text: "Maybe later.",
                  cb: () => onClose(),
                },
              ],
            },
          ]}
        />
      )}
      {step === 1 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Great! Return when you have my wood and iron.",
            },
          ]}
        />
      )}
      {step === 2 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Ah, you're back! Do you have the wood and iron?",
              requirements: [
                {
                  label: "Wood",
                  value: 50,
                  has: Number(playerInventory["Wood"] || 0) >= 50,
                },
                {
                  label: "Iron",
                  value: 3,
                  has: Number(playerInventory["Iron"] || 0) >= 3,
                },
              ],
              actions: [
                {
                  text: "Yes, here you go.",
                  cb: () => console.log("TODO"),
                  disabled: !canBurn,
                },
                {
                  text: "I'm still working on it.",
                  cb: () => onClose(),
                },
              ],
            },
          ]}
        />
      )}
      {step === 3 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Thank you for the wood and iron. Here is your Nautical Gear.",
            },
          ]}
        />
      )}
      {step === 3.1 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Thank you again for the wood and iron. Hope you enjoy your Nautical Gear!",
            },
          ]}
        />
      )}
    </>
  );
};
