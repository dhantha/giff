#!/usr/bin/env python

from PIL import Image, ImageSequence
import sys, os
from images2gif import writeGif


path = '/home/dag332/giff/images' #sys.argv[1]
files = os.listdir(path)
imagefiles = []

for file in files:
	imagefiles.append(path + '/' + file)
	
im = [Image.open(fn) for fn in imagefiles]
#original_duration = im.info['duration']
#frames = [frame.copy() for frame in ImageSequence.Iterator(im)]    
#frames.reverse()


writeGif("worked" , im, duration=100, dither=0)



'''
import imageio

images = []
filenames = os.listdir('/home/dag332/giff/images')
for filename in filenames:
    images.append(imageio.imread(filename))
imageio.mimsave('/home/dag332/giff/movie.gif', images)
'''