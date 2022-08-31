import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../contexts/ConversationsProvider";

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations();
  console.log(conversations);

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, i) => (
        <ListGroup.Item
          key={i}
          action
          onClick={() => selectConversationIndex(i)}
          active={conversation.selected}
        >
          {conversation.recipients.map((r) => r.name).join(",")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Conversations;
