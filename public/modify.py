import numpy as np
import scipy.misc as imh
img=np.float_(imh.imread('public/assets/picture2.png'))
sh = np.shape(img)
factor1 = 10
factor2 = 10
img_sub =  img[0:sh[0]:factor1,0:sh[1]:factor2]
im=np.zeros_like(img_sub[:,:,0])
for i in range(3):
    im+=img_sub[:,:,i]/4.0
imh.imsave('public/assets/picture.png', im)
