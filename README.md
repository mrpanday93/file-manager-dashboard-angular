
# File/CSV Manager Overview

The File/CSV Manager is a web application designed for managing file uploads and CSV data. The frontend is built with Angular, leveraging Angular Material for the user interface, while the backend is powered by Symfony and MySQL.

## Frontend (Angular)

### Project Structure

- **Root Directory**:
  - **Dockerfile**: For dockerization.
  - **src Folder**: Contains the main application code.

- **src/app Folder**:
  - **Modules**:
    - **Login-Register Module**: Handles authentication and authorization.
    - **Admin Module**: Provides a dashboard for uploading and viewing CSV files.
  - **Guards**:
    - **Route Guards**: Prevent unauthorized access.
      - **For logged-in users**.
      - **For logged-out users**.
  - **Interceptors**:
    - **Request Interceptors**:
      - Attach authorization headers to every request.
      - Intercept errors to handle unauthorized access or expired tokens by logging out the user.
  - **Services**:
    - **Authentication Service**: Manages user login and registration.
    - **File Service**: Handles file creation, reading, and updating.
  - **Shared Modules**:
    - **Shared Modules**: Common functionalities for login and registration.
    - **Admin Modules**: Common functionalities for the dashboard.

### How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/mrpanday93/file-manager-dashboard-angular
   ```
2. Navigate to the project directory and install dependencies:
   ```bash
   cd file-manager-dashboard-angular
   npm install
   ```
3. Ensure Angular CLI is installed and Node.js version 18+ is available.
4. Run the application:
   ```bash
   ng serve
   ```

### Testing

- Tests are available in the `services` and `register` component spec files.
- Run tests using:
  ```bash
  ng test
  ```

## Backend (Symfony)

### Setup

1. Install Symfony on your system.
2. Clone the repository:
   ```bash
   git clone https://github.com/mrpanday93/symfony-7-crud
   ```
3. Update the `.env` file with local variables.
4. Install dependencies:
   ```bash
   composer install
   ```
5. Generate JWT keys:
   ```bash
   mkdir -p config/jwt
   openssl genpkey -algorithm RSA -out config/jwt/private.pem -pkeyopt rsa_keygen_bits:2048
   openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
   ```
6. Create and migrate the database:
   ```bash
   php bin/console doctrine:database:create
   php bin/console make:migration
   php bin/console doctrine:migrations:migrate
   ```
7. Start the server:
   ```bash
   symfony serve:start
   ```

### Docker Setup

#### Angular

1. Build the Docker image:
   ```bash
   docker build . -t angular
   ```
2. Run the Docker container:
   ```bash
   docker run -p 4201:4200 angular
   ```

#### Symfony

1. Build and run the Docker container:
   ```bash
   docker-compose up --build -d
   ```
2. Execute migrations:
   ```bash
   docker-compose exec symfony_php php bin/console make:migration
   docker-compose exec symfony_php php bin/console doctrine:migrations:migrate
   ```
3. Generate JWT keys:
   ```bash
   docker-compose exec symfony_php mkdir -p config/jwt
   docker-compose exec symfony_php openssl genpkey -algorithm RSA -out config/jwt/private.pem -pkeyopt rsa_keygen_bits:4096
   docker-compose exec symfony_php openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
   ```

You can also access your Symfony PHP container through Docker Desktop or the command line:
```bash
docker exec -it symphony_php bash
```

## Backend API Endpoints

- **Authentication**:
  - POST `/api/login` - User login
  - POST `/api/register` - User registration

- **File Management**:
  - GET `/api/files` - List all files
  - POST `/api/files` - Upload a new file
  - GET `/api/files/{id}` - Retrieve a file
  - PUT `/api/files/{id}` - Update a file
