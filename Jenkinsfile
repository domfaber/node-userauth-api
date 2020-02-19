pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        sh 'ls'
      }
    }
    stage('Build docker image') {
      steps {
        script {
          def customImage = docker.build("my-image:${env.BUILD_ID}")
        }
      }
    }
  }
}
