/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useBasepath, useStaticInfo, makePathAbsolute } from "react-static";
import { Router, ServerLocation, Location } from "@reach/router";

const MyRouter = ({ RouterProps: userRouterProps = {} }) => ({
  Root:
    (PreviousRoot) =>
    ({ children, ...rest }) => {
      const basepath = useBasepath();
      const staticInfo = useStaticInfo();

      const RouteHandler = (props) => (
        <PreviousRoot {...rest} {...props}>
          {children}
        </PreviousRoot>
      );

      const renderedChildren = (
        // Place a top-level router inside the root
        // This will give proper context to Link and other reach components
        <Router {...(basepath ? { basepath } : {})} {...userRouterProps}>
          <RouteHandler path="/*" />
        </Router>
      );

      return typeof document === "undefined" ? (
        <ServerLocation url={makePathAbsolute(`${basepath}/${staticInfo.path}`)}>
          {renderedChildren}
        </ServerLocation>
      ) : (
        renderedChildren
      );
    },
  Routes: (PreviousRoutes) => (props) => {
    return (
      <Location>
        {(location) => <PreviousRoutes path="/*" {...props} location={location} />}
      </Location>
    );
  },
});

export default MyRouter;
