import { Notification, toastReducer } from "./ToastReducer";

describe("adding an item", () => {
  it("should update the state properly", () => {
    const initialState: Notification[] = [];
    expect(
      toastReducer(initialState, {
        actionType: "add",
        notifType: "info",
        text: "test",
      })
    ).toEqual([{ type: "info", text: "test", id: 1 }]);
  });

  it("should not mutate the previous state", () => {
    const initialState: Notification[] = [];
    expect(
      toastReducer(initialState, {
        actionType: "add",
        notifType: "info",
        text: "test",
      })
    ).not.toBe(initialState);
  });
});

describe("removing an item", () => {
  it("should update the state properly", () => {
    const initialState: Notification[] = [
      { type: "info", text: "test", id: 1 },
    ];
    expect(
      toastReducer(initialState, {
        actionType: "remove",
        id: 1,
      })
    ).toEqual([]);
  });

  it("should not mutate the previous state", () => {
    const initialState: Notification[] = [];
    expect(
      toastReducer(initialState, {
        actionType: "remove",
        id: 1,
      })
    ).not.toBe(initialState);
  });
});

describe("default", () => {
  it("should return the original state", () => {
    const initialState: Notification[] = [];
    expect(
      toastReducer(initialState, {
        // @ts-ignore: Unreachable code error
        actionType: "test",
        id: 1,
      })
    ).toBe(initialState);
  });
});
