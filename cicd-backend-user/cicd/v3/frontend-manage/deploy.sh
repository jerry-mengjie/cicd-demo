echo "开始部署"
docker rm -f frontend-manage
docker rmi localhost:8082/frontend-manage
docker-compose -f /Users/jerry/Code/cicd-demo/cicd-backend-user/cicd/v3/frontend-manage/docker-compose.yml down
docker-compose -f /Users/jerry/Code/cicd-demo/cicd-backend-user/cicd/v3/frontend-manage/docker-compose.yml up -d
echo "启动成功！"