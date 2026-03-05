Set objShell = CreateObject("WScript.Shell")

' Start the server in background
objShell.Run "cmd /c cd C:\Users\pc\Desktop\atlas && npm run dev", 0, False

' Wait 6 seconds for server to start
WScript.Sleep 6000

' Open browser
objShell.Run "start http://localhost:3000", 0

' Show message
MsgBox "ATLAS_EO is starting! Browser opening at http://localhost:3000" & vbCrLf & vbCrLf & "The command window will close automatically.", 64, "ATLAS_EO - Luxury Fashion"
