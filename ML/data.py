import numpy as np 
import random

DATA_POINTS = 10000

data_x = []
data_y = []

## Data based on 18 joint mapping 

# Template being used: 

# template_x = np.array([7,7,0,4,11,14,7,4,5,8,10,8,6,7,7,2,12,7])

# template_y = np.array([12,8,9,7,7,8,4,0,2,2,0,9,9,10,6,8,8,14])


for i in range(DATA_POINTS):
    dataPoint = np.array([7 + random.uniform(0,1),7 + random.uniform(0,1),0 + random.uniform(0,1),4 + random.uniform(0,1),11 + random.uniform(0,1),14 + random.uniform(0,1),7+ random.uniform(0,1),4+ random.uniform(0,1),5+ random.uniform(0,1),8+ random.uniform(0,1),10+ random.uniform(0,1),8+ random.uniform(0,1),6+ random.uniform(0,1),7+ random.uniform(0,1),7+ random.uniform(0,1),2+ random.uniform(0,1),12+ random.uniform(0,1),7+ random.uniform(0,1)])
    data_x.append(dataPoint)

for i in range(DATA_POINTS):
    dataPoint = np.array([12 + random.uniform(0,1),8 + random.uniform(0,1),9 + random.uniform(0,1),7 + random.uniform(0,1),7 + random.uniform(0,1),8 + random.uniform(0,1),4 + random.uniform(0,1),0 + random.uniform(0,1),2 + random.uniform(0,1),2 + random.uniform(0,1),0 + random.uniform(0,1),9 + random.uniform(0,1),9 + random.uniform(0,1),10 + random.uniform(0,1),6 + random.uniform(0,1),8 + random.uniform(0,1),8 + random.uniform(0,1),14 + random.uniform(0,1)])
    data_y.append(dataPoint)

badDataPoint_x = []
badDataPoint_y = []

badDataPoint_x.append(np.array([7 + random.uniform(0,3),7 + random.uniform(0,3),0 + random.uniform(0,3),4 + random.uniform(0,3),11 + random.uniform(0,3),14 + random.uniform(0,3),7+ random.uniform(0,3),4+ random.uniform(0,3),5+ random.uniform(0,3),8+ random.uniform(0,3),10+ random.uniform(0,3),8+ random.uniform(0,3),6+ random.uniform(0,3),7+ random.uniform(0,3),7+ random.uniform(0,3),2+ random.uniform(0,3),12+ random.uniform(0,3),7+ random.uniform(0,3)]))
badDataPoint_y.append(np.array([12 + random.uniform(0,3),8 + random.uniform(0,3),9 + random.uniform(0,3),7 + random.uniform(0,3),7 + random.uniform(0,3),8 + random.uniform(0,3),4 + random.uniform(0,3),0 + random.uniform(0,3),2 + random.uniform(0,3),2 + random.uniform(0,3),0 + random.uniform(0,3),9 + random.uniform(0,3),9 + random.uniform(0,3),10 + random.uniform(0,3),6 + random.uniform(0,3),8 + random.uniform(0,3),8 + random.uniform(0,3),14 + random.uniform(0,3)]))


data = data_x + data_y
data = np.asarray(data)


badDataPoint_x = np.asarray(badDataPoint_x)
badDataPoint_y = np.asarray(badDataPoint_y)



