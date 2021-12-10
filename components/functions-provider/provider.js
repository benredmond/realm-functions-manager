import React from "react";

// FunctionsContext is responsible for storing the list of fetched functions at a global level so we
// don't need to do too much props drilling.
// note that this is not good because we're currently fetching all functions before doing a client-side
// filter
export const FunctionsContext = React.createContext([]);

export const FunctionsProvider = ({ children }) => {
  const [functions, setFunctions] = React.useState([]);

  const handleFunctions = (functions) => {
    setFunctions(functions);
  };

  const contextProps = {
    functions,
    handleFunctions,
  };

  return (
    <FunctionsContext.Provider value={contextProps}>
      {children}
    </FunctionsContext.Provider>
  );
};

export default FunctionsProvider;
