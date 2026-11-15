---
name: liyu-release-publish
description: 鲤鱼监控版本发布：按用户给定版本打包 LiyuTargetMon 配置、提交并推送代码，读取对应更新日志并发布 GitHub Latest Release。用于明确要求发布鲤鱼监控版本的请求。
---

# 鲤鱼监控版本发布

用户调用本技能并提供版本号（例如 v1.6.4），即授权执行打包、提交、push、打 tag 和正式发布，无需逐步再次确认。只创建或修改技能的请求不授权发布。版本缺失时先询问；不自行递增版本。

## 项目与准备

- 仓库：`D:\Code\LiyuTargetMon`；GitHub：`dunhuixiao/LiyuTargetMon`。
- 先读取适用的 AGENTS.md，检查工作区、当前分支、remote、上游及 GitHub 登录权限。CLI 不在 PATH 时可用 `C:\Program Files\GitHub CLI\gh.exe`。
- 版本格式为 `v数字.数字.数字`。按版本 tag 查询远程 Release。已有正式发布的版本时报告链接并停止创建。已有草稿时保留其 ID，完成本地 ZIP、正文和发布提交校验后，按下文的草稿续跑流程处理。已有 tag 必须核对其目标与待发布提交一致，否则停止，不移动 tag。
- 检查改动内容并确定发布相关文件；不要用 `git add .` 混入无关文件。明确属于本版本的已有修改可提交；范围不明确则询问。不要丢弃用户改动，不 force push。

## 1. 打包

从 `docs/.vuepress/public/targetmon` 精确选择以下三个文件，其中 `{版本号}` 包含前缀 v：

- `【鲤鱼监控】{版本号}（两行模式）.jx3dat`
- `【鲤鱼监控】{版本号}（四行模式）.jx3dat`
- `鲤鱼监控.url`

任一缺失就停止，不使用其他版本替代。创建 ZIP 到 `docs/.vuepress/public/release/{版本号}.zip`；三个文件直接位于 ZIP 根目录，保留中文文件名，不套文件夹。使用 .NET ZipArchive 的 UTF-8 条目名或支持中文的等效工具；文件路径用 LiteralPath 或等效精确路径方式处理。

检查已有的 `docs/.vuepress/public/release/{版本号}.zip`，核对条目恰好三个、文件名正确且解压内容与当前版本三个源文件逐字节一致。全部一致则复用，否则重新打包。ZIP 不存在时创建。新打包的 ZIP 关闭后重新打开，再次核对条目数量、文件名及内容。

## 更新说明

使用随技能提供的 [copy_release_notes.py](scripts/copy_release_notes.py)，直接复制 `docs/guide/change-log.md` 中对应版本二级标题下 `:::info 更新信息` 容器内部的原始内容。脚本保留中文、Markdown、缩进及换行，处理嵌套容器，检查版本和容器唯一、完整、非空。

在仓库根目录执行以下命令，`$notesPath` 指向仓库外临时目录中的正文文件。检查退出码成功后再使用产出。

```powershell
python .agents/skills/liyu-release-publish/scripts/copy_release_notes.py $version --changelog docs/guide/change-log.md --output $notesPath
```

发布时将这份文件直接传给 `--notes-file`。用户要求展开预览时，省略 `--output`，直接返回脚本输出的全文。所有预览、草稿校验和发布共用这份原文，禁止凭记忆重写、手动转录或总结替代。正文与源日志以脚本复制的字节内容为准。

## 2. 提交和推送

将本次发布相关代码、配置、更新日志，以及第一步新打包或复用的 `docs/.vuepress/public/release/{版本号}.zip` 显式加入暂存区。提交时必须包含本次新打包 ZIP 的新增或修改，确保 ZIP 纳入 Git 版本管理。

核对 staged diff 后提交，commit message 固定为 `{版本号}`，例如 `v1.6.4`，完整消息仅使用版本号。无新改动时不制造空提交。记录发布提交 SHA，并确认该提交中的 ZIP 与第一步产出逐字节一致。

推送该分支到已核实的 origin 上游。每步检查退出码，失败就停止后续步骤。需要解决远程分歧时不自动强推。推送后核实远程分支 SHA。

## 3. 发布 Latest Release

若 tag 不存在，在已推送的发布提交上创建 `{版本号}` tag 并推送；核对远程 tag 指向发布 SHA。只有 tag 和分支均验证成功后才发布。

- tag：`{版本号}`
- title：`LiyuTargetMon-{版本号}`
- notes：上述容器内原文
- 正式发布，非 draft、非 prerelease，显式设置 Latest。
- 上传第 1 步 ZIP，附件实际名称为 `LiyuTargetMon-{版本号}.zip`。

GitHub CLI 的 `path#label` 设置的是显示标签，不保证改附件文件名。因此先将本地 ZIP 复制到仓库外临时目录，复制件命名为 `LiyuTargetMon-{版本号}.zip`，验证哈希一致后上传复制件；仓库内仍保留 `{版本号}.zip`。

远程尚无该 tag 的 Release 时，使用结构化参数或 PowerShell 参数数组调用创建命令。

```powershell
& $gh release create $version $assetPath --repo dunhuixiao/LiyuTargetMon --verify-tag --title "LiyuTargetMon-$version" --notes-file $notesPath --latest
```

### 草稿续跑与失败恢复

携带附件的创建命令分为创建草稿、上传附件、正式发布三个阶段。任一阶段报错后，先重新查询该 tag 的 Release，按实际远程状态处理。

1. 远程没有 Release 时，在可恢复的错误排除后重试创建。查询失败时先恢复查询，确认远程状态后再决定下一步。
2. 远程是草稿时，确认 tag 指向已核实的发布提交、标题为 `LiyuTargetMon-{版本号}`、正文与脚本生成的 notes 文件一致、`prerelease=false`。比较正文时仅可统一 CRLF/LF。存在不匹配的字段或预期 ZIP 以外的附件时报告差异，等待用户明确处理方式。
3. 草稿缺少目标 ZIP 时直接上传。已有同名且 `state=uploaded` 的 ZIP 时，下载并校验大小及 SHA256，一致则复用。完整附件内容不符时报告差异。仅对已核实匹配本次发布的草稿，允许删除上传失败留下的同名 `state=starter` 附件后重传。
4. 确认草稿的 ZIP 上传完整且校验通过后，继续正式发布并设为 Latest。

```powershell
# 仅在目标附件缺失或已清理失败的 starter 附件时执行上传。
& $gh release upload $version $assetPath --repo dunhuixiao/LiyuTargetMon
# 草稿正文和附件均核验成功后执行。
& $gh release edit $version --repo dunhuixiao/LiyuTargetMon --verify-tag --draft=false --prerelease=false --latest
```

5. 本次发布命令报错但远程已正式发布时，直接进入最终验证。已完成的提交、push、tag 和完整附件按校验结果复用。针对同一步骤的同一错误重试一次仍失败时，报告已完成步骤、剩余步骤和失败原因。

## 验证与交付

读取 Release API，确认 tag、title、正文、draft=false、prerelease=false、asset.name 和大小，并查询 `/repos/dunhuixiao/LiyuTargetMon/releases/latest` 确认本版本为 Latest。下载已上传附件到临时目录并比对本地 ZIP SHA256。最后给出 Release 链接、版本、提交 SHA 和附件名；验证失败须明确报告，不宣称成功。
