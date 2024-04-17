import { useReducer } from "react";
import { globalReducer } from "./reducer";
import GlobalState from "./GlobalState";
import PropTypes from "prop-types";

const initialState = {
  hasInteractiveParams: false,
  hasSetupBackend: false,
  selectedWorld: {},
  urlSlug: "",
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalState initialState={state} dispatch={dispatch}>
      {children}
    </GlobalState>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
