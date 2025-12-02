# 目录结构说明

最外层是三方库的源码，examples是示例工程，引入了watermelondb三方库

# examples运行流程

1. 在 examples 目录下执行 `npm install --force`，安装依赖
2. 用 deveco 打开 examples/harmony，等待安装依赖
3. 在 examples 目录下执行 `npm run codegen`，生成桥接代码
4. 在 examples 目录下执行 `npm run dev`，打好bundle包
5. 在 deveco 运行工程，需要签好名

# 注意事项

- 工程尽量放在根目录，文件夹名称不要过长，比如 `E:wmdb`
