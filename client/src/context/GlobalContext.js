import React from "react";
import { Topia, WorldFactory } from "@rtsdk/topia";

const GlobalStateContext = React.createContext();
const GlobalDispatchContext = React.createContext();

function globalReducer(state, action) {
  switch (action.type) {
    case "SELECT_WORLD":
      return {
        ...state,
        urlSlug: action.payload.urlSlug,
        selectedWorld: action.payload.selectedWorld,
      };
    case "SET_INTERACTIVE_PARAMS":
      return {
        ...state,
        ...action.payload,
        hasInteractiveParams: true,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GlobalProvider({ children }) {
  const [state, dispatch] = React.useReducer(globalReducer, {
    hasInteractiveParams: false,
    selectedWorld: {},
    urlSlug: "",
  });
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}

function useGlobalState() {
  const context = React.useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
}

function useGlobalDispatch() {
  const context = React.useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error("useGlobalDispatch must be used within a GlobalProvider");
  }
  return context;
}

function setInteractiveParams({ assetId, dispatch, visitorId, interactiveNonce, interactivePublicKey, urlSlug }) {
  const isInteractiveIframe = visitorId && interactiveNonce && interactivePublicKey && assetId;
  dispatch({
    type: "SET_INTERACTIVE_PARAMS",
    payload: {
      assetId,
      visitorId,
      interactiveNonce,
      interactivePublicKey,
      urlSlug,
      isInteractiveIframe,
    },
  });
}

// eslint-disable-next-line no-unused-vars
async function fetchWorld({ apiKey, dispatch, urlSlug }) {
  if (!apiKey || !urlSlug) return;
  try {
    const topia = await new Topia({
      apiDomain: process.env.REACT_APP_INSTANCE_DOMAIN,
      apiKey,
    });
    const selectedWorld = await new WorldFactory(topia).create(urlSlug);
    await selectedWorld.fetchDetails();
    dispatch({
      type: "SELECT_WORLD",
      payload: {
        urlSlug,
        selectedWorld,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export { GlobalProvider, fetchWorld, setInteractiveParams, useGlobalState, useGlobalDispatch };
