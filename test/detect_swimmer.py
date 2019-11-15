#Adapted from Adrian Rosebrock on PyImage Search
#For use in smartSwim Boston University Senior Design 2020

from imutils.video import FileVideoStream
from imutils.video import FPS
import numpy as np
import argparse
import imutils
import time
import cv2


#Get command line arguments
ap = argparse.ArgumentParser()

ap.add_argument("-p","--prototext", required=True, help="path to Caffe 'deploy' prototext file")
ap.add_argument("-m","--model", required=True, help="path to Caffe pretrained model")
ap.add_argument("-c","--confidence", type=float, default=0.2, help="confidence value")
ap.add_argument("-v","--video", required=True, help="path to video")
args = vars(ap.parse_args())

#Set the swim class descriptor and give a color
CLASSES = ["person"]
COLORS	= np.random.uniform(0,255, size=(len(CLASSES),3))

#Load the Trained Model
print("Loading trained model...")
net = cv2.dnn.readNetFromCaffe(args["prototext"],args["model"])

#Load video from filesystem
print("Loading video from filesystem [" + args["video"] +"]...")
vs = FileVideoStream(args["video"]).start()
time.sleep(4.0)
fps = FPS().start()

while vs.more():
	#Take a frame and resize
	frame = vs.read()
	frame = imutils.resize(frame,width=400)

	#Convert to blob
	(h,w) = frame.shape[:2]
	blob = cv2.dnn.blobFromImage(cv2.resize(frame,(300,300)),0.007843, (300,300), 127.5)


	#Send blob to the nn
	net.setInput(blob)
	detections = net.forward()

	#Encase all detections over confidence value
	for i in np.arange(0, detections.shape[2]):
		#Get the associated confidence value
		confidence = detections[0, 0, i, 2]
		
		if confidence > args["confidence"]:
			#Grab class label (will always be swimmer if detected)
			idx = int(detections[0, 0, i, 1])
			box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
			(startX, startY, endX, endY) = box.astype("int")
			
			#Draw box around detected object
			label = "{}: {:2f}%".format("swimmer", confidence * 100)
			cv2.rectangle(frame, (startX, startY), (endX, endY), colors[idx], 2)

			#Put label above the box if there's space
			y = startY -15 if startY - 15 < 15 else startY + 15
			cv2.putText(frame, label, (startX, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, COLORS[idx], 2)

	#Output the frame
	cv2.imshow("Frame", frame)
	key = cv2.waitKey(1) & 0xFF
	
	if key == ord("q"):
		break
	
	fps.update()

fps.stop()
print("Elapsed time: {:.2f}".format(fps.elapsed()))
print("Approximate FPS: {:.2f}".format(fps.fps()))

cv2.destroyAllWindows()
vs.stop()
			
