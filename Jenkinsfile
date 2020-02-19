pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        sh 'ls'
      }
    }
    stage('Build docker image') {
      node {
        checkout scm

        def customImage = docker.build("my-image:${env.BUILD_ID}")

        customImage.inside {
          sh 'ls'
        }
      }
    }
  }
}
