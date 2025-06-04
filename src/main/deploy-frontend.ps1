cd frontend
npm run build

Remove-Item -Recurse -Force ../MyProject/src/main/resources/static/*
Copy-Item -Recurse -Force build/* ../MyProject/src/main/resources/static/

Write-Host "✅ React build deployed to Spring Boot static folder."
