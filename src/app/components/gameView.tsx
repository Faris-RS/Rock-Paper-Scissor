"use client";

import { useGameContext } from "../context/gameContext";
import QuestionImage from "./questionImage";
import GameViewImage from "./gameViewImage";

function GameView() {
  const { state } = useGameContext();

  return (
    <div className="w-full flex justify-between items-center mt-8 lg:mt-2">
      {state.isClick ? (
        <>
          <QuestionImage />
          <QuestionImage />
        </>
      ) : (
        <>
          <GameViewImage image={state.userImage} />
          <GameViewImage image={state.pcImage} />
        </>
      )}
    </div>
  );
}

export default GameView;
