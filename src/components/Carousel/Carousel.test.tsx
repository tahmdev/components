import { fireEvent, render, screen } from "@testing-library/react";
import { Carousel } from "./Carousel";

it("Should render children", () => {
  render(
    <Carousel>
      <div>First Child</div>
      <div>Second Child</div>
    </Carousel>
  );
  const FirstChild = screen.getByText("First Child");
  expect(FirstChild).toBeInTheDocument();
});

it("Should render dot buttons for each child", () => {
  render(
    <Carousel>
      <div>First Child</div>
      <div>Second Child</div>
      <div>Third Child</div>
    </Carousel>
  );
  const dots = screen.getAllByText("●");
  expect(dots).toHaveLength(3);
});

describe("Autoscrolling", () => {
  it("should be called after the timer", () => {
    jest.useFakeTimers();
    render(
      <Carousel autoScroll={1000}>
        <div>First Child</div>
        <div>Second Child</div>
      </Carousel>
    );
    Element.prototype.scrollTo = jest.fn();
    jest.advanceTimersByTime(1000);
    expect(Element.prototype.scrollTo).toBeCalled();
    jest.useRealTimers();
  });
  it("should reset when the user manually scrolls", () => {
    jest.useFakeTimers();
    const { container } = render(
      <Carousel autoScroll={1000}>
        <div>First Child</div>
        <div>Second Child</div>
      </Carousel>
    );
    Element.prototype.scrollTo = jest.fn();
    jest.advanceTimersByTime(500);
    fireEvent.scroll(container.getElementsByClassName("carousel")[0]);
    jest.advanceTimersByTime(500);
    expect(Element.prototype.scrollTo).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(Element.prototype.scrollTo).toBeCalled();
    jest.useRealTimers();
  });
});
