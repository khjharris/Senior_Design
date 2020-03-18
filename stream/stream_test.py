#This is a simple test of the ability to python stream using the gopro api

from goprocam import GoProCamera, constants

goprocamera = GoProCamera.GoPro()

goprocamera.shoot_video(10)
