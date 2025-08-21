# --- 第一阶段：构建静态文件 ---
# 使用一个官方的 Node.js 镜像作为构建环境
FROM node:20-alpine as builder

# 在容器内创建一个工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 以利用缓存
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制所有剩余的源代码
COPY . .

# 执行构建命令，生成静态文件到 /app/dist 目录
RUN npm run build

# --- 第二阶段：创建最终的生产镜像 ---
# 使用一个非常轻量的 Nginx 镜像作为基础
FROM nginx:stable-alpine

# 从 'builder' 阶段复制构建好的静态文件到 Nginx 的默认网站目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 新增这一行！复制我们自定义的 Nginx 配置文件
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# 声明容器将监听 80 端口
EXPOSE 80

# 容器启动时运行 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]
