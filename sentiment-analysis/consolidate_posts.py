import sys
import csv

arguments = []
for argument in sys.argv:
	arguments.append(argument)

input_filename = arguments[1]
in_file = open(input_filename, "rb")
in_file_reader = csv.DictReader(in_file, delimiter=',')

output_filename = arguments[2]
fieldnames_imp = ["link_id", "sentiment", "count"]
out_file = open(output_filename ,'a')
csvwriter = csv.DictWriter(out_file, delimiter=',', fieldnames=fieldnames_imp, extrasaction='ignore')
csvwriter.writerow(dict((fn,fn) for fn in fieldnames_imp))

topicList = []
consolidated_dict = {}

for row in in_file_reader:
	if row["link_id"] not in topicList:
		topicList.append(row["link_id"])
		tempDict = {}
		tempDict["link_id"] = row["link_id"]
		tempDict["sentiment"] = row["sentiment"]
		tempDict["count"] = 1
	elif row