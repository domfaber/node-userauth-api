pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        sh 'echo “We should run tests first”'
      }
    }
    stage('Build docker image') {
      steps {
        sh 'sudo docker build -t userbackend'
        sh 'sudo docker images ls'
      }
    }
  }
}
