import { fireEvent, render, screen } from "@testing-library/react";
import { DynamicTextarea } from "./DynamicTextarea";

it("should spread the rest props to the textarea", () => {
  const component = render(
    <DynamicTextarea minRows={1} maxRows={5} placeholder="test" />
  );
  expect(screen.getByPlaceholderText("test")).toBeInTheDocument();
});

it("should handle change properly", () => {
  let content = "";
  const component = render(
    <DynamicTextarea
      data-testid="input"
      onChange={(e) => (content = e.target.value)}
      minRows={1}
      maxRows={5}
    />
  );
  const input = screen.getByTestId("input");
  fireEvent.change(input, { target: { value: "123" } });
  expect(content).toEqual("123");
});
