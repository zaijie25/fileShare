#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os,sys
import os.path
# import filetype

def checkPy2Version():
    return sys.version_info <= (3, 0)   # 跟3.0比较

def encodeFile(infile, outfile):
    fr = open(infile, 'rb')
    # key = 0x73
    # print ord("s")
    # print chr(key)
    inBuffer = fr.read()
    
    if checkPy2Version():
        outBuffer = prefix+key    # python2
        for b in inBuffer:
            outBuffer = outBuffer + chr(ord(b) ^ ord(key))
        open(outfile,'wb').write(outBuffer)
        fr.close();
    else:
        outBuffer = (prefix+key).encode('latin1')    # python3
        for b in inBuffer:
            newChar = chr((b) ^ ord(key)).encode('latin1')
            outBuffer = outBuffer + newChar
        open(outfile,'wb').write(outBuffer)
        fr.close();


def encodeDir(rootdir):
    for parent,dirnames,filenames in os.walk(rootdir):
        for filename in filenames:
            
            fileExtension = os.path.splitext(filename)[1]
            if os.path.splitext(filename)[1] == ".png":
                print(os.path.join(parent,filename))
                path1=os.path.join(parent,filename)
                encodeFile(path1, path1)


            # kind = filetype.guess(os.path.join(parent,filename))
            # if kind is not None:
            #     if kind.extension is "png":
            #         #print('File extension: %s' % kind.extension)
            #         print(os.path.join(parent,filename))
            #         path1=os.path.join(parent,filename)
            #         encodeFile(path1, path1)


print(len(sys.argv))
if len(sys.argv) !=4:
    print('参数错误')
else:
    prefix = sys.argv[2]
    key = sys.argv[3]
    encodeDir(sys.argv[1])




