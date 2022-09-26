pipeline { 
        
        agent none
        stages {
                stage('Create .env') {
                        agent any
                        steps { 
                                
                                // sh 'echo "REACT_APP_KAKAO_REST_API_KEY=${REACT_APP_KAKAO_REST_API_KEY}\nREACT_APP_KAKAO_REDIRECT_URI=${REACT_APP_KAKAO_REDIRECT_URI}\nREACT_APP_GOOGLE_CLIENT_ID=${REACT_APP_GOOGLE_CLIENT_ID}\nREACT_APP_GOOGLE_REDIRECT_URI=${REACT_APP_GOOGLE_REDIRECT_URI}\nREACT_APP_FB_API_KEY=${REACT_APP_FB_API_KEY}\nREACT_APP_FB_AUTH_DOMAIN=${REACT_APP_FB_AUTH_DOMAIN}\nREACT_APP_FB_PROJECT_ID=${REACT_APP_FB_PROJECT_ID}\nREACT_APP_FB_STORAGE_BUCKET=${REACT_APP_FB_STORAGE_BUCKET}\nREACT_APP_FB_MESSAGE_ID=${REACT_APP_FB_MESSAGE_ID}\nREACT_APP_FB_APP_ID=${REACT_APP_FB_APP_ID}\n" > .env'
                                sh 'rm -r backend/.config_secrets'
                                sh 'mkdir backend/.config_secrets' 
                                
                                sh 'rm secrets.json'
                                sh 'echo "${secrets_json}" > secrets.json'
                                sh 'cat secrets.json'
                                sh 'ls -al'
                                sh 'cp secrets.json backend/.config_secrets'
                                
                                sh 'rm settings_common.json'
                                sh 'echo "${settings_common}" > settings_common.json'
                                sh 'cat settings_common.json'
                                sh 'ls -al'
                                sh 'cp settings_common.json backend/.config_secrets'
                                // sh 'cp -r /home/ubuntu/docker-volume backend'
                                
                        }
                }
                
                stage('Docker build') {
                        agent any
                        steps {                                                                                  
                                sh 'docker build -t backimg ./backend'
                                sh 'docker build -t frontimg ./frontend/music-diary'
                                sh 'echo hello2'
                        }
                }
                stage('Docker run') {
                        agent any
                        steps {
                                sh 'docker ps -f name=front -q \
                                        | xargs --no-run-if-empty docker container stop'

                                sh 'docker ps -f name=back -q \
                                        | xargs --no-run-if-empty docker container stop'

                                sh 'docker container ls -a -f name=front -q \
                                        | xargs -r docker container rm'

                                sh 'docker container ls -a -f name=back -q \
                                        | xargs -r docker container rm'


                                sh 'docker run -d --name front -p 80:80 frontimg'
                                sh 'docker run -d --name back -p 8080:8080 backimg'
                                sh 'echo hello3'
                        }
                }
        }

}
