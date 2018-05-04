import imageio
import os
import sys

path = './' + sys.argv[1]
name = sys.argv[2]
duration = float(sys.argv[3])

files = os.listdir(path) # get the path to the folder

imagefiles = []
for file in files:
	imagefiles.append(imageio.imread(path + '/' + file)) # append each file to a list

exportname = path + '/' + name

imageio.mimsave(path + '/' + name + '.gif', imagefiles, duration=duration) # convert the list into a .gif
