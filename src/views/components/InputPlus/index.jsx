import React, { useState, useCallback } from "react";

import styles from "./index.module.scss";

export const InputPlus = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");

  const onAddMemoized = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);

  console.log("render");
  return (
    <div className={styles.inputPlus}>
      <input
        type="text"
        value={inputValue}
        className={styles.inputPlusValue}
        placeholder="Type here..."
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onAddMemoized();
          }
        }}
      />
      <button
        onClick={() => {
          onAddMemoized();
        }}
        aria-label="Add"
        className={styles.inputPlusButton}
      />
    </div>
  );
};
