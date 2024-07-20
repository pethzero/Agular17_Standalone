ลง Django 


มีฟังชั่นสำหรับ NODE.JS


# RUN
    ng serve
	
	
npm install sweetalert2 @sweetalert2/ngx-sweetalert2

# Example Code
1.Create Image
docker image build -t my-angular . // none version
or
docker image build -t my-angular:v1.0 . // version

2.Create Container

docker run -d --name pethzero-angular -p 4200:4200 my-angular // image-none-version 
or
docker run -d --name pethzero-angular -p 4200:4200 my-angular:v1.0 // version