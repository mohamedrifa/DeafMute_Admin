// src/components/GamesPage.js
import React from "react";
import Game from "./Game";

export default function GamesPage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Games</h1>
      <Game />
    </div>
  );
}