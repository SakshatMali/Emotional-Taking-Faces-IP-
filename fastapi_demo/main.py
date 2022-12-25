from fastapi import FastAPI , Request , Form , UploadFile, File, Body
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse , RedirectResponse
from typing import List, Dict, Optional
import json
import os
import shutil

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# subapi = FastAPI()
# app.mount("/Wav2Lip",subapi)

@app.get("/",response_class=HTMLResponse)
def root(request:Request):
    context={'request':request}
    return templates.TemplateResponse('index.html',context)

@app.post("/find")
async def finder(request : Request):
    ip = request.client
    print(ip)
    print("Dhruv")
    # import sum
    # sb.call("conda activate lipsync_sg")
    return "Good"


EXTENSION_vid = ""
EXTENSION_aud = ""

@app.post("/upload")
async def upload(file_name: UploadFile = File(...)):
    # with open('static/Wav2Lip/inputs/input.mp4' , 'wb') as buffer:
    #     shutil.copyfileobj(file.file , buffer)
    extension = file_name.filename.split('.')[-1]
    print(extension)

    global EXTENSION_vid , EXTENSION_aud
    
    if extension=="mp4" or extension=="mkv":
        # global EXTENSION_vid
        EXTENSION_vid=extension
    else:
        # global EXTENSION_aud
        EXTENSION_aud=extension

    print(EXTENSION_vid , EXTENSION_aud)

    with open('static/Wav2Lip/inputs/input.'+extension , 'wb') as buffer:
        shutil.copyfileobj(file_name.file , buffer)

    return "Done"

@app.post("/extension")
async def extension():
    global EXTENSION_vid , EXTENSION_aud
    return {"video_ex":EXTENSION_vid , "audio_ex":EXTENSION_aud}

@app.post("/upload_tester")
async def tester(files: UploadFile = File(...) , name: str = Form(...)):

    # form_data = await request.form()

    # file_name = form_data['name']

    extension = name.split('.')[-1]
    print(extension)

    print(name , type(files))

    with open('static/Wav2Lip/inputs/input.'+extension , 'wb') as buffer:
        shutil.copyfileobj(files.file, buffer)
    
    # print(form_data['name'])

    return "Done"


# @app.post("/upload_audio")
# async def upload(file: UploadFile = File(...)):
#     with open('static/Wav2Lip/inputs/input.mp4' , 'wb') as buffer:
#         shutil.copyfileobj(file.file , buffer)
#     return {"file_name": file.filename}

@app.post("/generate_result")
async def result():
    global EXTENSION_vid , EXTENSION_aud
    final_string = ''' NV_GPU=1,2,3 python static/Wav2Lip/inference.py --checkpoint_path static/Wav2Lip/checkpoints/wav2lip_gan.pth --face "static/Wav2Lip/inputs/input.{0}" --audio "static/Wav2Lip/inputs/input.{1}" '''
    final_string = final_string.format(EXTENSION_vid , EXTENSION_aud)
    print(final_string)
    os.system(final_string)
    return "Done"