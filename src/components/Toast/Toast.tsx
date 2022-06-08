import React, { Dispatch } from "react";
import { ToastNotification } from "./ToastNotification";
import { Notification, Actions } from "./ToastReducer";

interface Props {
  notifications: Notification[];
  dispatch: Dispatch<Actions>;
  autoRemove?: number;
}
export const Toast: React.FC<Props> = ({
  notifications,
  dispatch,
  autoRemove,
}) => {
  return (
    <div className="toast-wrapper">
      <ul>
        {notifications.map((notification) => {
          return (
            <ToastNotification
              notification={notification}
              dispatch={dispatch}
              autoRemove={autoRemove}
            />
          );
        })}
      </ul>
    </div>
  );
};
