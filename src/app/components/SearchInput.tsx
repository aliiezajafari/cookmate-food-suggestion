"use client";

import { useState } from "react";

const [suggestions, setSuggestions] = useState<string[]>([]);
const allIngredients = [
  "Egg",
  "Egg yolk",
  "Egg white",
  "Tomato",
  "Potato",
  "Onion",
  "Garlic",
  "Flour",
  "Butter",
  "Milk",
  "Cheese",
  "Chicken",
  "Rice",
  "Oil",
  "Salt",
  "Sugar"
];

export default function SearchInput({ onAdd }: { onAdd: (item: string) => void }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      const filtered = allIngredients.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // فقط ۵ تا پیشنهاد
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item: string) => {
    onAdd(item);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search for ingredients..."
        className="border p-2 rounded w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-40 overflow-auto shadow">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
