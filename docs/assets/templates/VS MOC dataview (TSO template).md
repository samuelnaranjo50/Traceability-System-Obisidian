
## **⚡ Vertical Slicing**
Feature development connecting layers of the architecture to deliver one fully functional feature end-to-end.
``` dataview
TABLE WITHOUT ID regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") AS "ID",  link(file.path, regexreplace(file.name, "^.*?\d+[_ \-]*", "")) AS "Vertical Slicing Documentation", Description 
	FROM "Projects/<Add path>/docs/architecture"
	WHERE contains(file.name, "VS") AND status != "5-Deprecated"
	SORT regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") 

```
