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

        sh 'npm install'
        sh 'npm test'
      
    }

    stage('Build production image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
        app = docker.build("granolahouse/userauth")
    }

    

    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        
        /*docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }*/

        //configure registry
        docker.withRegistry('https://394549218635.ecr.eu-west-1.amazonaws.com', 'aws-cli-admin') {
          
            //build image
            def customImage = docker.build("granolahouse/userauth:${env.BUILD_ID}")
            
            //push image
            customImage.push()
        }
    }
}