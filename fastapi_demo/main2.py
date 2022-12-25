from fastapi import FastAPI , Request , Form , UploadFile, File, Body
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse , RedirectResponse , StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Optional
import json
import os
import shutil
import subprocess
import signal
import ffmpeg

from threading import Semaphore
# import urllib.request

from command_runner import command_runner

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/emo/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/emo/",response_class=HTMLResponse)
def root(request:Request):
    context={'request':request}
    return templates.TemplateResponse('index2.html',context)

@app.get("/emo/model",response_class=HTMLResponse)
def root(request:Request):
    context={'request':request}
    return templates.TemplateResponse('model.html',context)

@app.get("/emo/application",response_class=HTMLResponse)
def root(request:Request):
    context={'request':request}
    return templates.TemplateResponse('application.html',context)

@app.get("/emo/example",response_class=HTMLResponse)
def root(request:Request):
    context={'request':request}
    return templates.TemplateResponse('example.html',context)

# @app.get("/processing",response_class=HTMLResponse)
# def root(request:Request):
#     context={'request':request}
#     return templates.TemplateResponse('processing.html',context)

@app.get("/emo/syncInput",response_class=HTMLResponse)
def root(request:Request):
    context={'request':request}
    return templates.TemplateResponse('syncInput.html',context)

@app.get("/emo/syncInput_eg",response_class=HTMLResponse)
def root(request:Request):
    context={'request':request}
    return templates.TemplateResponse('syncInput_eg.html',context)

@app.get("/emo/errorPage",response_class=HTMLResponse)
def root(request:Request):
    context={'request':request}
    return templates.TemplateResponse('errorPage.html',context)

@app.get("/emo/code",response_class=HTMLResponse)
def root(request:Request):
    context={'request':request}
    return templates.TemplateResponse('code.html',context)

@app.get("/emo/paper",response_class=HTMLResponse)
def root(request:Request):
    context={'request':request}
    return templates.TemplateResponse('paper.html',context)

@app.get("/emo/demo",response_class=HTMLResponse)
def root(request:Request):
    context={'request':request}
    return templates.TemplateResponse('demo.html',context)


@app.post("/emo/file_uploader")
async def file_uploader(files: UploadFile = File(...) , name: str = Form(...)):

    # form_data = await request.form()

    # file_name = form_data['name']

    extension = name.split('.')[-1]
    # print(extension)

    # print(name , type(files))

    with open('static/Wav2Lip/inputs/input.'+extension , 'wb') as buffer:
        shutil.copyfileobj(files.file, buffer)
    
    # print(form_data['name'])

    return "Done"


# result_sema = Semaphore(1)
def run_ml(comm):
    return os.system(comm)

@app.post("/emo/generate_result")
async def result(request:Request):

    data = await request.json()
    # print(data)

    emot = data["emo"][:3].upper()
    print(emot)

    # final_string = '''CUDA_VISIBLE_DEVICES=2,3,4 python static/Emotional-Talking-Faces/inference.py --checkpoint_path "static/checkpoint/checkpoint_step000720000.pth" --face "static/Wav2Lip/inputs/input.{0}" --audio "static/Wav2Lip/inputs/input.{1}" --emotion "{2}" '''
    final_string = '''CUDA_VISIBLE_DEVICES=0,1 python static/Emotional-Talking-Faces/inference.py --checkpoint_path static/checkpoint/checkpoint_step000720000.pth --face static/Wav2Lip/inputs/input.{0} --audio static/Wav2Lip/inputs/input.{1} --emotion {2}'''
    final_string = final_string.format(data['vid'] , data['aud'] , emot)
    print(final_string)
    final_li = list(final_string.split(" "))
    print(final_li)
    # os.system(final_string)
    # result = subprocess.run([final_string] , shell=True, text=True , check=True , capture_output=True)
    # subprocess.run([final_string] , shell=False)
    # print(result.stdout)

    # p = subprocess.run(final_string, stdout=subprocess.PIPE, shell=True)
    # p.kill()

    # proc = subprocess.run([final_string], shell=True)
    
    # exit_code, output = command_runner(final_string, shell=True)
    # output = subprocess.run([final_string], shell=True, timeout=25)
    '''
    import psutil
    def kill(proc_pid):
        process = psutil.Process(proc_pid)
        for proc in process.children(recursive=True):
            proc.kill()
        process.kill()


    proc = subprocess.Popen([final_string], shell=True)
    try:
        proc.wait(timeout=350)
        print(data["emo"] , "gaga")
    except subprocess.TimeoutExpired:
        kill(proc.pid)
        print(data["emo"] , "heheeh")'''

    '''with result_sema:
        # return urllib.request.urlopen(url)
        res = subprocess.run(
            final_li, 
            stdout=subprocess.PIPE, 
            text=True,
            
        )
        print(res.stdout)'''
    
    # os.system("python sum.py")
    # print("os executed")
    

    '''try:
        os.system(final_string)
        # return data['emo']
    except ValueError:
        return 'error'
        '''

    '''res = subprocess.run(
            final_li, 
            # stdout=subprocess.PIPE, 
            text=True,
            shell=True,
            check=True,
            capture_output=True
            
        )
    print(res, "hehe")'''
    
    try:
        # os_cmd = 'wrongcommand'
        if os.system(final_string) != 0:
            raise Exception('wrongcommand does not exist')
        # else:
        #     print(data['emo'] , type(data['emo']))
        #     return data['emo']
    except:
        print("command does not work")
        return "error"
        
    # os.system(final_string)
    # output = subprocess.check_output(final_string , shell=True)
    # out = run_ml(final_string)
    print(data['emo'] , type(data['emo']))
    # return "fear"
    return data['emo']
    
