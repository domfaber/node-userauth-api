node {
    def app
    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Test') {
        /* Ideally, we would run a test framework against our image.
         * For this example, we're using a Volkswagen-type approach ;-) */
        //appTest = docker.build("granolahouse/userbackend", "-f dockerfiles/production/Dockerfile .")

        sh 'sudo apt install npn'
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