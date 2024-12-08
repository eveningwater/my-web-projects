import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Input,
  Button,
  Space,
  Popconfirm,
  Flex,
} from "antd";
import { getMockMessages } from "./mock/mock";
import { groupByInterval, mergeMessagesByType } from "./utils/utils";
import { Message } from "./types/message";
import {
  DeleteOutlined,
  RobotOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import useStorage from "./hooks/useStorage";
import { STORE_MESSAGR_KEY } from "./const";
import ewMessage from "ew-message";
import "ew-message/dist/ew-message.min.css";
import "animate.css";
import { RenderContent } from "./components/render-content";
import { getChatbotResponse } from "./api/ai";

const { Text } = Typography;
const { TextArea } = Input;

const App: React.FC = () => {
  const [storeMessages, setStoreMessages] = useStorage<Message[]>(
    STORE_MESSAGR_KEY,
    getMockMessages()
  );
  const [messages, setMessages] = useState<Message[]>([]);

  const [inputMessage, setInputMessage] = useState<string>("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null); // 用于滚动到底部

  useEffect(() => {
    if (storeMessages && storeMessages?.length > 0 && !messages.length) {
      setMessages(storeMessages!);
    }
  }, [storeMessages]);

  useEffect(() => {
    const msgs = getMockMessages();
    setStoreMessages(msgs);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 处理用户输入的消息
  const handleSendMessage = async () => {
    if (!inputMessage.trim())
      return ewMessage.warning({
        content: "请输入内容",
        removeClassName: ["animate__bounceOut", "animate__animated"],
        startClassName: ["animate__animated", "animate__bounce"],
        duration: 4000,
      });

    const userMessage: Message = {
      name: "夕水",
      text: inputMessage,
      timestamp: new Date().getTime(),
      isEnd: false,
      type: "text",
      isNext: true,
    };
    setMessages((p) => [...p, { ...userMessage, messageId: p.length + 1 }]);
    await getChatbotResponse<Message>(inputMessage, (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...data,
          name: "机器人-毛毛",
          timestamp: new Date().getTime(),
          isEnd: false,
          isNext: false,
          messageId: prevMessages.length + 1,
        },
      ]);
    });
    setInputMessage(""); // 清空输入框
  };

  const handleResetMessage = () => {
    setMessages([]);
    setStoreMessages([]);
  };

  const groupedMessages = useMemo(() => {
    if (messages.length > 0) {
      const mergeData = groupByInterval(
        messages,
        (item) => item.isNext || item.isEnd
      ).map((group) => mergeMessagesByType(group));
      return mergeData;
    }
    return [];
  }, [messages]);
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        一个模拟的聊天对话界面
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {groupedMessages.map((group, idx) => (
          <Col span={24} key={idx}>
            {group.map((msg, i) => (
              <Card key={i} style={{ marginBottom: "10px" }}>
                <Row style={{ marginBottom: 15 }}>
                  <Col span={24} style={{ marginBottom: 6 }}>
                    <Row align="middle">
                      {msg.name === "bot" ? (
                        <RobotOutlined
                          style={{ fontSize: 25, marginRight: 8 }}
                        />
                      ) : (
                        <UserOutlined
                          style={{ fontSize: 25, marginRight: 8 }}
                        />
                      )}
                      <Text strong>{msg.name}</Text>
                    </Row>
                  </Col>
                  <Col style={{ fontSize: "12px", color: "gray" }} span={24}>
                    {dayjs(msg.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                  </Col>
                </Row>
                <Row
                  style={{
                    backgroundColor: "#98b7ef",
                    color: "#fff",
                    padding: 15,
                    borderRadius: 10,
                  }}
                >
                  <RenderContent {...msg} />
                </Row>
              </Card>
            ))}
          </Col>
        ))}
      </Row>

      {/* 滚动到底部的 div */}
      <div ref={endOfMessagesRef} />
      <Row style={{ marginTop: "20px" }} gutter={5} align="middle" wrap>
        <Col lg={{ span: 21 }} xs={{ span: 24 }}>
          <TextArea
            rows={2}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="请输入你的问题"
          />
        </Col>
        <Col lg={{ span: 3 }} xs={{ span: 24 }}>
          <Flex justify="flex-end" align="center">
            <Space>
              <Popconfirm
                title="温馨提示"
                icon={null}
                description="确定要清空所有对话吗?"
                onConfirm={handleResetMessage}
                okText="确认"
                cancelText="取消"
              >
                <Button
                  type="primary"
                  danger
                  style={{ marginTop: "10px" }}
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
              <Button
                type="primary"
                style={{ marginTop: "10px" }}
                onClick={handleSendMessage}
                icon={<SendOutlined />}
              />
            </Space>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default App;
