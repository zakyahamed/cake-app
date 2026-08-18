import glob

files = glob.glob("src/mock-data/*.ts")
broken_ids = [
    "1519587822780-8c5c4af91b31",
    "1532094349884-543559c5d8be",
    "1583391733956-6c78276477e1"
]
working_id = "1550989460-0adf9ea622e2"

for file in files:
    with open(file, "r") as f:
        content = f.read()
    
    modified = False
    for b_id in broken_ids:
        if b_id in content:
            content = content.replace(b_id, working_id)
            modified = True
            
    if modified:
        with open(file, "w") as f:
            f.write(content)
