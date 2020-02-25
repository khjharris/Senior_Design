from ibm_botocore.client import Config
import ibm_boto3
from goprocam import GoProCamera, constants
import time
import http.server
import socketserver
from http import HTTPStatus
import json
import string

#Initiate Camera connection
print("Initializing Camera...")
gpCam = GoProCamera.GoPro()
print("[X] Camera Initialized")

#Set up IBM cloud API
print("Authenticating with IBM Cloud...")
credentials = {
    'IBM_API_KEY_ID': 'wbUWkyJB3INLDQ9ZjQvEyx8c0_W4-7AvKb9t5_pw5C7-',
    'IAM_SERVICE_ID': 'crn:v1:bluemix:public:iam-identity::a/2815cd8060f147cd9fad07192d8c4678::serviceid:ServiceId-ea9d0756-4c30-47be-81e1-45c9ade2a1e0',
    #'ENDPOINT': 'https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints',
    #'IBM_AUTH_ENDPOINT': 'https://s3.us-east.cloud-object-storage.appdomain.cloud'
    'ENDPOINT': 'https://s3.us-east.cloud-object-storage.appdomain.cloud',
    'IBM_AUTH_ENDPOINT': 'https://iam.cloud.ibm.com/identity/token'
}

cos = ibm_boto3.client(service_name='s3',
    ibm_api_key_id=credentials['IBM_API_KEY_ID'],
    ibm_service_instance_id=credentials['IAM_SERVICE_ID'],
    ibm_auth_endpoint=credentials['IBM_AUTH_ENDPOINT'],
    config=Config(signature_version='oauth'),
    endpoint_url=credentials['ENDPOINT'])
print("[X] Authenticated with IBM Cloud")
numbers = ['0','1','2','3','4','5','6','7','8','9']

#Server Handler
print("Initializing Server...")
class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        #Grab post body
        content_len = int(self.headers.get('Content-Length'))
        post_body = self.rfile.read(content_len)
        post_body = str(post_body)
        print(post_body)

        #Get name and duration
        name_pos = post_body.find("name")
        print("Name Location " + str(name_pos))
        name = ""
        i = 0
        while True:
           if post_body[name_pos+i+6] in numbers:
              name = name + str(post_body[name_pos+i+6])
           else:
              break
           i+=1

        print("Filename: " + name)
        duration_pos = post_body.find("duration")
        duration = post_body[duration_pos+10] + post_body[duration_pos+11]
        print("Duration: " + duration)
        duration = int(duration)
        name = name + ".mp4"

        skip = False
        if name == '':
           self.send_response(500)
           self.end_headers()
           skip = True
        
        if skip == False:
           #Here we will initiate capture session
           gpCam.video_settings("720p","60")
           gpCam.gpControlSet(constants.Video.PROTUNE_VIDEO, constants.Video.ProTune.ON)
           print("Recording " + str(duration) + " Second Clip")
           gpCam.downloadLastMedia(gpCam.shoot_video(duration), custom_filename=name)

	   #upload file to ibm cloud
           cos.upload_file(Filename=name,Bucket='swim',Key=name)

           #Send response to server once upload is finished
           self.send_response(200)
           self.end_headers()

httpd = socketserver.TCPServer(('', 8080), Handler)
print("Server Initialized, waiting on PORT 8080")
print("")
httpd.serve_forever()
