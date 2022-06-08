import React, { Dispatch } from "react";
import { Notification, Actions } from "./ToastReducer";

interface Props {
  notification: Notification;
  dispatch: Dispatch<Actions>;
  autoRemove?: number;
}
export const ToastNotification: React.FC<Props> = ({
  notification,
  dispatch,
  autoRemove,
}) => {
  if (autoRemove) {
    setTimeout(() => {
      dispatch({ actionType: "remove", id: notification.id });
    }, autoRemove);
  }

  return (
    <li
      key={notification.id}
      className={`toast-notif toast-notif--${notification.type}`}
    >
      <button
        className="close-toast-notif-btn"
        aria-label="Dismiss notification"
        onClick={() => dispatch({ actionType: "remove", id: notification.id })}
      >
        X
      </button>
      <p> {notification.id} </p>
    </li>
  );
};
