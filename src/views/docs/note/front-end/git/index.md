---
title: git
desc: 《JavaScript设计模式》、《大话设计模式》笔记
keywords: 设计模式、笔记
date: 2020-02-17 01:01:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/1.jpg
---

# git

## 本地操作

1. 配置

```
git config --global user.name 你的英文名
git config --global user.email 你的邮箱
git config --global push.default simple
git config --global core.quotepath false
git config --global core.editor "code --wait"
git config --global core.autocrlf input
```

2. 常用操作

```javascript
git init //初始化git本地仓库
git add xxx.xxx  //指定将要提交的文件
git add .  //提交全部文件，可以创建一个.gitIgnore写入不想提交的文件和文件夹
git commit -m '提交理由'  // 没有空格不加引号也可，参数-v可以用vscode提交，可以顺便查看修改的具体代码
git status //查看文件变动
git log //查看历史提交，需要倒着看
git reset --hard 提交号前六位  //跳版本！！
git reset --hard HEAD^ //跳到上一个版本，HEAD^^跳到上上个版本
git reflog //查看包括跳版本的所有历史记录
git checkout -- xxx.xxx //恢复到最近的一次commit或者git add的状态
git cherry-pick 提交号1 提交号2 ... // 复制选中的提交号到当前分支
```

3. 分支操作

```javascript
git branch x  //创建分支，是基于本地仓库的最新一次commit，创建一个新提交
git checkout x  //切换分支
git checkout -b x //创建分支并切换
git checkout master  //切换到主分支
git branch //查看当前分支
git merge x //合并分支，需要先到达主分支
git branch -d x  //删除分支
```

## 远程仓库

1. 提交到 github
   1. 创建 github 仓库，复制 ssh 地址
   1. 在本地添加远程仓库地址`git remote add orign git@xxx`
   1. 推送本地 master 分支到远程 origin 的 master 分支`git push -u origin master`(提交过一次后，之后可以直接 git push , origin 是可以自己命名的)
2. 下载代码到本地
   `git clone git@xxx`

## 其他

```javascript
git rebase  // 合并提交历史
git stash //代码写了一半不想提交，可以将add过的文件先暂存起来，得到一个干净的工作区
git stash pop //显示暂存的文件
```
