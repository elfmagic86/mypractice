
# Use an official Python runtime as a base image
From python:2.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app
#ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements
#RUN pip install -r requirements.txt

# Make port 80 available to the world outside this container
# 이렇게, 내4000을 도커의 80으로 연결. docker run -p 4000:80 friendlyhello
EXPOSE 80

# Define environment variable
ENV NAME Hiiiiiii
#ENV NAME World

# Run app.py when the container launches
#CMD [
	#"python",
	#"app.py" 
#]	
CMD ["python", "app.py"]

