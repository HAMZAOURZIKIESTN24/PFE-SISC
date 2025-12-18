# PFE-SISC

Full-stack project:
- frontend: React
- backend: Laravel

## Requirements
- Node.js + npm
- PHP + Composer
- MySQL (or your DB)

## Run backend (Laravel)
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

## Run frontend (React)
cd frontend
npm install
npm start
