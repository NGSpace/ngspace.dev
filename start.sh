#!/bin/bash

java -jar ngsweb.jar --spring.config.location=classpath:/,file:config/ngsweb.yml,file:config/server.yml
