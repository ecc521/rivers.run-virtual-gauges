import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

#file_handle = open("data_visualization.csv", "r")
#data = pd.read_csv(file_handle, index_col=0)
file_handle = open("test.json.correlation.json", "r")
#original dataframe
data = pd.read_json(file_handle)








print(data.columns.values)
print(data.values)
currentData = pd.DataFrame(data.values, columns = data.columns.values)
file_handle.close()

corr = currentData.corr() #Can chooes pearson, kendall, or spearman. Default pearson.

print(corr.values)

#We want to try different offsets to attempt to find the best possible correlation. Note that, when given multiple rivers, the ideal correlations might be different between them.
#Therefore, we should either add all the offsets in as an additional row, or should

fig = plt.figure()
ax = fig.add_subplot(111)
cax = ax.matshow(corr,cmap='coolwarm', vmin=-1, vmax=1)
fig.colorbar(cax)
ticks = np.arange(0,len(data.columns),1)
ax.set_xticks(ticks)
plt.xticks(rotation=90)
ax.set_yticks(ticks)
ax.set_xticklabels(data.columns)
ax.set_yticklabels(data.columns)
plt.show()
