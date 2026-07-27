# use the python image
FROM python:3.11-slim

# workinh directory auto
WORKDIR /app

# Copy of Requirements
COPY requirement.txt
    
# install it
RUN pip install --no-cache-dir -r requirement.txt

# all file's copy
COPY . .

# OPEN THE PORT
Expose 8000

# run the server
CMD ["gunicorn", "leave_management.wsgi:application", "--bind", "0.0.0.0:8000"]