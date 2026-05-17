# 🚀 Scalable Web App Infrastructure

> Production-grade, containerized infrastructure built to handle real-world scaling, reliability, monitoring, and deployment challenges.

<p align="center">
  <img src="https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge&logo=docker" />
  <img src="https://img.shields.io/badge/Nginx-Load%20Balancer-green?style=for-the-badge&logo=nginx" />
  <img src="https://img.shields.io/badge/Node.js-Backend-brightgreen?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/Prometheus-Monitoring-orange?style=for-the-badge&logo=prometheus" />
  <img src="https://img.shields.io/badge/Grafana-Dashboards-F46800?style=for-the-badge&logo=grafana" />
  <img src="https://img.shields.io/badge/GitHub_Actions-CI/CD-black?style=for-the-badge&logo=githubactions" />
</p>

---

# 📚 Table of Contents

* [Overview](#-overview)
* [The Problem This Solves](#-the-problem-this-solves)
* [System Architecture](#-system-architecture)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Features](#-features)
* [Infrastructure Highlights](#-infrastructure-highlights)
* [Getting Started](#-getting-started)
* [Environment Variables](#-environment-variables)
* [Running the Stack](#-running-the-stack)
* [Load Testing with Apache JMeter](#-load-testing-with-apache-jmeter)
* [Observability & Monitoring](#-observability--monitoring)
* [Fault Tolerance Testing](#-fault-tolerance-testing)
* [CI/CD Pipeline](#-cicd-pipeline)
* [Learning Outcomes](#-learning-outcomes)
* [Security Practices](#-security-practices)
* [Scaling Roadmap](#-scaling-roadmap)
* [Key Engineering Insight](#-key-engineering-insight)
* [License](#-license)

---

# 🌍 Overview

Modern applications fail for predictable reasons:

* Single servers become bottlenecks
* No monitoring means outages go unnoticed
* Manual deployments introduce production bugs
* Environment drift causes “works on my machine” problems
* Lack of redundancy creates downtime

This project solves those issues with a production-style infrastructure stack using:

* Docker containers
* Nginx load balancing
* Redundant Node.js application instances
* PostgreSQL persistence
* Prometheus metrics collection
* Grafana visualization
* GitHub Actions CI/CD automation
* Health checks and self-healing containers

The result is a scalable infrastructure platform designed to be:

✅ Reliable
✅ Observable
✅ Fault tolerant
✅ Reproducible
✅ Production-ready

---

# ❌ The Problem This Solves

| Problem                           | Real Impact                             | Solution Implemented      |
| --------------------------------- | --------------------------------------- | ------------------------- |
| Single server handles all traffic | Traffic spikes crash the app            | Nginx load balancing      |
| No observability                  | Users report outages first              | Prometheus + Grafana      |
| Manual deployments                | Human deployment mistakes               | GitHub Actions CI/CD      |
| No health checks                  | Broken containers still receive traffic | Docker health checks      |
| No redundancy                     | One crash = full downtime               | Multiple app instances    |
| Environment inconsistencies       | Works locally but breaks in prod        | Dockerized infrastructure |
| No recovery automation            | Manual restarts required                | Auto-restart policies     |

---

# 🏗️ System Architecture

```text
                     ┌──────────────────────────────────┐
                     │         GitHub Actions            │
                     │   Test → Build → Push → Deploy   │
                     └────────────────┬─────────────────┘
                                      │
                                      ▼
┌─────────┐   HTTP    ┌──────────────────────────────┐
│  Users  │ ────────► │      Nginx Load Balancer      │
└─────────┘           │    (Least Connections)        │
                      └───────┬──────────┬────────────┘
                              │          │
                  ┌───────────▼──┐   ┌───▼───────────┐
                  │  App Server 1│   │  App Server 2  │
                  │  (Node.js)   │   │  (Node.js)     │
                  │  Healthy ✓   │   │  Healthy ✓     │
                  └──────┬───────┘   └──────┬─────────┘
                         │                  │
                  ┌──────▼──────────────────▼──────┐
                  │         PostgreSQL DB           │
                  │    Persistent Docker Volume     │
                  └──────────────┬──────────────────┘
                                 │
                  ┌──────────────▼──────────────────┐
                  │     Prometheus + Grafana         │
                  │ Metrics · Dashboards · Alerts    │
                  └──────────────────────────────────┘
```

---

# ⚙️ Tech Stack

| Technology            | Purpose                       |
| --------------------- | ----------------------------- |
| **Docker**            | Containerization              |
| **Docker Compose**    | Multi-container orchestration |
| **Nginx**             | Reverse proxy + load balancer |
| **Node.js + Express** | Backend application           |
| **PostgreSQL**        | Relational database           |
| **Prometheus**        | Metrics collection            |
| **Grafana**           | Dashboard visualization       |
| **GitHub Actions**    | CI/CD automation              |
| **Apache JMeter**     | Load testing                  |

---

# 📁 Project Structure

```bash
scalable-web-app-infrastructure/
│
├── app/
│   ├── src/
│   │   ├── index.js
│   │   ├── db.js
│   │   └── routes/
│   │       ├── api.js
│   │       └── health.js
│   │
│   ├── Dockerfile
│   └── package.json
│
├── nginx/
│   ├── nginx.conf
│   └── Dockerfile
│
├── monitoring/
│   ├── prometheus.yml
│   └── grafana/
│       └── dashboards/
│           └── app.json
│
├── db/
│   └── init.sql
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
├── .gitignore
└── README.md
```

---

# ✨ Features

## ✅ High Availability

* Multiple Node.js application instances
* Nginx load balancing
* Automatic failover routing
* Health-aware traffic distribution

---

## ✅ Containerized Infrastructure

* Identical environments across:

  * Development
  * Testing
  * Production

No more:

```bash
"It works on my machine."
```

---

## ✅ Observability Stack

Integrated monitoring system with:

* Prometheus metrics scraping
* Grafana dashboards
* Request rate tracking
* Memory usage monitoring
* Response latency visualization
* Container health metrics

---

## ✅ Self-Healing Services

Docker automatically:

* Detects unhealthy containers
* Restarts failed services
* Maintains infrastructure uptime

---

## ✅ Automated CI/CD

Every push triggers:

```bash
Lint → Test → Build → Push → Deploy
```

No manual deployments required.

---

# 🔥 Infrastructure Highlights

## Nginx Load Balancing

Uses the **Least Connections** algorithm:

```nginx
upstream backend {
    least_conn;
    server app1:3000;
    server app2:3000;
}
```

Benefits:

* Prevents overloaded servers
* Distributes traffic evenly
* Improves response time

---

## Health Checks

### Liveness Probe

```bash
/health
```

Checks if the process is alive.

### Readiness Probe

```bash
/ready
```

Checks if:

* Application is ready
* Database connectivity exists
* App can safely receive traffic

---

## Persistent PostgreSQL Storage

Uses Docker volumes to preserve database data between container restarts.

---

# 🚀 Getting Started

## Prerequisites

```bash
docker --version
docker compose version
git --version
```

Install Docker:

```bash
https://docs.docker.com/get-docker/
```

---

# 🔐 Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Example:

```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=strongpassword
POSTGRES_DB=appdb

GRAFANA_USER=admin
GRAFANA_PASSWORD=admin
```

---

# ▶️ Running the Stack

## Clone Repository

```bash
git clone https://github.com/yourusername/scalable-web-app-infrastructure.git

cd scalable-web-app-infrastructure
```

---

## Build & Start Containers

```bash
docker compose up --build -d
```

Starts:

* nginx
* app1
* app2
* postgres
* prometheus
* grafana

---

## Verify Containers

```bash
docker compose ps
```

---

# 🧪 Test API Endpoints

## Health Endpoint

```bash
curl http://localhost/health
```

Response:

```json
{
  "status": "ok"
}
```

---

## Readiness Endpoint

```bash
curl http://localhost/ready
```

Response:

```json
{
  "status": "ready",
  "db": "connected"
}
```

---

## API Endpoint

```bash
curl http://localhost/api/items
```

---

# 📊 Observability & Monitoring

| Service     | URL                                            |
| ----------- | ---------------------------------------------- |
| Application | [http://localhost](http://localhost)           |
| Grafana     | [http://localhost:3000](http://localhost:3000) |
| Prometheus  | [http://localhost:9090](http://localhost:9090) |

Default Grafana credentials:

```bash
admin / admin
```

---

# 📈 Load Testing with Apache JMeter

## Install JMeter

Download:

```bash
https://jmeter.apache.org/download_jmeter.cgi
```

---

## Run JMeter

### Linux / WSL

```bash
./bin/jmeter.sh
```

### Windows

```bash
bin\jmeter.bat
```

---

## Configure Load Test

### Thread Group

```text
Threads: 200
Ramp-Up: 30 seconds
Loop Count: 10
```

### HTTP Request

```text
Server: localhost
Port: 80
Path: /api/items
```

---

## What This Validates

✅ Load balancing works
✅ Infrastructure survives traffic spikes
✅ Prometheus captures metrics correctly
✅ Grafana visualizes traffic in real time
✅ Redundant app instances function properly

---

# 🛡️ Fault Tolerance Testing

Kill one application container during traffic:

```bash
docker compose stop app1
```

Verify the application still responds:

```bash
curl http://localhost/api/items
```

Restart container:

```bash
docker compose start app1
```

This demonstrates:

* Redundancy
* Automatic traffic rerouting
* High availability behavior

---

# 🔄 CI/CD Pipeline

GitHub Actions workflow:

```yaml
1. Run tests
2. Build Docker image
3. Push image
4. Deploy to server
```

Trigger deployment:

```bash
git add .
git commit -m "feat: update api"
git push origin main
```

---

# 🎓 Learning Outcomes

This project teaches practical DevOps and infrastructure engineering concepts:

| Concept         | Skills Learned                 |
| --------------- | ------------------------------ |
| Docker          | Containerization & isolation   |
| Nginx           | Reverse proxy & load balancing |
| Prometheus      | Metrics & observability        |
| Grafana         | Dashboard visualization        |
| PostgreSQL      | Persistent database management |
| CI/CD           | Deployment automation          |
| Health Checks   | Self-healing infrastructure    |
| Fault Tolerance | High availability architecture |

---

# 🔐 Security Practices

## Implemented

* Non-root Docker containers
* Environment variable secrets
* Network isolation
* Health validation
* Container restart policies

## Recommended Next Steps

* HTTPS with Let's Encrypt
* Secret managers
* Vulnerability scanning
* Rate limiting
* WAF integration

---

# 📈 Scaling Roadmap

Future improvements:

* Redis caching layer
* Kubernetes orchestration
* Terraform infrastructure provisioning
* Blue/Green deployments
* Auto-scaling clusters
* Grafana alerting integrations
* Distributed tracing
* Centralized logging

---

# 💡 Key Engineering Insight

> The `/health` endpoint is one of the most important lines of infrastructure code in any production system.

Without reliable health checks:

* Load balancers route traffic to dead services
* Monitoring becomes unreliable
* Auto-scaling breaks
* Deployments become dangerous

Infrastructure reliability starts with health visibility.

---

# 📜 License

This project is licensed under the MIT License.

```text
MIT License © 2026
```

---

# 🙌 Final Note

This infrastructure was designed to be:

* Broken intentionally
* Stress tested heavily
* Observed under load
* Understood deeply

Not just deployed.

---

<p align="center">
  <b>Built for real-world scalability, reliability, and engineering learning.</b>
</p>

