---
title: Git Github远程仓库的基础使用快查
date: 1580462802724.1863
tags:
- Git
category:
- 项目开发常用工具
---
## Git Github远程仓库的基础使用快查

### 1. 配置验证信息

由于本地 Git 仓库和 GitHub 仓库之间的传输是通过SSH加密的，所以我们需要配置验证信息：

* 使用以下命令生成 SSH Key：

  ```
  $ ssh-keygen -t rsa -C "youremail@example.com"
  ```

  后面的 your_email@youremail.com改为你在 Github 上注册的邮箱，之后会要求确认路径和输入密码，我们这使用默认的一路回车就行。成功的话会在 ~/ 下生成 .ssh 文件夹，进去，打开 **id_rsa.pub**，复制里面的 **key**。

* 回到 Github 上，进入 Account => Settings（账户配置）后：

  左边选择 **SSH and GPG keys**，然后点击 **New SSH key** 按钮,title 设置标题，可以随便填，粘贴在你电脑上生成的 key。

* 验证是否成功，输入以下命令：

  ```
  $ ssh -T git@github.com
  ```

* 在GitHub点击" New repository " ，创建一个仓库。比如git-test。



### 2. 添加远程仓库

* 添加一个新的远程 Git 仓库：

  ```
  $ git remote add <shortname> <url>
  ```

  例如：

  ```
  $ git remote add origin git@github.com:tianqixin/git-test.git
  ```



### 3. 查看远程仓库

- 查看已经配置的远程仓库服务器：

  ```console
  $ git remote
  ```

- 可以指定选项 `-v`，会显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL：

  ```console
  $ git remote -v
  ```



### 4. 从远程仓库中抓取与拉取

* 从远程仓库中获得数据，可以执行：

  ```console
  $ git fetch <remote-name>
  ```

  这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。

  必须注意 `git fetch` 命令会将数据拉取到你的本地仓库——它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。



### 5. 推送到远程仓库

* 当你想分享你的项目时，必须将其推送到上游：

  ```
  $ git push <remote-name> <branch-name>
  ```

  比如：当你想要将 master 分支推送到 `origin` 服务器时，那么运行这个命令就可以将你所做的备份到服务器：

  ```console
  $ git push origin master
  ```



### 6. 查看某个远程仓库

* 如果想要查看某一个远程仓库的更多信息，可以使用：

  ```
  $ git remote show <remote-name>
  ```

  例如：

  ```console
  $ git remote show origin
  ```



### 7. 远程仓库的移除与重命名

* 如果想要重命名引用的名字可以运行:

  ```
  git remote rename 
  ```

  例如：想要将 `pb` 重命名为 `paul`，可以用这样做：

  ```console
  $ git remote rename pb paul
  ```

* 移除一个远程仓库：

  ```
  $ git remote rm paul
  ```





