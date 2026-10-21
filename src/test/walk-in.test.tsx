import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WalkInAction } from "@/components/walk-in";

describe("walk-in visit actions", () => {
  it("directs both main and compact visit actions to location and opening hours, without opening a booking dialog", () => {
    render(<><WalkInAction /><WalkInAction compact /></>);
    const actions = screen.getAllByRole("link");
    expect(actions).toHaveLength(2);
    for (const action of actions) {
      expect(action.getAttribute("href")).toBe("#contact");
      fireEvent.click(action);
    }
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});