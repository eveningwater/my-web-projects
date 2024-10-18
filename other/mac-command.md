1. 将 vscode 的打开目录命令添加到全局终端配置中。

```shell
sudo ln -fs "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" /usr/local/bin/
```

这样的话，就可以在终端通过`code <目录名>`在 vscode 当中打开一个文件目录。

2. rm <文件名> / rm <目录名> 删除一个文件/目录。不过只能删除空目录。

3. open <目录名 / .>打开目录 / 当前目录。

4. clear 清除终端

5. ls 列出目录

6. echo 文件内容 <文件名> 如: echo . test.md,在当前目录下新建一个 md 文件，内容为.。

7. git branch -m <旧分支名> <新分支名> (修改分支名)
8. git clone -b <分支名> （克隆分支）


```shell
pnpm dlx pnpm@6 install
# pnpm 切换版本 v6
```
