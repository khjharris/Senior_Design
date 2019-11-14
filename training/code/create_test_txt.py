#Builds Test.txt for Caffe Model
#Modified from Source proivded by Trung Tran @ chunml.github.io
#Use for smartSwim Boston University Senior Design 2019/2020

import numpy as np
import os

#Setup Directories
CURRENT_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.abspath(os.path.join(CURRENT_DIR,'../photos/'))
TXT_DIR  = os.path.abspath(os.path.join(CURRENT_DIR,'../'))

#Create list of swimming images
swimming_images = [image for image in os.listdir(DATA_DIR)]

#Partition Training and Test data
swimming_train = swimming_images[:int(len(swimming_images)*0.7)]
swimming_test  = swimming_images[int(len(swimming_images)*0.7):]

with open('{}/train.txt'.format(TXT_DIR),'w') as f:
	for image in swimming_train:
		f.write('{} 0\n'.format(image))

with open('{}/test.txt'.format(TXT_DIR),'w') as f:
	for image in swimming_test:
		f.write('{} 0\n'.format(image))

