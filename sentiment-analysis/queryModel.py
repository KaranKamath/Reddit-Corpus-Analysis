import sys
import csv

from monkeylearn import MonkeyLearn

monkeyhash = '1e23076dbe2def0687f5d8ffd7629c5d9877cb1a'
module = 'cl_YFgYBSJq'
batch_size = 1000
offset = 29000

arguments = []
for argument in sys.argv:
	arguments.append(argument)

input_filename = arguments[1]
in_file = open(input_filename, "rb")
in_file_reader = csv.DictReader(in_file, delimiter=',')

output_filename = arguments[2]
fieldnames_imp = ["body", "link_id", "sentiment"]
out_file = open(output_filename ,'ab')
csvwriter = csv.DictWriter(out_file, delimiter=',', fieldnames=fieldnames_imp, extrasaction='ignore')
csvwriter.writerow(dict((fn,fn) for fn in fieldnames_imp))

ml = MonkeyLearn(monkeyhash)
module_id = module

temp_dict = []
comments_list = []
res_dict = []

for idx, val in enumerate(in_file_reader):
	if idx > offset:
		# print val
		if (idx%batch_size == 0 and idx != 0):
			#clear list
			del comments_list[:]
			for comment in temp_dict:
				# print comment
				comments_list.append(comment["body"])

			# print comments_list
			print "sending request \n"
			res = ml.classifiers.classify(module_id, comments_list)
			print "received response \n"
			del res_dict[:]
			for wtf in res.result:
				res_dict.append(wtf[0])

			for res_idx, res_val in enumerate(res_dict):
				temp_dict[res_idx]["sentiment"] = res_val["label"]
			# print res.result
			for row in temp_dict:
				csvwriter.writerow(row)
			
			del temp_dict[:]
			print str(idx) + " comments queried"

		temp_dict.append(val)

in_file.close()
out_file.close()