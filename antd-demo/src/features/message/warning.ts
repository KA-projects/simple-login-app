import { MessageInstance } from "antd/es/message/interface";

export const warning = (msg: string, messageApi: MessageInstance) => {
  messageApi.open({
    type: "warning",
    content: msg,
    duration: 6,
  });
};
