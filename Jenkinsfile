node {
    def app
    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Test') {
        /* 
         * We launch a mongodb from docker image first to test our service
        */
        sh 'sudo docker-compose -f devops/local/docker-compose.yaml up --build -d mongodb'
        sh 'npm install'
        sh 'npm test'

      
    }

    stage('Build production image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */


        app = docker.build("granolahouse/userbackend", "-f dockerfiles/production/Dockerfile .")

        app.inside {
          sh 'npm test'
        }
    }

    

    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}