# Code is developed for Swim Team 8 Boston University Senior Design 2019
# 
# Sources Listed Below
# https://www.pyimagesearch.com/2017/08/21/deep-learning-with-opencv/

import numpy as np
import argparse
import cv2 
import time

#Capture file, and determine the swimmer output the final image

#Takes different arguments for the argument parser
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True, help="path to input image")
ap.add_argument("-p", "--prototxt", required=True, help="path to Caffe 'deploy' prototxt file")
ap.add_argument("-m", "--model", required=True, help="path to Caffe pre-trained model")
ap.add_argument("-l", "--labels", required=True, help="path to ImageNet labels (i.e., syn-sets)")
args = vars(ap.parse_args())


#Grab the training image
