[# Introduction
This Spring Boot project integrates Redis Cache, MySQL, AWS SNS, and AWS SES to demonstrate how to use these services together in a Java web application. Redis Cache is used for caching data, MySQL is used for storing persistent data, AWS SNS is used for sending push notifications, and AWS SES is used for sending emails.
# Prerequisites
- IntelliJ IDEA
- Java 11 or higher
- Maven 3.6 or higher
- Redis server installed and running on your local machine or in the cloud
- MySQL server installed and running on your local machine or in the cloud
- AWS account with access to SNS and SES services
# Checking out and building
To check out the project and build it from source, do the following:
```sh 
git clone https://github.com/vaibhavmasaye/Ecommerce_Project.git
cd Ecommerce_Project
./mvnw package
```
##### Open this project in IntelliJ IDEA
To build and install jars into your local Maven cache:
```sh 
./mvnw install
```

#### For faster builds, we recommend using Maven Daemon and using following commands:
Build:
```sh 
make build
```
Clean:
```sh 
make clean
```
Format code:
```sh 
make format
```
# Redis Cache
This project uses Redis cache to improve performance and reduce load on the MySQL database. The Spring Data Redis module is used to implement Redis cache functionality. The RedisCacheManager is configured to manage the cache and the @Cacheable annotation is used to mark methods that should be cached.

# AWS SNS
This project uses AWS SNS to send notifications to subscribed endpoints. The AWS SDK for Java is used to interact with the SNS service. The AmazonSNS client is configured in the SNSConfig class.

# AWS SES
This project uses AWS SES to send emails. The AWS SDK for Java is used to interact with the SES service. The AmazonSimpleEmailService client is configured in the SESConfig class.

#### Run to build the project and download the required dependencies.
```sh 
mvn clean install 
```
## Usage

Run start the application.
```sh
mvn spring-boot:run
```

## Endpoints
```sh
- POST GET PUT DELETE 
/api/product - Starting Point For Product .
```
```sh
- POST GET PUT DELETE 
/api/users - Starting Point For Product .
```

### E-commerce API Documentation

```sh
https://documenter.getpostman.com/view/26447359/2s93RNwtbK
```

](https://github.com/Prachi3649/E-commers-Project.git)https://github.com/Prachi3649/E-commers-Project.git