#'Face not detected! Ensure the video contains a face in all the frames.'
#python inference.py --checkpoint_path '/home/mansi/sg_deepfakes/Wav2Lip-Emotion/checkpoints/emo-baseline/exp21/checkpoint_step000720000.pth' --face '' --audio '' --emotion ''
#os.environ['CUDA_VISIBLE_DEVICES']='3'

@app.post("/emo/generate_result2")
async def result(vid : str = Form(...) , aud : str = Form(...) , emo : str = Form(...)):

    # data = await request.json()
    # print(data)

    emot = emo[:3].upper()
    print(emot)

    final_string = '''CUDA_VISIBLE_DEVICES=0,1 python static/Emotional-Talking-Faces/inference.py --checkpoint_path static/checkpoint/checkpoint_step000720000.pth --face static/Wav2Lip/inputs/input.{0} --audio static/Wav2Lip/inputs/input.{1} --emotion {2}'''
    
    final_string = final_string.format(vid , aud , emot)
    print(final_string)
    final_li = list(final_string.split(" "))
    print(final_li)
    

    '''try:
        # os_cmd = 'wrongcommand'
        if os.system(final_string) != 0:
            raise Exception('wrongcommand does not exist')
        # else:
        #     print(data['emo'] , type(data['emo']))
        #     return data['emo']
    except:
        print("command does not work")
        return "error"
        '''
        
    os.system(final_string)
    print(emo)
    return "Done"

@app.post("/emo/name")
async def name(request:Request):
    return "Done"

def iterfile(emot):  # 
    with open('static/Emotional-Talking-Faces/results/' + emot + '.mp4', mode="rb") as file_like:  # 
        yield from file_like
@app.post("/emo/video",response_class=StreamingResponse)
def video(request:Request , emotion : str=Body(embed=True)):
    print(emotion)
    context={'request':request}
    return StreamingResponse(iterfile(emotion), media_type="video/mp4")


@app.post("/emo/file_saver")
def file_saver(files: UploadFile = File(...) , name: str = Form(...)):

    # form_data = await request.form()

    # file_name = form_data['name']

    # extension = name.split('.')[-1]
    # print(extension)

    print(name , type(files))

    with open('static/Wav2Lip/inputs/input.'+name , 'wb') as buffer:
        shutil.copyfileobj(files.file, buffer)
    
    # print(form_data['name'])
    
        '''if name=="mp4":
            stream = ffmpeg.input('static/Wav2Lip/inputs/input.mp4')
            stream = ffmpeg.hflip(stream)
            stream = ffmpeg.output(stream, 'static/Wav2Lip/inputs/input.mp4')
            ffmpeg.run(stream , overwrite_output=True)'''

    return "Done"

# DigiCertTLSECCP384RootG5.crt.pem
# entrust_2048_ca.cer