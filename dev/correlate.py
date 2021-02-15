import numpy as np
import pandas as pd

#This script will take in data for two rivers, and run a correlation for the two, then output the result. 
file_handle = open("test.json.correlation.json", "r")
data = pd.read_json(file_handle)
file_handle.close()

corr = data.corr() #Can chooes pearson, kendall, or spearman. Default pearson.

print(corr.values[0][1])
