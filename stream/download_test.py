#This is a simple test to capture and download a video from the gopro

from goprocam import GoProCamera, constants
import time
gpCam = GoProCamera.GoPro()

gpCam.video_settings("1080p","60")
gpCam.gpControlSet(constants.Video.PROTUNE_VIDEO, constants.Video.ProTune.ON)
print("Recording Ten Second clip")
gpCam.downloadLastMedia(gpCam.shoot_video(10), custom_filename="TestStream.MP4")
