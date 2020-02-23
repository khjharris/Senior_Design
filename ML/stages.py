import autoencoder
import parser
import pickle

STAGES = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5']


def trainStages():
    for stage in STAGES:
        with open("data/training/stages/stage%s" % stage, "rb") as file:
            stageFrames = pickle.load(file)
        autoencoder.train_autoencoder(stageFrames, stage)


def testUser(user_name):
    losses = []
    for stage in STAGES:
        with open("data/testing/users/%s_stage%s" % user_name, stage, "rb") as file:
            stageFrames = pickle.load(file)
        loss = autoencoder.getLoss(stageFrames, stage)

    return losses
