import React from "react";

export const FullHeightLayout = ({ children }) => {
  return (
    <div className="absolute top-16 bottom-0 w-full overflow-auto">
      {children}
    </div>
  );
};
