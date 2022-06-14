---
title: FAQ ✨
prev: /guide/download.html
next: /guide/change-log.html
---

### 如果我不喜欢倒计时、边框风格、右键点掉 Buff 功能，怎么办？

在「茗伊插件集-目标-目标监控」里进行编辑。

![An image](https://fastly.jsdelivr.net/gh/dunhuixiao/LiyuTargetMon@docs/image/6.png)

### 如果我想要添加自己单独的监控怎么办？

找到你想要添加 Buff / Debuff 名称，「茗伊插件集-目标-目标监控-设置监控」中新建后调整即可。

![An image](https://fastly.jsdelivr.net/gh/dunhuixiao/LiyuTargetMon@docs/image/7.png)

### 为什么有些 Buff 没有加入监控？

Buff 加入监控的条件是足够「重要」且非「常驻」，为了整个监控的风格趋于简洁，能够一眼抓住重要信息，会比较克制。

### Buff / Debuff 图标修改右对齐就不显示？

右对齐不显示是因为我设置了一页显示 32 个 Buff，整个 Buff 条的长度大概是 80% 个屏幕，初始化的位置大概在右 40%，右对齐的话最开始的 Buff 会直接出现在屏幕外。

如果需要从右往左显示 Buff，建议调整一下监控条的位置到屏幕正中间或左边。

### 为什么我导入了以后 Buff 图标还是不显示？

在确认已经正确导入后，选择任意一行监控的启用，取消勾选后再次勾选，即可生效。

### 我该怎么样调整图标、文字大小？

可在「茗伊插件集-目标-目标监控」图标缩放、图标文字缩放、其他文字缩放上修改，分别对应为图标大小、图标上倒计时文字大小、图标下技能别名文字大小。

### 如果我想要单独对云剑斧进行重要 Buff 监控怎么办？

[下载](download.md)中额外提供了只监控白云的监控文件，监控范围仅保留了特殊技能、沉默、缴械、减伤、爆发、封内，可以跟正常的 Buff 监控一起导入。

![An image](https://fastly.jsdelivr.net/gh/dunhuixiao/LiyuTargetMon@docs/image/20220430030348.png)

该监控默认监控白云，如果你需要监控小剑、斧头或是其他标记，请打开文件修改 uuid 保存后导入，再修改监控目标。

![An image](https://fastly.jsdelivr.net/gh/dunhuixiao/LiyuTargetMon@docs/image/20220430030600.png)

![An image](https://fastly.jsdelivr.net/gh/dunhuixiao/LiyuTargetMon@docs/image/20220430030751.png)

默认显示位置在此处，如果修改导入了多个白云监控会重叠在一起，请自行拖拽到你习惯的位置。

![An image](https://fastly.jsdelivr.net/gh/dunhuixiao/LiyuTargetMon@docs/image/20220430030945.png)

### 我该怎么调整技能 Buff 显示的顺序？

使用编辑器打开 `.jx3dat` 文件，里面数据结构可以使用 `JavaScript` 格式化查看，找到你想调整的 Buff，将该 Buff 调整到你想调整的位置，注意每个 Buff 的花括号作用范围。

可以在 [GitHub](https://github.com/dunhuixiao/LiyuTargetMon/tree/master/docs/.vuepress/public/targetmon/prioritylevel) 获取到我做的原始文件，里面有备注分类，调整好顺序后替换可用文件里面的监控数据即可。

修改完保存时需要注意文件编码的问题，如果默认保存成了 `UTF-8` 会出现乱码。

如果看不懂代码结构，或是上述流程无法上手，可以尝试在「茗伊插件集-目标-目标监控-设置监控」中手动调整 Buff 顺序，缺点是每次只能调整一级，如果要将 Buff 从后面位置调整到前列，会很繁琐。
