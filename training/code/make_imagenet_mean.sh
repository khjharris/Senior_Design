#!/usr/bin/env sh
# Compute the mean image from the imagenet training lmdb
# N.B. this is available in data/ilsvrc12

EXAMPLE=../
DATA=../
TOOLS=../bin

$TOOLS/compute_image_mean $EXAMPLE/swim_train_lmdb \
  $DATA/swim_mean.binaryproto

echo "Done."
