import React, { useState } from "react";

import styles from "./index.module.scss";

export const InputTask = ({ id, title, onDone, onRemove, onEdited }) => {
  const [checked, setChecked] = useState(false);
  const [isEdit, setEditMode] = useState(false);
  const [value, setValue] = useState(title);

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={(event) => {
            setChecked(event.target.checked);
            setTimeout(() => {
              onDone(id);
            }, 300);
          }}
        />
        {isEdit ? (
          <input
            value={value}
            className={styles.inputTaskTitleEdit}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>

      {isEdit ? (
        <button
          onClick={() => {
            setEditMode(false);
            onEdited(id, value);
          }}
          aria-label="Save"
          className={styles.inputTaskSave}
        />
      ) : (
        <button
          onClick={() => {
            setEditMode(!isEdit);
          }}
          aria-label="Edit"
          className={styles.inputTaskEdit}
        />
      )}

      <button
        onClick={() => {
          if (confirm("Are you sure?")) {
            onRemove(id);
          }
        }}
        aria-label="Remove"
        className={styles.inputTaskRemove}
      />
    </div>
  );
};

/* For Edit mode
<input
    className={styles.inputTaskTitleEdit}
/>

<button
    aria-label="Save"
    className={styles.inputTaskSave}
/>
*/
