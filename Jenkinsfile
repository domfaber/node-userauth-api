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

        sh 'docker-compose up -f docker-compose.yml --build -d mongodb'
        sh 'npm install'
        sh 'npm test'
      
    }

    stage('Build production image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */


        app = docker.build("granolahouse/userbackend")

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

        //configure registry
        docker.withRegistry('https://ID.ecr.eu-west-1.amazonaws.com', 'ecr:eu-west-1:86c8f5ec-1ce1-4e94-80c2-18e23bbd724a') {
          
            //build image
            def customImage = docker.build("granolahouse/userauth:${env.BUILD_ID}")
            
            //push image
            customImage.push()
        }
    }
}