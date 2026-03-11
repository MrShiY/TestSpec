# Hello World

## 项目简介

这是 TestSpec 项目的说明文档。

## 目录结构

```
TestSpec/
├── ARTest/          # AR测试相关文件
└── README.md        # 项目说明文档
```

## 快速开始

1. 克隆项目
```bash
git clone <repository-url>
cd TestSpec
```

2. 配置环境变量
```bash
# 复制环境变量模板文件
cp .env.example .env

# 编辑 .env 文件，填入你的 API 密钥
# OPENAI_API_KEY=your-actual-api-key-here
```

3. 安装依赖
```bash
npm install
# 或
yarn install
```

4. 运行项目
```bash
npx ts-node test.ts
```

## 气体单位换算

### 氢气（H2）换算结果

**换算条件：**
- 气体：氢气（H2）
- 温度：20℃
- 压力：标准大气压（1.013bar）

**换算结果：**

| 输入 | 输出 |
|------|------|
| 10 kg 氢气 | **119.40 m³（20℃）** |

**换算依据：**
- 根据气体介质换算模型
- 1 kg 氢气 = 11.939728 m³（20℃）
- 10 kg × 11.939728 m³/kg = 119.39728 m³ ≈ **119.40 m³**

**参考数据：**
- 氢气分子量：2.01588 g/mol
- 氢气密度（20℃）：0.083754 g/L

## 使用说明

（添加项目的使用说明）

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目。

## 许可证

（添加许可证信息）

## 联系方式

（添加联系方式）
