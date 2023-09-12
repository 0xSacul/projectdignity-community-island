import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { CommunityAPI } from "./Scene";
import { eventManager } from "./EventsManager";

import { QuestModal } from "./Components/QuestModal";
import { CutScene } from "./Components/CutScene";
import { LostConnection } from "./Components/LostConnection";
import { Notifications, notificationManager } from "./Components/Notification";
import { Dialogue } from "./Components/Dialogue";
import { IsleIntroduction } from "./Components/IsleIntroduction";
import { Banned } from "./Components/Banned";
import { Loading } from "./Components/Loading";

type Props = {
  scene: any;
};

export const UI: React.FC<Props> = ({ scene }) => {
  const [playCutscene, setPlayCutscene] = useState<boolean>(false);
  const [lostConnection, setLostConnection] = useState<boolean>(false);
  const [dialogueMessage, setDialogueMessage] = useState<string>("");
  const [showIntroduction, setShowIntroduction] = useState<boolean>(false);
  const [isBanned, setIsBanned] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [preventClose, setPreventClose] = useState<boolean>(true);

  useEffect(() => {
    // Register listeners
    eventManager.on("playCutscene", playCutsceneListener);
    eventManager.on("lostConnection", lostConnectionListener);
    eventManager.on("backToSpawn", backToSpawnListener);
    eventManager.on("dialogue", dialogueListener);
    eventManager.on("banned", bannedListener);
    eventManager.on("loading", loadingListener);
    eventManager.on("preventClose", preventCloseListener);
    eventManager.on("unmountUI", unmountUIListener);
  }, []);

  const playCutsceneListener = (playCutscene: boolean) => {
    if (scene.currentPlayer.db_data.quests.season_1.final === "done") return;

    setPlayCutscene(playCutscene);

    if (playCutscene) {
      setTimeout(async () => {
        setPlayCutscene(false);

        try {
          await CommunityAPI.mint({
            metadata: JSON.stringify({
              quests: {
                final: {
                  done_at: Date.now(),
                },
              },
            }),
            wearables: {
              "Valoria Wreath": 1,
            },
          });

          notificationManager.notification({
            title: "Congratulations!",
            description: "You've achieved the final quest!",
            icon: "Success",
          });
          const floating_arrow = scene.children.getByName(
            "end_quest_cart_arrowObject"
          );
          floating_arrow.setVisible(true);
          floating_arrow.anims.play("end_quest_cart_arrow_anim", true);

          setDialogueMessage(
            "You.. YOU DID IT TRAVELER! You've united the tribes and completed the mechanism! I can't believe it, I've been waiting for this moment for so long. I can't thank you enough, but at least I can help you to get down of there, jump in the cart!"
          );

          scene.sendQuestUpdate("season_1", "final", "done");
        } catch (e) {
          console.error("Error while minting final quest", e);
          setLostConnection(true);
          return;
        }
      }, 10000);
    }
  };

  const lostConnectionListener = () => {
    setLostConnection(true);
  };

  const backToSpawnListener = () => {
    scene.sendPlayerToSpawn();
  };

  const dialogueListener = (message: string, closeAfter?: number) => {
    setDialogueMessage(message);

    if (closeAfter) {
      setTimeout(() => {
        setDialogueMessage("");
      }, closeAfter);
    }
  };

  const bannedListener = () => {
    setIsBanned(true);
  };

  const loadingListener = (loading: boolean) => {
    if (isLoading === loading) return;
    setIsLoading(loading);
  };

  const preventCloseListener = (preventClose: boolean) => {
    setPreventClose(preventClose);
  };

  const unmountUIListener = () => {
    scene.unMountUI();
  };

  return (
    <>
      <QuestModal scene={scene} />
      <Notifications scene={scene} />
      <Dialogue scene={scene} message={dialogueMessage} onClose={() => {}} />
      {playCutscene && <CutScene />}

      {/* Toggleable backdrop modal */}
      <Modal
        show={showIntroduction || isBanned || isLoading || lostConnection}
        centered
        backdrop={preventClose ? "static" : true}
      >
        {showIntroduction && (
          <IsleIntroduction
            onClose={() => {
              setShowIntroduction(false);
            }}
          />
        )}
      </Modal>

      {/* Static backdrop modal */}
      <Modal
        show={isBanned || isLoading || lostConnection}
        centered
        backdrop="static"
      >
        {lostConnection && <LostConnection />}
        {isLoading && <Loading />}
        {isBanned && <Banned />}
      </Modal>
    </>
  );
};
