# Use a base image with Python pre-installed
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the Django project code to the container
COPY . .

# Set environment variables
ENV DJANGO_SETTINGS_MODULE=SC_Assignment2.settings

# Run the collectstatic command
RUN python manage.py collectstatic --noinput

# Expose the port your Django app will run on
EXPOSE 8000

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]