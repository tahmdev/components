import SwipeButton from "./SwipeButton";
import { fireEvent, render, screen } from "@testing-library/react";

it("should render children", () => {
  const component = render(
    <SwipeButton>
      <div>Test text</div>
    </SwipeButton>
  );
  expect(component.queryByText("Test text")).toBeTruthy();
});
