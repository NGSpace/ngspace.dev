#!/bin/bash

java -jar ngsweb.jar --spring.config.location=classpath:/,file:config/ngspace.dev.yml,file:config/server.yml
