import { useChat } from "ai/react"
import ReloadIcon from "assets/reload.svg"

import "./style.css"

function IndexPopup() {
  const { messages, input, handleInputChange, handleSubmit, reload } = useChat({
    api: "http://localhost:3001/api/generate"
  })

  return (
    <div className="w-[500px] h-[500px] flex flex-col justify-center items-center p-6">
      <div className="w-full flex justify-end">
        <button
          onClick={async () => await reload()}
          className="rounded-full border-green-400 border hover:bg-green-300 h-8 w-8 flex justify-center items-center">
          <img src={ReloadIcon} alt="reload" className="h-4" />
        </button>
      </div>
      <div className="w-full h-full">
        <ul>
          {messages.map((m, index) => (
            <li key={index}>
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </li>
          ))}
        </ul>
      </div>
      <form
        className="w-full flex gap-4 justify-between items-center"
        onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          required
          placeholder="Enter the prompt"
          className="w-full border-2 border-zinc-400 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        <button
          disabled={!input}
          type="submit"
          className="rounded-md bg-green-300 ring-2 ring-green-400 px-6 py-2 font-semibold disabled:bg-gray-300 disabled:ring-gray-400">
          Generate
        </button>
      </form>
    </div>
  )
}

export default IndexPopup
