import sys
import csv
import os

arguments = []
for argument in sys.argv:
	arguments.append(argument)

csvdir = arguments[1]
outfilename = arguments[2]

csvList = os.listdir(csvdir)
fieldnames_imp = ["body", "link_id"]

output_file = open(outfilename ,'wb')
csvwriter = csv.DictWriter(output_file, delimiter=',', fieldnames=fieldnames_imp, extrasaction='ignore')
csvwriter.writerow(dict((fn,fn) for fn in fieldnames_imp))

for textfile in csvList:
	print textfile + " is being processed" + "\n"
	in_file = open(csvdir + "/" + textfile, "rb")
	in_file_reader = csv.DictReader(in_file, delimiter=',')
	for row in in_file_reader:
		if row["subreddit"] == "politics":
			csvwriter.writerow(row)
	in_file.close()

output_file.close()