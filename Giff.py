import imageio
import os
import matplotlib.pyplot as plt
import numpy as np
import sys

path = './' + sys.argv[1]
name = sys.argv[2]
files = os.listdir(path)

imagefiles = []
for file in files:
	imagefiles.append(imageio.imread(path + '/' + file))


imageio.mimsave(path + '/' + name + '.gif', imagefiles)