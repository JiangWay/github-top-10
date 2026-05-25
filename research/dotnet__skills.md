---
repo: dotnet/skills
first_seen: 2026-05-22
last_updated: 2026-05-24
appearances: [2026-05-22, 2026-05-23, 2026-05-24]
growth_appearances: [2026-05-22, 2026-05-23, 2026-05-24]
has_releases: true
latest_release: skill-validator-nightly
tags: [開發者工具, Skill 外掛, 企業級, 開源替代]
domain: 開發者工具
form: Skill 外掛
themes: [企業級, 開源替代]
---

## 深度研究（2026-05-22 首次）

### 專案定位

微軟 [dotnet](https://github.com/dotnet) 組織官方策展的 .NET／C# Agent Skills marketplace，2026-02-03 建立、MIT 授權、2,122 stars／175 forks。倉內含 12 個 plugin（dotnet、dotnet-ai、dotnet-aspnet、dotnet-data、dotnet-diag、dotnet-maui、dotnet-msbuild、dotnet-nuget、dotnet-template-engine、dotnet-test、dotnet-upgrade、dotnet11），對應 .NET 從基礎、ASP.NET、MAUI、EF、MSBuild、NuGet、效能診斷到 .NET 11 新 API 的全棧任務。

### 核心架構 / 主要概念

遵循 [agentskills.io](https://agentskills.io) 開放標準的 SKILL.md 格式，採 plugin marketplace 模式同步散發至 Claude Code、GitHub Copilot CLI／VS Code、Cursor、Codex CLI 與 Gemini CLI。隨倉附 SkillValidator nightly nupkg（[skill-validator-nightly](https://github.com/dotnet/skills/releases/tag/skill-validator-nightly)）與 [dashboard](https://dotnet.github.io/skills/) 追蹤每個 plugin 的 accuracy／efficiency 評分。

### 目標使用者

.NET／C# 工程師、跨 IDE 的 AI coding agent 使用者、企業 .NET 升級／診斷 pipeline owner。

### 與類似專案的差異

對應 [anthropics/skills](https://github.com/anthropics/skills) 通用集；同期 [microsoft/azure-skills](https://github.com/microsoft/azure-skills)、[microsoft/power-platform-skills](https://github.com/microsoft/power-platform-skills) 為姊妹倉。社群版 [Aaronontheweb/dotnet-skills](https://github.com/Aaronontheweb/dotnet-skills)、[managedcode/dotnet-skills](https://github.com/managedcode/dotnet-skills) 早於官方但缺微軟自家工程實務背書。

### 外部評論

- [Extend your coding agent with .NET Skills（.NET Blog）](https://devblogs.microsoft.com/dotnet/extend-your-coding-agent-with-dotnet-skills/)：官方宣告 marketplace 上線、強調與 agentskills.io 標準相容。
- [Agent Skills in Visual Studio（Visual Studio Blog）](https://devblogs.microsoft.com/visualstudio/agent-skills-in-visual-studio/)：示範 VS 2026 把 [dotnet/skills](https://github.com/dotnet/skills) 加為 Copilot marketplace URL 的整合路徑。
- [GitHub Copilot Skills vs SKILL.md（agensi.io）](https://www.agensi.io/learn/github-copilot-skills-vs-skill-md-2026)：定位本倉為「微軟 first-party 採用 SKILL.md 格式」的指標事件。

### Release 狀態

僅 `skill-validator-nightly` pre-release（github-actions bot 自動產出），無正式語意化版號。

### 授權與社群

MIT。主要貢獻者 ViktorHofer（110）、JanKrivanek（83）、Evangelink 等多為微軟員工。
