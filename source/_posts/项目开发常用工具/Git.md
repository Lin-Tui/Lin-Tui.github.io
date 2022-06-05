---
title: Git
date: 1625572792753.3086
tags:
- Git命令快查
category:
- 项目开发常用工具
---
#### 创建版本库

```js
git clone git@github.com:Lin-Tui/gitTest.git //克隆远程版本库到本地（这个步骤前无需添加该远程仓库）
git clone -b remote_branchName git@github.com:Lin-Tui/gitTest.git //克隆指定的远程分支到本地
git init //初始化本地版本库
```

#### 修改和提交

```js
touch fileName //创建文件
mkdir dirName //在当前目录创建文件夹
rm fileName //删除指定文件 
rm -r dirName  //删除指定文件夹
cat fileName //查看文件内容
cd dirName //进入该文件夹
cd . //返回上级目录
cd .. //返回上上级目录
git status // 查看状态
git diff // 查看变更内容
git mv oldFileName newFileName  //更改文件名
git * rm //删除所有文件 
git * rm -r //删除所有文件夹
git add . //暂存所有文件
git add fileName //暂存指定文件
git commit fileName -m "commit message" //提交指定文件
git commit -m "commit message" //提交所有更新过的文件
git commit -m "commit message" -a //暂存所有修改并提交
```

#### 查看提交历史

```js
git log //查看历史
git log -p fileName //查看指定文件的提交历史
git blame fileName //修改最后一次提交
```

#### 分支与标签

```js
git branch //列出所有本地分支 
git branch -r //列出所有远程分支
git branch local_branchName //创建本地分支
git branch -d local_branchName //删除指定的本地分支
git checkout local_branchName //切换到指定分支
git checkout -b local-branchName //创建并切换到新的本地分支
git tag //查看所有本地标签
git tag --list //查看所有本地标签
git tag tagName //给当前分支打标签
git push origin tagName  //推送当前标签
git push --tag //上传所有标签
git tag -d tagName //删除当前分支标签
git push origin :tagName  //删除当前分支标签
```

#### 分支与合

```js
git merge branchName //合并分支
git rebase branchName //
```

#### 远程操作

```js
git remote -v  //查看远程版本库信息
git remote show <remote> //查看指定远程版本库信息
git remote add origin git@github.com:Lin-Tui/gitTest.git//添加指定远程版本库。新建一个本地仓库就要为该本地仓库添加远程版本库。
git fetch <remote> //从远程版本库获取代码
git pull //将当前分支推送到远程同名且关联的分支上
git pull origin master //这个命令可以在本地任意分支上使用，拉取默认分支代码及快速合并
git pull origin remote_branchName //拉取指定分支的代码并快速合并
git push --set-upstream origin remote_branchName //将当前分支与指定远程分支建立关联
git push  //在当前本地分支推送到远程同名的且关联的分支上，并快速合并
git push origin master (--force)// 将本地master分支推送到默认远程仓库master上并快速合并，括号内容可选（不是强制提交）
git push origin local_branchName:remote_branchName //推送任意指定本地分支上的代码到任意指定远程仓库分支上.local_branchName必须为你本地存在的分支，remote_branchName为远程分支，如果remote_branchName不存在则会自动创建分支。
git push origin remote_branchName// 创建一个远程仓库的新分支
git push origin :remote_branchName // 删除远程分支
下载和上传指定分支
```

#### 撤销

```js
git checkout a.js //撤销对指定的还未暂存(工作区)的文件的修改.(这个命令会用暂存区指定的文件替换工作区的文件。这个操作很危险，会清除工作区中未添加到暂存区的改动。)
git checkout . //撤销对所有的还未暂存(工作区)的文件的修改.(这个命令会用暂存区全部文件替换工作区的文件。这个操作很危险，会清除工作区中未添加到暂存区的改动。)
git checkout head a.js // 撤销对暂存区和工作区中指定文件的修改，将上次提交的内容替换到暂存区和工作区中。
git checkout head . // 撤销对暂存区和工作区中所有文件的修改，将上次提交的内容替换到暂存区和工作区中。
git reset HEAD a.js // 撤销对暂存区的修改，但工作区仍和原来一样。(将咱暂存区和HEAD的提交保持一致)
git reset --hard HEAD // 撤销对暂存区和工作区的修改。(将工作区、暂存取和HEAD保持一致)
git revert <commit> //撤销指定的提交，回退到指定版本。<commit>为想回退的版本后一个版本
git reset --hard <commit> //撤销指定的提交，回退到指定版本。并且在git push 后远程的相关提交历史会被清除。<commit>为想回退的版本。
```

[Git常用命令速查表（收藏大全）](https://juejin.im/entry/5b802f2f6fb9a019eb43bb42?tdsourcetag=s_pctim_aiomsg)





保存已修改的git stash

建立新分支之后，将原来的改动放到现在的新分支上

git stash pop

1. 上次提交后，hello.js 里面是空的。 
2. 在工作区往 hello.js 里添加一行 111
3. git add hello.js
4. 现在工作区和暂存区的hello.js都是只有一行 111。
5. 将工作区的hello.js添加一行222
6. git checkout hello.js
7. 现在工作区和暂存区的hello.js都是只有一行 111。
8. 将工作区的hello.js添加一行222
9. git reset head hello.js
10. 现在工作区有两行，不变。暂存区回到上次提交时的样子，是0行。
11. 验证，用 git checkout hello.js
12. 现在工作区和暂存区的hello.js都为空。













