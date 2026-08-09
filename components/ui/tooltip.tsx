"use client";

import * as React from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom";
}

export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const [coords, setCoords] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef<HTMLElement>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: side === "top" ? rect.top - 8 : rect.bottom + 8,
      left: rect.left + rect.width / 2,
    });
  };

  const handleEnter = () => {
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setOpen(true);
    }, 150);
  };

  const handleLeave = () => {
    clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) return;
    const handle = () => updatePosition();
    window.addEventListener("scroll", handle, true);
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle, true);
      window.removeEventListener("resize", handle);
    };
  }, [open]);

  const trigger = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
  });

  return (
    <>
      {trigger}
      {open &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none fixed z-[9999] max-w-xs -translate-x-1/2 whitespace-normal break-words rounded-md border border-border bg-popover px-3 py-1.5 text-left text-xs text-popover-foreground shadow-md"
            style={{
              top: coords.top,
              left: coords.left,
              transform: `translate(-50%, ${side === "top" ? "-100%" : "0"})`,
            }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}
