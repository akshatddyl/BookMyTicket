# Distributed Event Ticketing Platform

A cloud-native microservices platform for handling high-demand event ticket sales with distributed seat locking, event-driven communication, and scalable backend architecture.

## Repository Architecture Overview
- `/services`: Core business logic microservices.
- `/gateway`: Spring Cloud Gateway API routing and security.
- `/shared`: Common utilities, exceptions, and global event contracts.
- `/infrastructure`: Configuration and Docker/Kubernetes orchestration environments.
- `/frontend`: React 19 operational and customer facing portal.
