import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, push, onValue, remove, update } from "firebase/database";

export default function Game() {
  const [englishWord, setEnglishWord] = useState("");
  const [tamilWord, setTamilWord] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [games, setGames] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleAddOrUpdateGame = async () => {
    if (!englishWord || !tamilWord || !imageURL) return;

    const gameData = {
      en: englishWord,
      ta: tamilWord,
      img: imageURL,
    };

    try {
      if (editingId) {
        await update(ref(database, `Games/assets/${editingId}`), gameData);
        alert("Game asset updated!");
        setEditingId(null);
      } else {
        await push(ref(database, "Games/assets"), gameData);
        alert("Game asset added!");
      }

      setEnglishWord("");
      setTamilWord("");
      setImageURL("");
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Error occurred. See console.");
    }
  };

  // const handleEdit = (id, game) => {
  //   setEditingId(id);
  //   setEnglishWord(game.en);
  //   setTamilWord(game.ta);
  //   setImageURL(game.img);
  // };

  const handleDelete = async (id) => {
    try {
      await remove(ref(database, `Games/assets/${id}`));
      alert("Deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete.");
    }
  };

  useEffect(() => {
    const gameRef = ref(database, "Games/assets");
    const unsubscribe = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      const gameList = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }))
        : [];
      setGames(gameList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Game Creation</h2>

      <div className="bg-gray-800 p-4 rounded-lg shadow mb-6 space-y-4">
        <input
          type="text"
          placeholder="Enter English Word"
          value={englishWord}
          onChange={(e) => setEnglishWord(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Enter Tamil Word"
          value={tamilWord}
          onChange={(e) => setTamilWord(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Enter Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleAddOrUpdateGame}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white p-2 rounded"
        >
          {editingId ? "Update Game" : "Add to Firebase"}
        </button>
      </div>

      <h3 className="text-xl font-semibold text-white mb-4">Game Assets</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-gray-800 rounded-lg p-4 shadow-lg text-white relative"
          >
            <div className="h-40 overflow-hidden rounded mb-3">
              <img
                src={game.img}
                alt={game.en}
                className="w-full h-60 object-fit rounded mb-3"
              />
            </div>
            <h4 className="text-lg font-bold">English: {game.en}</h4>
            <p className="text-md mb-2">Tamil: {game.ta}</p>
            <div className="flex justify-between">
              {/* <button
                onClick={() => handleEdit(game.id, game)}
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                Edit
              </button> */}
              <button
                onClick={() => handleDelete(game.id)}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
