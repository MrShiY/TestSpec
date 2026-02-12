import OpenAI from "openai";

async function AskQuestion(question: string) {
  try {
    const openaiApiKey =
      "sk-proj-xxx";
    const openai = new OpenAI({
      apiKey: openaiApiKey,
      timeout: 900 * 1000, // 为了支持long run的任务, 超时时间设置15分钟
    });

    const instructions = `
    你是一个问答助手, 从提供的工具中选择合适的工具来回答用户的问题.
    `;
    const tools = [
      {
        type: "mcp",
        server_label: "dmcp",
        server_description: "weather.",
        server_url:
          "https://mcp.agentweave.ai/mcp?user_id=f572db52-1383-4d12-bd0b-69bc5615cb13&agent_id=open_chat_agent_2b36d0a2-d0be-4ec2-b7e4-cd6beda525cc",
        require_approval: "never",
      },
      {
        type: "mcp",
        server_label: "dmcp2",
        server_description: "daiyang.",
        server_url:
          "https://mcp.agentweave.ai/mcp?user_id=c_175731481248e12390-20a1-707d-7ec7-1c17e4122d6a&agent_id=openai_rag_9b1a97bb-2cc0-4abb-966e-5ebf405cdfef",
        require_approval: "never",
      },
    ];

    const stream = await openai.responses.stream({
      model: "gpt-4o",
      input: question,
      instructions: instructions,
      stream: true,
      tool_choice: tools.length > 0 ? "auto" : undefined,
      tools: tools as any,
      store: true,
    });

    for await (const event of stream) {
      if (event.type !== "response.output_text.delta") {
        console.log(">>>> event:", event);
      }
    }

    const result = await stream.finalResponse();
    console.log(`>>>>>>>> response:`, result);
  } catch (error) {
    console.error("AskQuestion error:", error);
  }
}

AskQuestion("介绍一下王伟?").then((res) => {
  console.log("AskQuestion res:", res);
});
