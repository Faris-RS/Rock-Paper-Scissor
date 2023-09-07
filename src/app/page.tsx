"use client";

import { useEffect } from "react";
import { useGameContext } from "./context/gameContext";
import { randomPcMove } from "./utils/randomPcMove";
import Scores from "./components/scores";
import Round from "./components/round";
import GameView from "./components/gameView";
import Controller from "./components/controller";
import ToggleButton from "./components/toggleButton";
import ResetButton from "./components/resetButton";

export default function Home() {
  const { state, dispatch } = useGameContext();

  // handle pc Move after user clicked on controller button
  const pcMoveHandler = () => {
    const { title, image } = randomPcMove();
    // set in state
    dispatch({ type: "SET_PC_IMAGE", payload: image });
    dispatch({ type: "SET_PC_SYMBOL", payload: title });
    dispatch({ type: "INCREMENT_ROUND" });
  };

  // point the winner after each round
  const determineWinner = (user: string, pc: string) => {
    // check equal user and pc
    if (user === pc) {
      return dispatch({ type: "INCREMENT_GAME_TIES" });
    }

    // condition for win the user
    // and else pc is winner
    if (
      (user === "rock" && pc === "scissor") ||
      (user === "paper" && pc === "rock") ||
      (user === "scissor" && pc === "paper")
    ) {
      return dispatch({ type: "INCREMENT_USER_SCORE" });
    }

    return dispatch({ type: "INCREMENT_PC_SCORE" });
  };

  // every change user and pc selection call determineWinner function
  useEffect(() => {
    const { userSelect, pcSelect } = state;
    if (userSelect && pcSelect) {
      determineWinner(userSelect, pcSelect);
    }
  }, [state.roundCounter]);

  return (
    <>
      <div className="w-full min-h-screen bg-primary flex flex-col select-none relative">
        <Scores />
        <Round round={state.roundCounter} />
        <GameView />
        <Controller pcMove={pcMoveHandler} />
        <ToggleButton />
        <ResetButton />
      </div>
    </>
  );
}
