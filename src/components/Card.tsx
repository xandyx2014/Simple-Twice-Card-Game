import React, { forwardRef, useEffect, useRef } from "react";
import { Items } from "../items";

interface Props {
  value: Items;
  onClick?: (value: Items) => void;
}
enum DisplayCard {
  none = "none",
  inline = "inline",
}
export const Card = forwardRef<HTMLDivElement, Props>(
  ({ value, onClick }, ref) => {
    const cardValueRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const currentDisplay =
        value.display === "inline" ? DisplayCard.inline : DisplayCard.none;
      changeDisplay(currentDisplay);
    }, [value.display]);
    const changeDisplay = (display: DisplayCard) => {
      cardValueRef.current?.style.setProperty("--value-card", display);
    };
    return (
      <div
        ref={ref}
        className="card"
        onClick={() => {
          if (onClick) {
            onClick({ ...value });
          }
        }}
      >
        <div className="value" ref={cardValueRef}>
          {value.value}
        </div>
      </div>
    );
  }
);
