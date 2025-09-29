pipeline {
    agent any

    environment {
        DOCKER_IMAGE   = "todo-frontend"
        DOCKERHUB_REPO = "adkurnwn/todo-frontend"
        BUILD_TAG      = "build-${env.BUILD_NUMBER}"  // unique per Jenkins build
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/kurww/Nuxt-ToDo.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('sonarqube') {
                        sh '''
                            npx sonar-scanner \
                              -Dsonar.projectKey=todo-frontend \
                              -Dsonar.sources=. \
                              -Dsonar.host.url=$SONAR_HOST_URL \
                              -Dsonar.login=$SONAR_TOKEN
                        '''
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t $DOCKER_IMAGE:latest -t $DOCKER_IMAGE:$BUILD_TAG .
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        
                        docker tag $DOCKER_IMAGE:$BUILD_TAG $DOCKERHUB_REPO:$BUILD_TAG

                        docker push $DOCKERHUB_REPO:$BUILD_TAG
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
    }
}
