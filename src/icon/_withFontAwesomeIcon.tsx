import React from "react";

import { FontAwesomeIcon, Props } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export function withFontAwesomeIcon(
  fontAwesomeIcon: IconDefinition,
  fontAwesomeIconInverted?: IconDefinition
) {
  return (props: Omit<Props, "icon"> & { outline?: boolean }) => (
    <FontAwesomeIcon
      icon={
        props.outline && fontAwesomeIconInverted
          ? fontAwesomeIconInverted
          : fontAwesomeIcon
      }
      {...props}
    />
  );
}
