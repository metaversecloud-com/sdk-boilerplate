import { GlobalDispatchContext, GlobalStateContext } from "./GlobalContext";
import PropTypes from "prop-types";

const GlobalState = (props) => {
  const { children, dispatch, initialState } = props;
  return (
    <GlobalStateContext.Provider value={initialState}>
      <GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

GlobalState.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.any.isRequired,
  initialState: {
    hasInteractiveParams: PropTypes.bool,
    hasSetupBackend: PropTypes.bool,
    selectedWorld: PropTypes.object,
    urlSlug: PropTypes.string,
  },
};

export default GlobalState;
