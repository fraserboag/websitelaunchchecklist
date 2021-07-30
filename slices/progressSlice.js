import { createSlice } from "@reduxjs/toolkit";
import * as gtag from "../utils/gtag";

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    settingsOpen: false,
    hideLinks: false,
    hideCompleted: false,
    endModalOpen: false,
    checklist: [],
  },
  reducers: {
    openSettings: (state) => {
      state.settingsOpen = true;
      gtag.event({ action: "Open Settings", category: "App Interaction" });
    },
    closeSettings: (state) => {
      state.settingsOpen = false;
      gtag.event({ action: "Close Settings", category: "App Interaction" });
    },
    doHideLinks: (state) => {
      state.hideLinks = true;
      gtag.event({ action: "Hide Related Links", category: "App Interaction" });
    },
    dontHideLinks: (state) => {
      state.hideLinks = false;
      gtag.event({ action: "Show Related Links", category: "App Interaction" });
    },
    doHideCompleted: (state) => {
      state.hideCompleted = true;
      gtag.event({
        action: "Show Completed Tasks",
        category: "App Interaction",
      });
    },
    dontHideCompleted: (state) => {
      state.hideCompleted = false;
      gtag.event({
        action: "Hide Completed Tasks",
        category: "App Interaction",
      });
    },
    setChecklist: (state, action) => {
      state.checklist = action.payload;
    },
    checkItem: (state, action) => {
      const section = state.checklist.find(
        (sec) => sec.title === action.payload.sectionTitle
      );
      section.listItems[action.payload.itemId].checked =
        !section.listItems[action.payload.itemId].checked;

      const itemText = section.listItems[action.payload.itemId].text;
      gtag.event({
        action: "Check Item",
        category: "App Interaction",
        label: itemText,
      });
    },
    resetListItems: (state) => {
      state.checklist.forEach((sec) => {
        sec.listItems.forEach((item) => {
          item.checked = false;
        });
      });
      gtag.event({ action: "Reset Checklist", category: "App Interaction" });
    },
    setEndModalOpen: (state, action) => {
      state.endModalOpen = action.payload;
      gtag.event({ action: "Open End Modal", category: "App Interaction" });
    },
  },
});

export const {
  openSettings,
  closeSettings,
  doHideLinks,
  dontHideLinks,
  doHideCompleted,
  dontHideCompleted,
  setChecklist,
  checkItem,
  resetListItems,
  setEndModalOpen,
} = progressSlice.actions;

export default progressSlice;
