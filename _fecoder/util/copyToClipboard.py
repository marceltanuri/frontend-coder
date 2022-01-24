import pyperclip

data = ""
print("opening content file...")
with open('dist/html/template-body.html', 'r') as file:
    data = file.read()
pyperclip.copy(data)
print("content file copied to your clipborad")