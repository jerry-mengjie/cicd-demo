# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:alpine
# 设置工作目录
WORKDIR /app
# 复制
COPY ./dist .

# 创建 nginx 配置文件
RUN echo "server { \
    listen 80; \
    server_name localhost; \
    root /app; \
    location / { \
        try_files \$uri /index.html; \
    } \  
    # 所有 html 始终走最新，避免浏览器/代理缓存
    location ~* \.html$ { \
        add_header Cache-Control \"no-cache, must-revalidate, max-age=0\" always; \
        add_header Pragma \"no-cache\" always; \
        add_header Expires \"0\" always; \
    } \
    # 静态资源缓存 1 年（建议文件名带 hash）
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ { \
        expires 1y; \
        add_header Cache-Control \"public, max-age=31536000, immutable\" always; \
    } \
    # 设置错误页面为 index.html（如果路由不存在）
    error_page 404 /index.html; \
    gzip on; \
    gzip_types text/plain application/javascript application/x-javascript text/javascript text/css application/json application/xml text/xml application/xml+rss font/woff2; \
    gzip_min_length 1000; \
}" > /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动命令
CMD ["nginx", "-g", "daemon off;"]