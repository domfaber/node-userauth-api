pipeline {
  agent any 
  stages {
    stage('Build') {
      steps {
        sh 'echo “Hello World”'
        sh 'ls -lah'
      }
    }
    stage('Lint HTML') {
      steps {
        sh 'tidy -q -e *.html'
      }
    }
  }
}