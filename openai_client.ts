import OpenAI from 'openai';

interface OpenAIRequestOptions {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

/**
 * 调用 OpenAI Chat Completion API
 * @param apiKey - OpenAI API 密钥
 * @param options - 请求配置选项
 * @returns API 响应结果
 */
export async function callOpenAI(
  apiKey: string,
  options: OpenAIRequestOptions
): Promise<OpenAI.Chat.Completions.ChatCompletion> {
  const client = new OpenAI({
    apiKey: apiKey,
  });

  try {
    const response = await client.chat.completions.create({
      model: options.model,
      messages: options.messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens,
      top_p: options.top_p ?? 1,
      stream: options.stream ?? false,
    });

    return response;
  } catch (error) {
    console.error('OpenAI API 调用失败:', error);
    throw error;
  }
}

/**
 * 调用 OpenAI API 并返回文本响应
 * @param apiKey - OpenAI API 密钥
 * @param model - 模型名称 (例如: "gpt-4", "gpt-3.5-turbo")
 * @param prompt - 用户输入的提示
 * @param systemMessage - 可选的系统消息
 * @returns 模型生成的文本响应
 */
export async function getOpenAIResponse(
  apiKey: string,
  model: string,
  prompt: string,
  systemMessage?: string
): Promise<string> {
  const messages: OpenAIRequestOptions['messages'] = [];

  if (systemMessage) {
    messages.push({
      role: 'system',
      content: systemMessage,
    });
  }

  messages.push({
    role: 'user',
    content: prompt,
  });

  const response = await callOpenAI(apiKey, {
    model,
    messages,
  });

  return response.choices[0]?.message?.content || '';
}

// 使用示例
// const apiKey = process.env.OPENAI_API_KEY || 'your-api-key';
// const response = await getOpenAIResponse(apiKey, 'gpt-4', '你好，请介绍一下自己');
// console.log(response);
