#!/bin/bash

NAME="pokemon-api"
USERNAME="jupsy"
IMAGE="$USERNAME/$NAME:latest"

echo "Building Docker image..."
docker build -t $IMAGE .

echo "Pushing image to Docker Hub..."
docker push $IMAGE

echo "Applying Kubernetes manifests..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# === Prometheus / Grafana ===

echo "Creating monitoring namespace..."
kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -

echo "Applying Prometheus config..."
kubectl apply -f monitoring/prometheus/prometheus-config.yaml

echo "Deploying Prometheus..."
kubectl apply -f monitoring/prometheus/prometheus-deployment.yaml
kubectl apply -f monitoring/prometheus/prometheus-service.yaml

echo "Deploying Grafana..."
kubectl apply -f monitoring/grafana/grafana-deployment.yaml
kubectl apply -f monitoring/grafana/grafana-service.yaml

echo "Waiting 10s for pods to start..."
sleep 10

echo "Getting monitoring pods..."
kubectl get pods -n monitoring

echo "Getting monitoring services..."
kubectl get svc -n monitoring

echo ""
echo "To access Grafana:"
echo "kubectl port-forward svc/grafana 3001:3000 -n monitoring"
echo "Then open: http://localhost:3001"
