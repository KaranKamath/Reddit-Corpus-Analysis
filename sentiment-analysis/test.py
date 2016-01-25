import sys
import csv
import json

from monkeylearn import MonkeyLearn



from monkeylearn import MonkeyLearn
 
ml = MonkeyLearn('1e23076dbe2def0687f5d8ffd7629c5d9877cb1a')
text_list = ["This is a text to test your classifier", "This is some more text"]
module_id = 'cl_YFgYBSJq'
res = ml.classifiers.classify(module_id, text_list)
print res.result[1][0]

