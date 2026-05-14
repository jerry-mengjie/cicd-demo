#!/bin/bash
time=$(date "+%Y%m%d%H%M%S")
npm install --registry=https://registry.npm.taobao.org
npm run build
docker build -t localhost:8082/cicd-backend-news:$time .
docker login -u $DOCKER_LOGIN_USERNAME -p $DOCKER_LOGIN_PASSWORD localhost:8082
docker push localhost:8082/cicd-backend-news:$time
kubectl --kubeconfig=k8s-config.yaml set image deployment/cicd-backend-news cicd-backend-news=localhost:8082/cicd-backend-news:$time