git branch <分支名>
创建一个分支
git checkout -b <分支名>
新建一个分支
ls
git push --set-upstream origin <分支名>
提交分支

git clone <仓库名> mail2

code <项目目录名> -> 在 vscode 中打开项目目录

# 运行时依赖

依赖于宿主环境的依赖，安装在dependencies下，例如:Vue,Vue-router,React...（如宿主环境为浏览器时，这些为运行时依赖）。

# 非运行时依赖

宿主环境不需要的依赖，安装在devDependencies下，例如:webpack,vite,webpack-cli,eslint,tslint...(如宿主环境为浏览器时，这些为非运行时依赖)。


## API数据类型规范

* 列表接口:Get + <Page | All | Tree> + <模块名:如联系人列表就是Contacts> (分页 | 未分页 | 树形)

eg: GetPageContacts //获取带分页的联系人列表
eg: GetAllContacts //获取所有联系人列表
eg: GetTreeContacts //获取树形联系人列表

* 添加接口: Add + <模块名: 如联系人就是Contact>

eg: AddContact //创建联系人

* 修改接口: Update + <模块名: 如联系人就是Contact>

eg: UpdateContact //修改联系人

* 添加/修改接口: Save + <模块名: 如联系人就是Contact>

eg: SaveContact //既可以是添加联系人又可以是修改联系人,区别就是是否传了联系人id

* 删除接口: Remove + <模块名: 如联系人就是Contact> 

eg: RemoveContact //删除联系人

* 导入接口: Import + <模块名: 如联系人就是Contact>

eg: ImportContact //导入联系人

* 导出接口: Export + <模块名: 如联系人就是Contact>

eg: ExportContact //导出联系人

* 上传接口: Upload + <模块名: 如联系人就是Contact>

eg: UploadContact //上传联系人

* 所有的批量接口需带前缀: Batch

eg: BatchRemoveContact //批量删除联系人

> 特别说明:验证码与登录相关接口随意，但也尽量语义化

## 所有接口参数类型定义:

Params

eg: Params //传参

