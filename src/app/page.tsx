"use client"; // Indicates that this file is a client-side module

import React, { useState } from "react";
import Header from "../components/Header";
import { TodoList } from "../components/TodoList";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import DateComponent from "../components/Date";
import "../styles/globals.css";

export default function Home() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Header />
      <div className="border rounded-md max-w-2xl mx-auto p-4 mt-4">
        <DateComponent date={date} setDate={setDate} />

        <CopilotKit runtimeUrl="/api/copilotkit">
          <TodoList selectedDate={date.toISOString().split("T")[0]} />

          <CopilotSidebar
            hitEscapeToClose
            instructions={
              "Help the user manage a todo list. If the user provides a high level goal, " +
              "break it down into a few specific tasks and add them to the list"
            }
            defaultOpen={true}
            labels={{
              title: "My Day Copilot",
              initial:
                "¡Bienvenido! 👋 Yo te puedo ayudar con tu día a día, cuéntame qué necesitas hacer.",
              placeholder: "Escribe tu solicitud aqui.",
            }}
            clickOutsideToClose={false}
          />
        </CopilotKit>
      </div>
    </>
  );
}
