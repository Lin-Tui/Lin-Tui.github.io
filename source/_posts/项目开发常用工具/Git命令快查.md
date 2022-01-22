---
title: Git命令快查
date: 1625572792750.3164
tags:
- Git
category:
- 项目开发常用工具
---
* ## Git常用命令备忘快查

  ### 1. git config

  - 配置个人的用户名称和电子邮件地址：

    ```
    $ git config --global user.name "runoob"
    $ git config --global user.email test@runoob.com
    ```

  - 查看配置信息：

    ```
    $ git config --list
    $ git congig -l
    ```

  - 查阅某个环境变量的设定，只要把特定的名字跟在后面即可:

    ```
    $ git config user.name
    ```

  

  ### 2. git init

  - 在当前目录中创建新的Git仓库，生成一个 .git 目录

    ```
    git init
    ```

  - 使用我们指定目录作为Git仓库

    ```
    git init <directoryName>
    ```

  

  ### 3. git clone

  - 拷贝一个Git仓库到本地，让自己能够查看该项目，或者进行修改。命令格式为：

    ```
    git clone <repo>
    ```

  - 克隆到指定的目录，可以使用以下命令格式：

    ```
    git clone <repo> <directoryName>
    ```

    - **repo:** Git 仓库。
    - **directory:** 本地目录。

    ```
    $ git clone git@github.com:schacon/simplegit.git
    ```

  

  ### 4. git add

  - 将文件添加到缓存：

    ```
    $ git add README hello.php 
    ```

  

  ### 5. git status

  - 用于查看项目的当前状态, 在你上次提交之后是否有修改.加了` -s `参数，以获得简短的结果输出。

    ```
    $ git status
    $ git status -s
    ```

  

  ### 6. git diff

  执行 `git diff `来查看执行 `git status` 的结果的详细信息。

  `git diff` 命令显示已写入缓存与已修改但尚未写入缓存的改动的区别。`git diff` 有两个主要的应用场景。

  - 尚未缓存的改动：**`git diff`**
  - 查看已缓存的改动： **`git diff --cached`**
  - 查看已缓存的与未缓存的所有改动：**`git diff HEAD`**
  - 显示摘要而非整个 diff：**`git diff --stat`**

  

  ### 7. git commit

  使用 `git add` 命令将想要快照的内容写入缓存区， 而执行 `git commit` 将缓存区内容添加到仓库中。

  Git 为你的每一个提交都记录你的名字与电子邮箱地址，所以第一步需要配置用户名和邮箱地址。(最上面两行代码)

  - 使用 `-m` 选项以在命令行中提供提交注释

    ```
    $ git commit -m '第一次版本提交'
    ```

  - 如果你没有设置` -m `选项，Git 会尝试为你打开一个编辑器以填写提交信息。如果你觉得 `git add` 提交缓存的流程太过繁琐，Git 也允许你用` -a` 选项跳过`git add`这一步。命令格式如下：

    ```
    git commit -am
    ```

  

  ### 8. git reset HEAD

  

  * `git reset HEAD` 命令用于取消已缓存的内容。

    执行 `git reset HEAD` 以取消之前 `git add` 添加，但不希望包含在下一提交快照中的缓存。

    ```
    $ git reset HEAD <fileName> 
    ```

  

  ### 9. git rm

  - 要从工作目录 中移除某个文件，就必须要从已跟踪文件清单中移除，然后提交。可以用以下命令完成此项工作:

    ```
    git rm <fileName>
    ```

  - 如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 `-f`:

    ```
    git rm -f <file>
    ```

  - 如果把文件从暂存区域移除，但仍然希望保留在当前工作目录中，换句话说，仅是从跟踪清单中删除，使用 `--cached` 选项即可:

    ```
    git rm --cached <file>
    ```

  - 递归删除，即如果后面跟的是一个目录做为参数，则会递归删除整个目录中的所有子目录和文件：

    ```
    git rm –r * 
    ```

  

  ### 10. git mv

  * git mv 命令用于移动或重命名一个文件、目录、软连接。

    ```
    $ git mv README  README.md
    ```

  ​      (把文件README 重命名为 README.md)

  

  ### 11.

  * 创建目录：

    ```
    $ mkdir runoob
    ```

  * 打开目录：

    ```
    $ cd <directoryName>/
    ```

  * 添加文件：

    ```
    $ touch README
    $ touch hello.php
    ```

  * 列举目录下的文件：

    ```
    $ ls
    ```

  

  

  
  
  
  
  ### 基本概念：

  - **工作区**：就是你在电脑里能看到的目录。
- **暂存区**：英文叫stage, 或index。一般存放在 ".git目录下" 下的index文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
  - **版本库**：工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200130223232160.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
  图中：

  1. 左侧为工作区

  2. 右侧为版本库。其中标记为 "index" 的区域是暂存区（stage, index），标记为 "master" 的是 master 分支所代表的目录树。

  3. "HEAD" 实际是指向 master 分支的一个"游标"。所以图示的命令中出现 HEAD 的地方可以用 master 来替换。

  4.  objects 标识的区域为 Git 的对象库，实际位于 ".git/objects" 目录下，里面包含了创建的各种对象及内容。

     

  - 当对工作区修改（或新增）的文件执行 `git add`命令时，暂存区的目录树被更新，同时工作区修改（或新增）的文件内容被写入到对象库中的一个新的对象中，而该对象的ID被记录在暂存区的文件索引中。

  - 当执行提交操作`git commit`时，暂存区的目录树写到版本库（对象库）中，master 分支会做相应的更新。即 master 指向的目录树就是提交时暂存区的目录树。

  - 当执行 `git reset HEAD"`命令时，暂存区的目录树会被重写，被 master 分支指向的目录树所替换，但是工作区不受影响。
  
  - 当执行 `git rm --cached <file>` 命令时，会直接从暂存区删除文件，工作区则不做出改变。
  
  - 当执行 `git checkout .` 或者 `git checkout -- <file>"`命令时，会用暂存区全部或指定的文件替换工作区的文件。这个操作很危险，会清除工作区中未添加到暂存区的改动。
  
  - 当执行 `git checkout HEAD .` 或者 `git checkout HEAD <file>` 命令时，会用 HEAD 指向的 master 分支中的全部或者部分文件替换暂存区和以及工作区中的文件。这个命令也是极具危险性的，因为不但会清除工作区中未提交的改动，也会清除暂存区中未提交的改动。