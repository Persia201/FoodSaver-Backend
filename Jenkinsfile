pipeline {
  agent any
  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/your-username/FoodSaver-Backend.git'
      }
    }
    stage('Build') {
      steps {
        sh 'docker build -t foodsaver-backend .'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker stop foodsaver || true && docker rm foodsaver || true'
        sh 'docker run -d --name foodsaver -p 5001:5001 foodsaver-backend'
      }
    }
  }
}
