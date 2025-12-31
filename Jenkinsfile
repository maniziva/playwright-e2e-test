pipeline {
    agent any

    tools {
        nodejs 'Node25'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                  rm -rf allure-results
                  npx playwright test -c playwright.web.config.ts --grep "Dec-19"
                '''
            }
        }
    }

    post {
        always {
            allure([
              includeProperties: false,
              jdk: '',
              results: [[path: 'allure-results']]
            ])
        }
    }
}