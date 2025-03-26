# rivers.run-virtual-gauges
Virtual Gauges used by rivers.run


### Adding a Gauge

All JavaScript files in the root directory of this project will be checked to see if they are valid virtual gauges. If a gauge is valid, it will be added to rivers.run with a name matching the file name. 

Using an existing virtual gauge as a template is recommended. Please be aware that virtual gauges operate in a restricted environment, so external libraries, network requests, etc, will probably fail. Virtual gauges are expected to compute quickly, and slow-to-compute virtual gauges may be terminated before they finish computation. 