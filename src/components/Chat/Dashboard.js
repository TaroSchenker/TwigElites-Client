import React from "react";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";
import { useConversations } from "../../contexts/ConversationsProvider";

const Dashboard = () => {
  const { selectedConversation } = useConversations();
  const id = localStorage.getItem("twiglets-id");
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
};

export default Dashboard;
