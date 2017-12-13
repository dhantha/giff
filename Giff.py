import imageio
import os
import sys

path = './' + sys.argv[1]
name = sys.argv[2]
files = os.listdir(path) # get the path to the folder

imagefiles = []
for file in files:
	imagefiles.append(imageio.imread(path + '/' + file)) # append each file to a list


imageio.mimsave(path + '/' + name + '.gif', imagefiles) # convert the list into a .gif
