pipeline { 
        
        agent none
        stages {               
                
                stage('Docker build') {
                        agent any
                        steps { 
                                                                                          
                                // sh 'docker build -t backimg ./backend'
                                sh 'docker build -t frontimg ./frontend'
                                sh 'echo hello2'
                        }
                }
                stage('Docker run') {
                        agent any
                        steps {
                                sh 'docker ps -f name=front -q \
                                        | xargs --no-run-if-empty docker container stop'

                                // sh 'docker ps -f name=back -q \
                                //         | xargs --no-run-if-empty docker container stop'

                                sh 'docker container ls -a -f name=front -q \
                                        | xargs -r docker container rm'

                                // sh 'docker container ls -a -f name=back -q \
                                //         | xargs -r docker container rm'


                                sh 'docker run -d --name front -p 80:80 frontimg'
                                // sh 'docker run -d --name back -p 8080:8080 backimg'
                                sh 'echo hello3'
                        }
                }
        }

}
