var scriptPath = '\"' + File.decode(app.path) + "/Presets/Scripts" +'\"'
//alert(('cd ' + scriptPath + '\ngit clone https://github.com/w0llay/psScript.git'))

app.system('cd ' + scriptPath + '\ngit clone https://github.com/w0llay/SMWscripts.git')
app.system('cd ' + scriptPath + '\ngit init\ngit fetch origin\ngit reset --hard origin/main')
