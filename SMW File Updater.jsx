var scriptPath = '\"' + File.decode(app.path) + "/Presets/Scripts" +'\"'
var repoPath = '\"' + File.decode(app.path) + "/Presets/Scripts/SMWscripts" +'\"'
app.system('cd ' + scriptPath + '\ngit clone https://github.com/w0llay/SMWscripts.git')
app.system('cd ' + repoPath + '\ngit init\ngit fetch origin\ngit reset --hard origin/main')