"""
Claude API 调用方法
使用 Anthropic 官方 Python SDK 调用 Claude API
"""

import anthropic
import os


def call_claude_api(
    prompt: str,
    api_key: str = None,
    model: str = "claude-opus-4-6",
    max_tokens: int = 4096,
    temperature: float = 1.0,
    system_prompt: str = None
) -> str:
    """
    调用 Claude API 并返回响应

    参数:
        prompt: 用户输入的提示词
        api_key: Anthropic API 密钥,如果为 None 则从环境变量 ANTHROPIC_API_KEY 读取
        model: 使用的模型名称,默认为 claude-opus-4-6
        max_tokens: 最大生成 token 数
        temperature: 温度参数,控制随机性(0-1)
        system_prompt: 系统提示词,可选

    返回:
        Claude 的响应文本
    """
    # 如果未提供 API 密钥,则从环境变量读取
    if api_key is None:
        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError("需要提供 API 密钥或设置环境变量 ANTHROPIC_API_KEY")

    # 初始化客户端
    client = anthropic.Anthropic(api_key=api_key)

    # 构建消息参数
    message_params = {
        "model": model,
        "max_tokens": max_tokens,
        "temperature": temperature,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    # 如果提供了系统提示词,则添加
    if system_prompt:
        message_params["system"] = system_prompt

    # 调用 API
    message = client.messages.create(**message_params)

    # 提取并返回响应文本
    return message.content[0].text


def call_claude_api_streaming(
    prompt: str,
    api_key: str = None,
    model: str = "claude-opus-4-6",
    max_tokens: int = 4096,
    temperature: float = 1.0,
    system_prompt: str = None
):
    """
    调用 Claude API 并以流式方式返回响应

    参数:
        prompt: 用户输入的提示词
        api_key: Anthropic API 密钥,如果为 None 则从环境变量 ANTHROPIC_API_KEY 读取
        model: 使用的模型名称,默认为 claude-opus-4-6
        max_tokens: 最大生成 token 数
        temperature: 温度参数,控制随机性(0-1)
        system_prompt: 系统提示词,可选

    生成器:
        逐块返回 Claude 的响应文本
    """
    # 如果未提供 API 密钥,则从环境变量读取
    if api_key is None:
        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError("需要提供 API 密钥或设置环境变量 ANTHROPIC_API_KEY")

    # 初始化客户端
    client = anthropic.Anthropic(api_key=api_key)

    # 构建消息参数
    message_params = {
        "model": model,
        "max_tokens": max_tokens,
        "temperature": temperature,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    # 如果提供了系统提示词,则添加
    if system_prompt:
        message_params["system"] = system_prompt

    # 流式调用 API
    with client.messages.stream(**message_params) as stream:
        for text in stream.text_stream:
            yield text


# 使用示例
if __name__ == "__main__":
    # 示例 1: 基本调用
    try:
        response = call_claude_api(
            prompt="你好,请介绍一下自己",
            # api_key="your-api-key-here",  # 或者设置环境变量
            model="claude-opus-4-6"
        )
        print("Claude 响应:")
        print(response)
    except Exception as e:
        print(f"错误: {e}")

    print("\n" + "="*50 + "\n")

    # 示例 2: 流式调用
    try:
        print("Claude 流式响应:")
        for chunk in call_claude_api_streaming(
            prompt="用三句话解释什么是机器学习",
            model="claude-opus-4-6"
        ):
            print(chunk, end="", flush=True)
        print("\n")
    except Exception as e:
        print(f"错误: {e}")
