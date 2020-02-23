import csv
import pickle
import os


RIGHT_WRIST_JOINT = 4
LEFT_WRIST_JOINT = 7


#####  Description for stages ######
# Stage A1 is right wrist at local max, A2,3 are the frames before max and A4,5 are the frames after the max
# Stage B1 is left wrist at local max, B2,3 are the frames before max and B4,5 are the frames after the max


def parseRaw(file, user_name, mode):
    frames = getDataFromCSV(file)
    critical_frames = getStages(frames)
    saveStages(critical_frames, user_name, mode)


def saveStages(critical_frames, user_name, mode):
    for i, stageFrames in enumerate(critical_frames):
        if i == 0:
            if mode == train:
                f1 = open("data/training/stages/stageA1", "w")
            f2 = open("data/testing/users/%s_stageA1" % user_name, "w")
        elif i == 1:
            if mode == train:
                f1 = open("data/training/stages/stageA2", "w")
            f2 = open("data/testing/users/%s_stageA2" % user_name, "w")
        elif i == 2:
            if mode == train:
                f1 = open("data/training/stages/stageA3", "w")
            f2 = open("data/testing/users/%s_stageA3" % user_name, "w")
        elif i == 3:
            if mode == train:
                f1 = open("data/training/stages/stageA4", "w")
            f2 = open("data/testing/users/%s_stageA4" % user_name, "w")
        elif i == 4:
            if mode == train:
                f1 = open("data/training/stages/stageA5", "w")
            f2 = open("data/testing/users/%s_stageA5" % user_name, "w")
        elif i == 5:
            if mode == train:
                f1 = open("data/training/stages/stageB1", "w")
            f2 = open("data/testing/users/%s_stageB1" % user_name, "w")
        elif i == 6:
            if mode == train:
                f1 = open("data/training/stages/stageB2", "w")
            f2 = open("data/testing/users/%s_stageB2" % user_name, "w")
        elif i == 7:
            if mode == train:
                f1 = open("data/training/stages/stageB3", "w")
            f2 = open("data/testing/users/%s_stageB3" % user_name, "w")
        elif i == 8:
            if mode == train:
                f1 = open("data/training/stages/stageB4", "w")
            f2 = open("data/testing/users/%s_stageB4" % user_name, "w")
        elif i == 9:
            if mode == train:
                f1 = open("data/training/stages/stageB5", "w")
            f2 = open("data/testing/users/%s_stageB5" % user_name, "w")

        pickle.dump(stageFrames, f1)
        pickle.dump(stageFrames, f2)


def getStages(frames):

    stage_A1_frames = []
    stage_A2_frames = []
    stage_A3_frames = []
    stage_A4_frames = []
    stage_A5_frames = []

    stage_B1_frames = []
    stage_B2_frames = []
    stage_B3_frames = []
    stage_B4_frames = []
    stage_B5_frames = []

    for i, frame in enumerate(frames, start=1):

        abs_points = frame[0]
        image_id = frame[2]

        prev_frame = frames[i-1]
        next_frame = frames[i+1]

        # checking if right wrist is at local maximum

        if abs_points[RIGHT_WRIST_JOINT].Y > prev_frame[0][RIGHT_WRIST_JOINT]
        and abs_points[RIGHT_WRIST_JOINT].Y > next_frame[0][RIGHT_WRIST_JOINT]:
            stage_A1_frames.append((frame, image_id))
            stage_A2_frames.append((prev_frame, prev_frame[2]))
            stage_A3_frames.append((frames[i-2], frames[i-2][2])
            stage_A4_frames.append((next_frame), next_frame[2]))
            stage_A5_frames.append((frames[i+2]), frames[i+2][2]))

        # checking if left wrist is at local maximum

        if abs_points[LEFT_WRIST_JOINT].Y > prev_frame[0][LEFT_WRIST_JOINT]
        and abs_points[LEFT_WRIST_JOINT].Y > next_frame[0][LEFT_WRIST_JOINT]:
            stage_B1_frames.append((frame, image_id))
            stage_B2_frames.append((prev_frame, prev_frame[2]))
            stage_B3_frames.append((frames[i-2], frames[i-2][2])
            stage_B4_frames.append((next_frame), next_frame[2]))
            stage_B5_frames.append((frames[i+2]), frames[i+2][2]))

    critical_frames=stage_A1_frames + stage_A2_frames +
        stage_A3_frames + stage_A4_frames + stage_A5_frames
     + stage_B1_frames + stage_B2_frames +
         stage_B3_frames + stage_B4_frames + stage_B5_frames

     return critical_frames


def getDataFromCSV(file):
    with open(file) as csv_file:
    csv_reader=csv.reader(csv_file, delimiter=',')

    frames=[]

    for i, row in enumerate(csv_reader):
        if i == 0:
            continue
        frame=[]

        frame.append(row[0])
        frame.append(row[1])
        frame.append(row[2])

        frames.append[frame]

    return frames
